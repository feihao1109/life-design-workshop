// 简化版人生设计工坊 - 确保基本功能可用
let currentStep = 0;
let userData = {
    dashboard: { health: 5, work: 5, play: 5, love: 5 },
    values: [],
    experiments: [],
    plans: []
};

// 基本导航函数
function startDesignProcess() {
    console.log('开始设计流程');
    goToStep(1);
}

function showMethodology() {
    alert('人生设计方法论基于斯坦福大学的设计思维课程，通过五个步骤帮助您系统地探索和设计人生方向。');
}

function goToStep(step) {
    console.log('切换到步骤:', step);
    
    // 隐藏所有章节
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // 显示目标章节
    const sections = [
        'welcome-section', 
        'awareness-section', 
        'define-section', 
        'ideate-section', 
        'prototype-section', 
        'test-section', 
        'completion-section'
    ];
    
    const targetSection = document.getElementById(sections[step]);
    if (targetSection) {
        targetSection.classList.add('active');
        currentStep = step;
        updateProgress();
        
        // 特殊处理：如果进入原型实验步骤，初始化状态
        if (step === 4) { // prototype-section
            resetPrototypeSection();
        }
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        showNotification(`已进入第${step}步`, 'success');
    }
}

function updateProgress() {
    document.querySelectorAll('.progress-step').forEach((step, index) => {
        if (index === currentStep) {
            step.classList.add('active');
            step.style.opacity = '1';
        } else {
            step.classList.remove('active');
            step.style.opacity = index <= currentStep ? '0.8' : '0.5';
        }
    });
}

function previousStep() {
    if (currentStep > 0) {
        goToStep(currentStep - 1);
    }
}

function nextStep() {
    if (currentStep < 6) {
        goToStep(currentStep + 1);
    }
}

// 仪表板相关
function saveDashboard() {
    const sliders = document.querySelectorAll('.dashboard-slider');
    sliders.forEach(slider => {
        const area = slider.dataset.area;
        userData.dashboard[area] = parseInt(slider.value);
    });
    
    saveToLocalStorage();
    showNotification('仪表板数据已保存', 'success');
}

function saveViews() {
    showNotification('工作观和人生观已保存', 'success');
}

// 能量审查
function addActivity(type) {
    const input = document.querySelector(`#${type}-activities .activity-input input`);
    const activity = input.value.trim();
    
    if (activity) {
        const activityItem = document.createElement('div');
        activityItem.className = 'activity-item';
        activityItem.innerHTML = `
            <span>${activity}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        input.parentElement.insertAdjacentElement('afterend', activityItem);
        input.value = '';
        
        showNotification('活动已添加', 'success');
    }
}

// 步骤完成函数
function completeAwareness() {
    showNotification('觉察阶段完成！', 'success');
    goToStep(2);
}

function completeDefine() {
    showNotification('定义阶段完成！', 'success');
    goToStep(3);
}

function completeIdeate() {
    showNotification('构思阶段完成！', 'success');
    goToStep(4);
}

function completePrototype() {
    showNotification('原型阶段完成！', 'success');
    goToStep(5);
}

function completeDesignProcess() {
    showNotification('恭喜完成人生设计之旅！', 'success');
    goToStep(6);
}

// 问题重构
function addHMW() {
    const input = document.querySelector('.hmw-input input');
    const question = input.value.trim();
    
    if (question) {
        const hmwItem = document.createElement('div');
        hmwItem.className = 'hmw-item';
        hmwItem.innerHTML = `
            <span>我如何能够 ${question}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        document.getElementById('hmw-list').appendChild(hmwItem);
        input.value = '';
        
        showNotification('问题已添加', 'success');
    }
}

// 价值观选择
function toggleValue(element) {
    element.classList.toggle('selected');
    const value = element.dataset.value;
    const selectedValues = document.getElementById('selected-values');
    
    if (element.classList.contains('selected')) {
        if (!userData.values.includes(value)) {
            userData.values.push(value);
            
            const valueTag = document.createElement('div');
            valueTag.className = 'selected-value';
            valueTag.innerHTML = `
                ${element.textContent}
                <button onclick="removeValue('${value}')">×</button>
            `;
            valueTag.dataset.value = value;
            
            selectedValues.appendChild(valueTag);
        }
    } else {
        removeValue(value);
    }
    
    // 限制最多5个
    if (userData.values.length >= 5) {
        document.querySelectorAll('.value-item:not(.selected)').forEach(item => {
            item.style.pointerEvents = 'none';
            item.style.opacity = '0.5';
        });
    } else {
        document.querySelectorAll('.value-item').forEach(item => {
            item.style.pointerEvents = 'auto';
            item.style.opacity = '1';
        });
    }
}

function removeValue(value) {
    userData.values = userData.values.filter(v => v !== value);
    
    const valueElement = document.querySelector(`.value-item[data-value="${value}"]`);
    if (valueElement) {
        valueElement.classList.remove('selected');
    }
    
    const selectedTag = document.querySelector(`.selected-value[data-value="${value}"]`);
    if (selectedTag) {
        selectedTag.remove();
    }
    
    // 重新启用所有选项
    document.querySelectorAll('.value-item').forEach(item => {
        item.style.pointerEvents = 'auto';
        item.style.opacity = '1';
    });
}

// 实验相关
function addExperiment() {
    // 首先检查是否选中了计划
    if (!userData.selectedPlan || !userData.selectedPlan.type) {
        showNotification('请先选择要验证的计划', 'warning');
        return;
    }
    
    const form = document.getElementById('experiment-form');
    if (!form) {
        showNotification('找不到实验表单', 'error');
        return;
    }
    
    // 获取表单数据
    const goalTextarea = form.querySelector('textarea[placeholder*="验证什么假设"]');
    const typeSelect = form.querySelector('select');
    const actionsTextarea = form.querySelector('textarea[placeholder*="具体行动"]');
    const timeInput = form.querySelector('input[placeholder*="每周"]');
    const resourceInput = form.querySelector('input[placeholder*="500元"]');
    const successTextarea = form.querySelector('textarea[placeholder*="成功指标"]');
    
    const experiment = {
        id: Date.now(),
        plan: userData.selectedPlan.type,
        goal: goalTextarea ? goalTextarea.value.trim() : '',
        type: typeSelect ? typeSelect.value : '',
        actions: actionsTextarea ? actionsTextarea.value.trim() : '',
        time: timeInput ? timeInput.value.trim() : '',
        resources: resourceInput ? resourceInput.value.trim() : '',
        success: successTextarea ? successTextarea.value.trim() : '',
        status: 'planning',
        createdAt: new Date().toISOString()
    };
    
    // 验证必填字段
    if (!experiment.goal || !experiment.type || !experiment.actions) {
        showNotification('请填写实验目标、类型和具体行动', 'warning');
        return;
    }
    
    // 保存实验
    userData.experiments.push(experiment);
    
    // 更新实验列表显示
    updateExperimentsList();
    
    // 清空表单
    if (goalTextarea) goalTextarea.value = '';
    if (typeSelect) typeSelect.value = '';
    if (actionsTextarea) actionsTextarea.value = '';
    if (timeInput) timeInput.value = '';
    if (resourceInput) resourceInput.value = '';
    if (successTextarea) successTextarea.value = '';
    
    showNotification(`计划${experiment.plan}的实验已添加`, 'success');
}

// 更新实验列表显示
function updateExperimentsList() {
    const experimentsList = document.getElementById('experiments-list');
    if (!experimentsList) return;
    
    if (userData.experiments.length === 0) {
        experimentsList.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-lightbulb"></i>
                <p>还没有设计实验</p>
                <small>选择计划后，设计实验来验证你的想法</small>
            </div>
        `;
        return;
    }
    
    experimentsList.innerHTML = '';
    
    userData.experiments.forEach(experiment => {
        const experimentItem = document.createElement('div');
        experimentItem.className = 'experiment-item';
        experimentItem.innerHTML = `
            <div class="experiment-header">
                <h4>${experiment.goal}</h4>
                <span class="plan-badge">计划${experiment.plan}</span>
            </div>
            <div class="experiment-details">
                <p><strong>类型:</strong> ${getExperimentTypeName(experiment.type)}</p>
                <p><strong>行动:</strong> ${experiment.actions}</p>
                ${experiment.time ? `<p><strong>时间:</strong> ${experiment.time}</p>` : ''}
                ${experiment.resources ? `<p><strong>资源:</strong> ${experiment.resources}</p>` : ''}
                ${experiment.success ? `<p><strong>成功指标:</strong> ${experiment.success}</p>` : ''}
            </div>
            <div class="experiment-footer">
                <span class="experiment-status status-${experiment.status}">计划中</span>
                <button class="btn-icon" onclick="removeExperiment(${experiment.id})" title="删除实验">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        experimentsList.appendChild(experimentItem);
    });
}

// 获取实验类型显示名称
function getExperimentTypeName(type) {
    const typeNames = {
        'interview': '信息访谈',
        'shadow': '工作观察',
        'volunteer': '志愿服务',
        'course': '学习课程',
        'network': '社交网络',
        'prototype': '制作原型',
        'side-project': '副业项目'
    };
    return typeNames[type] || type;
}

// 删除实验
function removeExperiment(experimentId) {
    userData.experiments = userData.experiments.filter(exp => exp.id !== experimentId);
    updateExperimentsList();
    showNotification('实验已删除', 'success');
}

// 网络建设
function addContact(type) {
    const input = document.querySelector(`#${type}-list .contact-input input`);
    const contact = input.value.trim();
    
    if (contact) {
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.innerHTML = `
            <span>${contact}</span>
            <button onclick="this.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        input.parentElement.insertAdjacentElement('afterend', contactItem);
        input.value = '';
        
        showNotification('联系人已添加', 'success');
    }
}

// 实验日志
function saveLogEntry() {
    showNotification('实验日志已保存', 'success');
}

// 评分系统
function setRating(event) {
    const star = event.target;
    const rating = parseInt(star.dataset.rating);
    const ratingContainer = star.parentElement;
    
    // 更新所有星星的状态
    ratingContainer.querySelectorAll('i').forEach((s, index) => {
        if (index < rating) {
            s.classList.add('active');
        } else {
            s.classList.remove('active');
        }
    });
}

// 计划选择功能
function selectPlan(planType) {
    console.log('选择计划:', planType);
    
    // 移除所有按钮的选中状态
    document.querySelectorAll('.plan-select-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 为当前按钮添加选中状态
    const selectedBtn = document.querySelector(`[data-plan="${planType}"]`);
    if (selectedBtn) {
        selectedBtn.classList.add('active');
    }
    
    // 保存选中的计划
    if (!userData.selectedPlan) {
        userData.selectedPlan = {};
    }
    userData.selectedPlan.type = planType;
    
    // 显示实验表单
    const experimentForm = document.getElementById('experiment-form');
    if (experimentForm) {
        experimentForm.classList.add('show');
    }
    
    showNotification(`已选择计划${planType}`, 'success');
}

// 重置原型实验区域状态
function resetPrototypeSection() {
    // 清除所有计划按钮的选中状态
    document.querySelectorAll('.plan-select-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // 隐藏实验表单
    const experimentForm = document.getElementById('experiment-form');
    if (experimentForm) {
        experimentForm.classList.remove('show');
    }
    
    // 清除已选择的计划
    if (userData.selectedPlan) {
        userData.selectedPlan = {};
    }
}

// 数据管理
function saveToLocalStorage() {
    try {
        localStorage.setItem('lifeDesignData', JSON.stringify(userData));
    } catch (error) {
        console.error('保存数据失败:', error);
    }
}

function loadFromLocalStorage() {
    try {
        const saved = localStorage.getItem('lifeDesignData');
        if (saved) {
            userData = { ...userData, ...JSON.parse(saved) };
        }
    } catch (error) {
        console.error('加载数据失败:', error);
    }
}

// 导出功能
function exportData() {
    const dataStr = JSON.stringify(userData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `life-design-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    showNotification('数据已导出', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                userData = { ...userData, ...importedData };
                saveToLocalStorage();
                showNotification('数据导入成功！', 'success');
                location.reload();
            } catch (error) {
                showNotification('文件格式错误', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// 通知系统
function showNotification(message, type = 'info') {
    // 移除现有通知
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        transform: translateX(400px);
        transition: transform 0.3s ease;
    `;
    
    // 设置背景色
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#667eea';
    }
    
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// 初始化应用
document.addEventListener('DOMContentLoaded', function() {
    console.log('人生设计工坊 - 简化版加载完成');
    
    try {
        // 加载保存的数据
        loadFromLocalStorage();
        
        // 绑定进度条点击事件
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            step.addEventListener('click', () => {
                goToStep(index);
            });
        });
        
        // 绑定仪表板滑块事件
        document.querySelectorAll('.dashboard-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                const valueDisplay = e.target.nextElementSibling;
                if (valueDisplay) {
                    valueDisplay.textContent = value;
                }
            });
        });
        
        // 绑定价值观选择事件
        document.querySelectorAll('.value-item').forEach(item => {
            item.addEventListener('click', () => toggleValue(item));
        });
        
        // 绑定评分事件
        document.querySelectorAll('.rating i').forEach(star => {
            star.addEventListener('click', setRating);
        });
        
        // 绑定所有滑块的值显示更新
        document.querySelectorAll('input[type="range"]').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const valueDisplay = e.target.nextElementSibling;
                if (valueDisplay && valueDisplay.classList.contains('slider-value')) {
                    valueDisplay.textContent = e.target.value;
                }
            });
        });
        
        // 绑定计划选择按钮
        document.querySelectorAll('.plan-select-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                selectPlan(e.target.dataset.plan);
            });
        });
        
        // 初始化实验表单状态
        const experimentForm = document.getElementById('experiment-form');
        if (experimentForm) {
            experimentForm.classList.remove('show');
        }
        
        showNotification('应用加载成功！点击"开始设计之旅"开始使用', 'success');
        
    } catch (error) {
        console.error('初始化失败:', error);
        showNotification('应用加载失败，请刷新页面重试', 'error');
    }
});

// 导出到全局作用域
window.startDesignProcess = startDesignProcess;
window.showMethodology = showMethodology;
window.goToStep = goToStep;
window.previousStep = previousStep;
window.nextStep = nextStep;
window.saveDashboard = saveDashboard;
window.saveViews = saveViews;
window.addActivity = addActivity;
window.completeAwareness = completeAwareness;
window.completeDefine = completeDefine;
window.completeIdeate = completeIdeate;
window.completePrototype = completePrototype;
window.completeDesignProcess = completeDesignProcess;
window.addHMW = addHMW;
window.toggleValue = toggleValue;
window.removeValue = removeValue;
window.addExperiment = addExperiment;
window.updateExperimentsList = updateExperimentsList;
window.removeExperiment = removeExperiment;
window.addContact = addContact;
window.saveLogEntry = saveLogEntry;
window.setRating = setRating;
window.selectPlan = selectPlan;
window.resetPrototypeSection = resetPrototypeSection;
window.exportData = exportData;
window.importData = importData;

console.log('所有函数已导出到全局作用域');
