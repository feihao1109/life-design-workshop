// 全局变量声明
let app;

// 缺失的按钮事件处理函数
function startDesignProcess() {
    if (typeof app !== 'undefined' && app.goToStep) {
        app.goToStep(1);
    } else {
        console.error('App not initialized');
    }
}

function showMethodology() {
    alert('斯坦福人生设计方法论基于设计思维的五步法：\n1. 觉察当下 - 了解现状\n2. 定义问题 - 重构挑战\n3. 构思方案 - 创造可能\n4. 制作原型 - 设计实验\n5. 测试迭代 - 持续优化\n\n这是一个科学系统的方法，帮助你设计充满意义的人生。');
}

function saveDashboard() {
    if (typeof app !== 'undefined' && app.saveDashboard) {
        app.saveDashboard();
    }
}

function saveViews() {
    if (typeof app !== 'undefined' && app.saveViews) {
        app.saveViews();
    }
}

function addActivity(type) {
    if (typeof app !== 'undefined' && app.addActivity) {
        app.addActivity(type);
    }
}

function previousStep() {
    if (typeof app !== 'undefined' && app.currentStep > 0) {
        app.goToStep(app.currentStep - 1);
    }
}

function nextStep() {
    if (typeof app !== 'undefined' && app.currentStep < app.totalSteps - 1) {
        app.goToStep(app.currentStep + 1);
    }
}

function completeAwareness() {
    if (typeof app !== 'undefined') {
        app.goToStep(2);
    }
}

function addHMW() {
    const input = document.querySelector('.hmw-input input');
    if (input && input.value.trim()) {
        const hmwList = document.getElementById('hmw-list');
        const hmwItem = document.createElement('div');
        hmwItem.className = 'hmw-item';
        hmwItem.innerHTML = `
            <span>我如何能够 ${input.value}</span>
            <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        `;
        hmwList.insertBefore(hmwItem, hmwList.lastElementChild);
        input.value = '';
        
        // 更新焦点问题列表
        updateFocusQuestions();
    }
}

function updateFocusQuestions() {
    const hmwItems = document.querySelectorAll('.hmw-item');
    const focusList = document.getElementById('focus-list');
    focusList.innerHTML = '';
    
    hmwItems.forEach((item, index) => {
        const focusItem = document.createElement('div');
        focusItem.className = 'hmw-item';
        focusItem.innerHTML = `
            <span>${item.querySelector('span').textContent}</span>
            <input type="checkbox" onchange="updateSelectedFocus()">
        `;
        focusList.appendChild(focusItem);
    });
}

function updateSelectedFocus() {
    // 限制最多选择3个焦点问题
    const checkboxes = document.querySelectorAll('#focus-list input[type="checkbox"]');
    const checked = Array.from(checkboxes).filter(cb => cb.checked);
    
    if (checked.length > 3) {
        checked[checked.length - 1].checked = false;
        alert('最多只能选择3个焦点问题');
    }
}

function completeDefine() {
    if (typeof app !== 'undefined') {
        app.goToStep(3);
    }
}

function completeIdeate() {
    if (typeof app !== 'undefined') {
        app.goToStep(4);
    }
}

function addExperiment() {
    // 添加实验到列表
    const experiment = {
        id: Date.now(),
        goal: document.querySelector('#experiment-form textarea[placeholder*="验证什么假设"]')?.value || '',
        type: document.querySelector('#experiment-form select')?.value || '',
        action: document.querySelector('#experiment-form textarea[placeholder*="具体行动"]')?.value || '',
        time: document.querySelector('#experiment-form input[placeholder*="时间投入"]')?.value || '',
        resources: document.querySelector('#experiment-form input[placeholder*="资源需求"]')?.value || '',
        success: document.querySelector('#experiment-form textarea[placeholder*="成功指标"]')?.value || '',
        status: 'planning'
    };
    
    if (typeof app !== 'undefined' && app.data && app.data.experiments) {
        app.data.experiments.push(experiment);
        app.saveData();
        updateExperimentsList();
        clearExperimentForm();
    }
}

function updateExperimentsList() {
    const list = document.getElementById('experiments-list');
    if (!app || !app.data || !app.data.experiments || app.data.experiments.length === 0) {
        list.innerHTML = '<div class="empty-state"><i class="fas fa-lightbulb"></i><p>开始设计你的第一个实验吧！</p></div>';
        return;
    }
    
    list.innerHTML = app.data.experiments.map(exp => `
        <div class="experiment-item">
            <h4>${exp.goal || '未命名实验'}</h4>
            <p><strong>类型：</strong>${exp.type || '未指定'}</p>
            <p><strong>行动：</strong>${exp.action || '未描述'}</p>
            <span class="experiment-status status-${exp.status}">${getStatusText(exp.status)}</span>
        </div>
    `).join('');
}

function getStatusText(status) {
    const statusMap = {
        'planning': '计划中',
        'in-progress': '进行中',
        'completed': '已完成'
    };
    return statusMap[status] || status;
}

function clearExperimentForm() {
    const form = document.getElementById('experiment-form');
    form?.querySelectorAll('input, textarea, select').forEach(input => {
        input.value = '';
    });
}

function addContact(type) {
    const input = document.querySelector(`#${type}-list .contact-input input`);
    if (input && input.value.trim()) {
        const contactList = document.getElementById(`${type}-list`);
        const contactItem = document.createElement('div');
        contactItem.className = 'contact-item';
        contactItem.innerHTML = `
            <span>${input.value}</span>
            <button onclick="this.parentElement.remove()"><i class="fas fa-times"></i></button>
        `;
        contactList.insertBefore(contactItem, contactList.lastElementChild);
        input.value = '';
        
        // 保存到数据
        if (typeof app !== 'undefined' && app.data && app.data.network) {
            if (!app.data.network[type]) {
                app.data.network[type] = [];
            }
            app.data.network[type].push(contactItem.querySelector('span').textContent);
            app.saveData();
        }
    }
}

function completePrototype() {
    if (typeof app !== 'undefined') {
        app.goToStep(5);
    }
}

function saveLogEntry() {
    // 保存实验日志
    const experimentSelector = document.getElementById('experiment-selector');
    const status = document.querySelector('input[name="status"]:checked');
    const findings = document.querySelector('textarea[placeholder*="关键发现"]');
    const emotions = document.querySelector('textarea[placeholder*="情感体验"]');
    const energy = document.querySelector('.energy-slider');
    const interest = document.querySelector('.interest-slider');
    const nextActions = document.querySelector('textarea[placeholder*="下一步行动"]');
    
    const logEntry = {
        id: Date.now(),
        experimentId: experimentSelector?.value || '',
        status: status ? status.value : '',
        findings: findings?.value || '',
        emotions: emotions?.value || '',
        energy: energy?.value || 5,
        interest: interest?.value || 5,
        nextActions: nextActions?.value || '',
        timestamp: new Date().toISOString()
    };
    
    if (typeof app !== 'undefined' && app.data) {
        if (!app.data.logs) {
            app.data.logs = [];
        }
        app.data.logs.push(logEntry);
        app.saveData();
        
        // 清空表单
        document.querySelectorAll('#test-section input, #test-section textarea').forEach(input => {
            if (input.type !== 'range') {
                input.value = '';
            }
        });
        
        alert('实验日志已保存！');
    }
}

function completeDesignProcess() {
    if (typeof app !== 'undefined') {
        app.goToStep(6);
    }
}

// 人生设计工坊应用
class LifeDesignApp {
    constructor() {
        this.currentStep = 0;
        this.totalSteps = 6;
        this.data = {
            dashboard: {
                health: 5,
                work: 5,
                play: 5,
                love: 5
            },
            views: {
                workView: '',
                lifeView: ''
            },
            energy: {
                energizing: [],
                draining: []
            },
            problems: {
                currentChallenges: '',
                hmwQuestions: [],
                focusQuestions: []
            },
            values: [],
            explorations: {
                noMoney: '',
                excitingWork: '',
                environment: ''
            },
            odysseyPlans: [
                { name: '', description: '', milestones: ['', '', ''], ratings: { interest: 0, feasibility: 0, resources: 0 } },
                { name: '', description: '', milestones: ['', '', ''], ratings: { interest: 0, feasibility: 0, resources: 0 } },
                { name: '', description: '', milestones: ['', '', ''], ratings: { interest: 0, feasibility: 0, resources: 0 } }
            ],
            experiments: [],
            network: {
                mentors: [],
                collaborators: [],
                supporters: []
            },
            logs: [],
            insights: {
                patterns: [],
                discoveries: ''
            },
            finalPlan: {
                selectedPlan: '',
                nextActions: {
                    moreExperiments: '',
                    readyToAct: '',
                    toAbandon: ''
                },
                timeline: {
                    month: '',
                    quarter: '',
                    year: ''
                }
            }
        };
        
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.updateProgress();
        this.loadSavedData();
    }
    
    bindEvents() {
        // 导航事件
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            step.addEventListener('click', () => {
                if (index <= this.currentStep) {
                    this.goToStep(index);
                }
            });
        });
        
        // 人生仪表板滑块
        document.querySelectorAll('.dashboard-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const area = e.target.dataset.area;
                const value = e.target.value;
                this.data.dashboard[area] = parseInt(value);
                e.target.nextElementSibling.textContent = value;
                this.saveData();
            });
        });
        
        // 价值观选择
        document.querySelectorAll('.value-item').forEach(item => {
            item.addEventListener('click', () => this.toggleValue(item));
        });
        
        // 奥德赛计划评分
        document.querySelectorAll('.rating i').forEach(star => {
            star.addEventListener('click', (e) => this.setRating(e));
        });
        
        // 自动保存文本输入
        this.bindAutoSave();
        
        // 缺失的按钮事件处理函数
        document.getElementById('start-design-btn')?.addEventListener('click', () => this.startDesignProcess());
        document.getElementById('show-methodology-btn')?.addEventListener('click', () => this.showMethodology());
        document.getElementById('save-dashboard-btn')?.addEventListener('click', () => this.saveDashboard());
        document.getElementById('save-views-btn')?.addEventListener('click', () => this.saveViews());
        document.querySelectorAll('.add-activity-btn').forEach(btn => {
            const type = btn.dataset.type;
            btn.addEventListener('click', () => this.addActivity(type));
        });
        document.getElementById('complete-awareness-btn')?.addEventListener('click', () => this.completeAwareness());
        document.getElementById('add-hmw-btn')?.addEventListener('click', () => this.addHMW());
        document.getElementById('complete-define-btn')?.addEventListener('click', () => this.completeDefine());
        document.getElementById('complete-ideate-btn')?.addEventListener('click', () => this.completeIdeate());
        document.getElementById('add-experiment-btn')?.addEventListener('click', () => this.addExperiment());
        document.getElementById('add-contact-btn')?.addEventListener('click', () => {
            const type = document.querySelector('input[name="contact-type"]:checked').value;
            this.addContact(type);
        });
        document.getElementById('save-log-btn')?.addEventListener('click', () => this.saveLogEntry());
        document.getElementById('complete-design-btn')?.addEventListener('click', () => this.completeDesignProcess());
    }
    
    bindAutoSave() {
        // 绑定所有文本输入的自动保存
        document.querySelectorAll('input[type="text"], textarea, select').forEach(input => {
            input.addEventListener('blur', () => {
                this.saveData();
            });
        });
    }
    
    updateProgress() {
        document.querySelectorAll('.progress-step').forEach((step, index) => {
            step.classList.toggle('active', index === this.currentStep);
            step.style.opacity = index <= this.currentStep ? '1' : '0.5';
        });
    }
    
    goToStep(stepIndex) {
        // 隐藏所有步骤
        document.querySelectorAll('.section').forEach(section => {
            section.classList.remove('active');
        });
        
        // 显示目标步骤
        const sections = ['welcome-section', 'awareness-section', 'define-section', 'ideate-section', 'prototype-section', 'test-section', 'completion-section'];
        const targetSection = document.getElementById(sections[stepIndex]);
        if (targetSection) {
            targetSection.classList.add('active');
        }
        
        this.currentStep = stepIndex;
        this.updateProgress();
        this.saveData();
        
        // 滚动到顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    // 人生仪表板相关方法
    saveDashboard() {
        this.saveData();
        this.showNotification('人生仪表板已保存');
    }
    
    saveViews() {
        const workViewText = document.querySelector('textarea[placeholder*="工作对你意味着什么"]')?.value || '';
        const lifeViewText = document.querySelector('textarea[placeholder*="什么让人生有意义"]')?.value || '';
        
        this.data.views.workView = workViewText;
        this.data.views.lifeView = lifeViewText;
        
        this.saveData();
        this.showNotification('工作观和人生观已保存');
    }
    
    // 能量审查方法
    addActivity(type) {
        const container = document.getElementById(`${type}-activities`);
        const input = container.querySelector('input');
        const value = input.value.trim();
        
        if (value) {
            this.data.energy[type].push(value);
            this.renderActivityItem(container, value, type);
            input.value = '';
            this.saveData();
        }
    }
    
    renderActivityItem(container, text, type) {
        const item = document.createElement('div');
        item.className = 'activity-item';
        item.innerHTML = `
            <span>${text}</span>
            <button onclick="removeActivity('${type}', '${text}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const inputDiv = container.querySelector('.activity-input');
        container.insertBefore(item, inputDiv);
    }
    
    removeActivity(type, text) {
        const index = this.data.energy[type].indexOf(text);
        if (index > -1) {
            this.data.energy[type].splice(index, 1);
            this.saveData();
            this.renderEnergyActivities();
        }
    }
    
    renderEnergyActivities() {
        ['energizing', 'draining'].forEach(type => {
            const container = document.getElementById(`${type}-activities`);
            const items = container.querySelectorAll('.activity-item');
            items.forEach(item => item.remove());
            
            this.data.energy[type].forEach(text => {
                this.renderActivityItem(container, text, type);
            });
        });
    }
    
    completeAwareness() {
        this.saveData();
        this.goToStep(2);
    }
    
    // 问题定义相关方法
    addHMW() {
        const input = document.querySelector('.hmw-input input');
        const value = input.value.trim();
        
        if (value) {
            this.data.problems.hmwQuestions.push(value);
            this.renderHMWItem(value);
            input.value = '';
            this.saveData();
        }
    }
    
    renderHMWItem(text) {
        const container = document.getElementById('hmw-list');
        const item = document.createElement('div');
        item.className = 'hmw-item';
        item.innerHTML = `
            <span>我如何能够 ${text}</span>
            <button onclick="removeHMW('${text}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        item.addEventListener('click', () => this.selectHMW(item, text));
        
        const inputDiv = container.querySelector('.hmw-input');
        container.insertBefore(item, inputDiv);
    }
    
    selectHMW(element, text) {
        element.classList.toggle('selected');
        
        if (element.classList.contains('selected')) {
            if (this.data.problems.focusQuestions.length < 3) {
                this.data.problems.focusQuestions.push(text);
            } else {
                element.classList.remove('selected');
                this.showNotification('最多只能选择3个焦点问题');
            }
        } else {
            const index = this.data.problems.focusQuestions.indexOf(text);
            if (index > -1) {
                this.data.problems.focusQuestions.splice(index, 1);
            }
        }
        
        this.updateFocusQuestions();
        this.saveData();
    }
    
    updateFocusQuestions() {
        const container = document.getElementById('focus-list');
        container.innerHTML = '';
        
        this.data.problems.focusQuestions.forEach(question => {
            const item = document.createElement('div');
            item.className = 'focus-item';
            item.innerHTML = `<i class="fas fa-star"></i> 我如何能够 ${question}`;
            container.appendChild(item);
        });
    }
    
    toggleValue(element) {
        const value = element.dataset.value;
        
        if (element.classList.contains('selected')) {
            element.classList.remove('selected');
            const index = this.data.values.indexOf(value);
            if (index > -1) {
                this.data.values.splice(index, 1);
            }
        } else {
            if (this.data.values.length < 5) {
                element.classList.add('selected');
                this.data.values.push(value);
            } else {
                this.showNotification('最多只能选择5个价值观');
            }
        }
        
        this.updateSelectedValues();
        this.saveData();
    }
    
    updateSelectedValues() {
        const selected = document.querySelectorAll('.value-item.selected');
        const selectedValuesContainer = document.getElementById('selected-values');
        
        if (selectedValuesContainer) {
            selectedValuesContainer.innerHTML = '';
            
            Array.from(selected).forEach(item => {
                const selectedValue = document.createElement('div');
                selectedValue.className = 'selected-value';
                selectedValue.innerHTML = `
                    <span>${item.textContent}</span>
                    <button onclick="removeValue('${item.dataset.value}')">×</button>
                `;
                selectedValuesContainer.appendChild(selectedValue);
            });
            
            // 限制选择数量
            if (selected.length > 5) {
                selected[selected.length - 1].classList.remove('selected');
                alert('最多只能选择5个价值观');
                this.updateSelectedValues();
            }
        }
    }
    
    removeValue(value) {
        const valueItem = document.querySelector(`[data-value="${value}"]`);
        if (valueItem) {
            valueItem.classList.remove('selected');
            this.updateSelectedValues();
        }
    }
    
    // 奥德赛计划相关方法
    setRating(event) {
        const star = event.target;
        const rating = parseInt(star.dataset.rating);
        const ratingContainer = star.parentElement;
        const metric = ratingContainer.previousElementSibling.textContent;
        const planCard = star.closest('.odyssey-plan');
        const planIndex = parseInt(planCard.dataset.plan) - 1;
        
        // 更新UI
        ratingContainer.querySelectorAll('i').forEach((s, index) => {
            s.classList.toggle('active', index < rating);
        });
        
        // 保存数据
        const metricKey = metric === '兴趣度' ? 'interest' : 
                         metric === '可行性' ? 'feasibility' : 'resources';
        this.data.odysseyPlans[planIndex].ratings[metricKey] = rating;
        this.saveData();
    }
    
    completeIdeate() {
        // 保存奥德赛计划数据
        document.querySelectorAll('.odyssey-plan').forEach((plan, index) => {
            const nameInput = plan.querySelector('input[placeholder*="例如"]');
            const descInput = plan.querySelector('textarea');
            const milestoneInputs = plan.querySelectorAll('.milestone input');
            
            this.data.odysseyPlans[index].name = nameInput?.value || '';
            this.data.odysseyPlans[index].description = descInput?.value || '';
            milestoneInputs.forEach((input, i) => {
                this.data.odysseyPlans[index].milestones[i] = input.value || '';
            });
        });
        
        this.saveData();
        this.goToStep(4);
    }
    
    // 原型实验相关方法
    addExperiment() {
        const form = document.getElementById('experiment-form');
        
        const experiment = {
            id: Date.now(),
            plan: document.querySelector('.plan-select-btn.active')?.dataset.plan || 'A',
            goal: form.querySelector('textarea[placeholder*="验证什么假设"]')?.value || '',
            type: form.querySelector('select')?.value || '',
            action: form.querySelector('textarea[placeholder*="具体行动"]')?.value || '',
            time: form.querySelector('input[placeholder*="时间投入"]')?.value || '',
            resources: form.querySelector('input[placeholder*="资源需求"]')?.value || '',
            success: form.querySelector('textarea[placeholder*="成功指标"]')?.value || '',
            status: 'planning',
            createdAt: new Date().toISOString()
        };
        
        if (experiment.goal && experiment.action) {
            this.data.experiments.push(experiment);
            this.renderExperiment(experiment);
            this.clearExperimentForm();
            this.saveData();
        } else {
            this.showNotification('请填写实验目标和具体行动');
        }
    }
    
    renderExperiment(experiment) {
        const container = document.getElementById('experiments-list');
        const emptyState = container.querySelector('.empty-state');
        if (emptyState) emptyState.remove();
        
        const item = document.createElement('div');
        item.className = 'experiment-item';
        item.innerHTML = `
            <h4>计划${experiment.plan} - ${experiment.goal}</h4>
            <p>${experiment.action}</p>
            <div class="experiment-status status-${experiment.status}">
                ${this.getStatusDisplayName(experiment.status)}
            </div>
        `;
        
        container.appendChild(item);
    }
    
    getStatusDisplayName(status) {
        const statusNames = {
            planning: '计划中',
            'in-progress': '进行中',
            completed: '已完成'
        };
        return statusNames[status] || status;
    }
    
    clearExperimentForm() {
        const form = document.getElementById('experiment-form');
        form.querySelectorAll('input, textarea, select').forEach(input => {
            input.value = '';
        });
    }
    
    addContact(type) {
        const container = document.getElementById(`${type}-list`);
        const input = container.querySelector('input');
        const value = input.value.trim();
        
        if (value) {
            this.data.network[type].push(value);
            this.renderContactItem(container, value, type);
            input.value = '';
            this.saveData();
        }
    }
    
    renderContactItem(container, text, type) {
        const item = document.createElement('div');
        item.className = 'contact-item';
        item.innerHTML = `
            <span>${text}</span>
            <button onclick="removeContact('${type}', '${text}')">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        const inputDiv = container.querySelector('.contact-input');
        container.insertBefore(item, inputDiv);
    }
    
    removeContact(type, text) {
        const index = this.data.network[type].indexOf(text);
        if (index > -1) {
            this.data.network[type].splice(index, 1);
            this.saveData();
            this.renderNetworkContacts();
        }
    }
    
    renderNetworkContacts() {
        ['mentors', 'collaborators', 'supporters'].forEach(type => {
            const container = document.getElementById(`${type}-list`);
            const items = container.querySelectorAll('.contact-item');
            items.forEach(item => item.remove());
            
            this.data.network[type].forEach(text => {
                this.renderContactItem(container, text, type);
            });
        });
    }
    
    completePrototype() {
        this.saveData();
        this.goToStep(5);
    }
    
    // 测试迭代相关方法
    saveLogEntry() {
        const experimentSelector = document.getElementById('experiment-selector');
        const selectedExperiment = experimentSelector?.value;
        
        if (!selectedExperiment) {
            this.showNotification('请选择要记录的实验');
            return;
        }
        
        const statusInputs = document.querySelectorAll('input[name="status"]');
        let status = '';
        statusInputs.forEach(input => {
            if (input.checked) status = input.value;
        });
        
        const findings = document.querySelector('textarea[placeholder*="关键发现"]')?.value || '';
        const emotions = document.querySelector('textarea[placeholder*="情感体验"]')?.value || '';
        const energy = document.querySelector('.energy-slider')?.value || 5;
        const interest = document.querySelector('.interest-slider')?.value || 5;
        const nextSteps = document.querySelector('textarea[placeholder*="下一步行动"]')?.value || '';
        
        const logEntry = {
            id: Date.now(),
            experimentId: selectedExperiment,
            status: status,
            findings: findings,
            emotions: emotions,
            energy: parseInt(energy),
            interest: parseInt(interest),
            nextSteps: nextSteps,
            timestamp: new Date().toISOString()
        };
        
        this.data.logs.push(logEntry);
        this.saveData();
        this.showNotification('实验日志已保存');
        this.updateInsights();
    }
    
    updateInsights() {
        // 分析能量模式
        const energyData = this.data.logs.map(log => log.energy);
        if (energyData.length > 0) {
            const avgEnergy = energyData.reduce((a, b) => a + b, 0) / energyData.length;
            
            // 更新模式列表
            const patterns = [];
            if (avgEnergy > 7) {
                patterns.push('你在实验中表现出高能量水平');
            } else if (avgEnergy < 4) {
                patterns.push('需要关注能量消耗的实验类型');
            }
            
            this.data.insights.patterns = patterns;
            this.renderPatterns();
        }
    }
    
    renderPatterns() {
        const container = document.getElementById('patterns-list');
        container.innerHTML = '';
        
        this.data.insights.patterns.forEach(pattern => {
            const item = document.createElement('div');
            item.className = 'pattern-item';
            item.innerHTML = `
                <i class="fas fa-lightbulb"></i>
                <span>${pattern}</span>
            `;
            container.appendChild(item);
        });
    }
    
    completeDesignProcess() {
        this.saveData();
        this.goToStep(6);
        this.generateFinalReport();
    }
    
    generateFinalReport() {
        // 生成最终报告的逻辑
        console.log('生成最终报告', this.data);
    }
    
    // 数据管理方法
    saveData() {
        localStorage.setItem('lifeDesignData', JSON.stringify(this.data));
    }
    
    loadSavedData() {
        const saved = localStorage.getItem('lifeDesignData');
        if (saved) {
            try {
                const parsedData = JSON.parse(saved);
                this.data = { ...this.data, ...parsedData };
                this.restoreUI();
            } catch (e) {
                console.error('Failed to load saved data:', e);
            }
        }
    }
    
    restoreUI() {
        // 恢复人生仪表板
        Object.keys(this.data.dashboard).forEach(area => {
            const slider = document.querySelector(`[data-area="${area}"]`);
            if (slider) {
                slider.value = this.data.dashboard[area];
                slider.nextElementSibling.textContent = this.data.dashboard[area];
            }
        });
        
        // 恢复其他UI状态
        this.renderEnergyActivities();
        this.renderNetworkContacts();
        this.updateSelectedValues();
        this.updateFocusQuestions();
        
        // 恢复实验列表
        this.data.experiments.forEach(experiment => {
            this.renderExperiment(experiment);
        });
    }
    
    showNotification(message) {
        // 创建通知
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 1rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    // 下载报告
    downloadFinalReport() {
        const report = this.generateReportContent();
        const blob = new Blob([report], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = '我的人生设计报告.html';
        a.click();
        
        URL.revokeObjectURL(url);
    }
    
    generateReportContent() {
        return `
        <!DOCTYPE html>
        <html lang="zh-CN">
        <head>
            <meta charset="UTF-8">
            <title>我的人生设计报告</title>
            <style>
                body { font-family: 'Arial', sans-serif; line-height: 1.6; margin: 2rem; }
                h1, h2, h3 { color: #667eea; }
                .section { margin-bottom: 2rem; padding: 1rem; border-left: 4px solid #667eea; }
            </style>
        </head>
        <body>
            <h1>我的人生设计报告</h1>
            <div class="section">
                <h2>人生仪表板</h2>
                <p>健康: ${this.data.dashboard.health}/10</p>
                <p>工作: ${this.data.dashboard.work}/10</p>
                <p>娱乐: ${this.data.dashboard.play}/10</p>
                <p>爱: ${this.data.dashboard.love}/10</p>
            </div>
            <div class="section">
                <h2>核心价值观</h2>
                <p>${this.data.values.map(v => this.getValueDisplayName(v)).join(', ')}</p>
            </div>
            <div class="section">
                <h2>奥德赛计划</h2>
                ${this.data.odysseyPlans.map((plan, i) => `
                    <h3>计划${String.fromCharCode(65 + i)}: ${plan.name}</h3>
                    <p>${plan.description}</p>
                `).join('')}
            </div>
            <div class="section">
                <h2>实验计划</h2>
                ${this.data.experiments.map(exp => `
                    <h3>${exp.goal}</h3>
                    <p>${exp.action}</p>
                `).join('')}
            </div>
        </body>
        </html>
        `;
    }
    
    restartJourney() {
        if (confirm('确定要重新开始吗？这将清除所有已保存的数据。')) {
            localStorage.removeItem('lifeDesignData');
            location.reload();
        }
    }
    
    shareJourney() {
        if (navigator.share) {
            navigator.share({
                title: '我刚完成了人生设计之旅',
                text: '我用斯坦福人生设计方法重新规划了我的人生方向！',
                url: window.location.href
            });
        } else {
            // 复制链接到剪贴板
            navigator.clipboard.writeText(window.location.href).then(() => {
                this.showNotification('链接已复制到剪贴板');
            });
        }
    }
    
    previousStep() {
        if (this.currentStep > 0) {
            this.goToStep(this.currentStep - 1);
        }
    }
}

// 现代化交互增强功能
class InteractionEnhancer {
    constructor() {
        this.init();
    }
    
    init() {
        this.addScrollAnimations();
        this.addParallaxEffects();
        this.addSmoothTransitions();
        this.addProgressAnimations();
        this.addTooltips();
        this.addKeyboardNavigation();
        this.addAnimatedCounters();
    }
    
    // 滚动动画
    addScrollAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.tool-card, .step-item, .odyssey-plan').forEach(el => {
            observer.observe(el);
        });
    }
    
    // 视差效果
    addParallaxEffects() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.shape');
            const speed = 0.5;
            
            parallax.forEach(shape => {
                const yPos = -(scrolled * speed);
                shape.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
    
    // 平滑过渡
    addSmoothTransitions() {
        document.querySelectorAll('.section').forEach(section => {
            section.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    }
    
    // 进度条动画
    addProgressAnimations() {
        const animateProgress = (element, targetWidth) => {
            let width = 0;
            const increment = targetWidth / 50;
            
            const timer = setInterval(() => {
                width += increment;
                element.style.width = `${width}%`;
                
                if (width >= targetWidth) {
                    clearInterval(timer);
                }
            }, 20);
        };
        
        // 为仪表板滑块添加动画
        document.querySelectorAll('.dashboard-slider').forEach(slider => {
            slider.addEventListener('input', (e) => {
                const value = e.target.value;
                const progressBar = e.target.nextElementSibling;
                if (progressBar && progressBar.classList.contains('progress-fill')) {
                    animateProgress(progressBar, value);
                }
            });
        });
    }
    
    // 工具提示
    addTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            element.addEventListener('mouseenter', this.showTooltip);
            element.addEventListener('mouseleave', this.hideTooltip);
        });
    }
    
    showTooltip(e) {
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip-popup';
        tooltip.textContent = e.target.dataset.tooltip;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--text-primary);
            color: white;
            padding: 0.5rem;
            border-radius: var(--border-radius);
            font-size: 0.8rem;
            z-index: 1000;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 5}px`;
        
        setTimeout(() => tooltip.style.opacity = '1', 10);
        
        e.target._tooltip = tooltip;
    }
    
    hideTooltip(e) {
        if (e.target._tooltip) {
            e.target._tooltip.remove();
            delete e.target._tooltip;
        }
    }
    
    // 键盘导航
    addKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && e.ctrlKey) {
                app.previousStep();
            } else if (e.key === 'ArrowRight' && e.ctrlKey) {
                app.nextStep();
            } else if (e.key === 'Escape') {
                const activeModal = document.querySelector('.modal.active');
                if (activeModal) {
                    this.closeModal(activeModal);
                }
            }
        });
    }
    
    // 动画计数器
    addAnimatedCounters() {
        const animateCounter = (element, target) => {
            let current = 0;
            const increment = target / 100;
            
            const timer = setInterval(() => {
                current += increment;
                element.textContent = Math.round(current);
                
                if (current >= target) {
                    element.textContent = target;
                    clearInterval(timer);
                }
            }, 20);
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.dataset.count);
                    if (target) {
                        animateCounter(entry.target, target);
                        observer.unobserve(entry.target);
                    }
                }
            });
        });
        
        document.querySelectorAll('[data-count]').forEach(counter => {
            observer.observe(counter);
        });
    }
}

// 数据可视化增强
class DataVisualization {
    constructor() {
        this.init();
    }
    
    init() {
        this.createDashboardChart();
        this.createProgressCharts();
        this.updateChartsRealtime();
    }
    
    createDashboardChart() {
        const dashboardData = app?.data?.dashboard || {};
        const chartContainer = document.querySelector('.dashboard-chart');
        
        if (!chartContainer) return;
        
        const areas = Object.keys(dashboardData);
        const values = Object.values(dashboardData);
        
        chartContainer.innerHTML = areas.map((area, index) => `
            <div class="chart-item">
                <label>${this.translateArea(area)}</label>
                <div class="chart-bar-container">
                    <div class="chart-bar" style="width: ${values[index] * 10}%"></div>
                    <span class="chart-value">${values[index]}</span>
                </div>
            </div>
        `).join('');
    }
    
    translateArea(area) {
        const translations = {
            health: '健康',
            work: '工作',
            play: '娱乐',
            love: '关系'
        };
        return translations[area] || area;
    }
    
    createProgressCharts() {
        // 为奥德赛计划创建进度图表
        const plans = app?.data?.odysseyPlans || [];
        plans.forEach((plan, index) => {
            this.createPlanChart(plan, index);
        });
    }
    
    createPlanChart(plan, index) {
        const chartElement = document.querySelector(`#plan-${index}-chart`);
        if (!chartElement) return;
        
        const ratings = plan.ratings || {};
        const total = Object.values(ratings).reduce((sum, val) => sum + val, 0);
        const average = total / Object.keys(ratings).length;
        
        chartElement.innerHTML = `
            <div class="plan-score-visual">
                <div class="score-circle" style="--score: ${average * 20}%">
                    <span class="score-text">${Math.round(average * 20)}%</span>
                </div>
            </div>
        `;
    }
    
    updateChartsRealtime() {
        // 实时更新图表
        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('dashboard-slider')) {
                setTimeout(() => this.createDashboardChart(), 100);
            }
        });
    }
}

// 用户体验增强
class UXEnhancer {
    constructor() {
        this.init();
    }
    
    init() {
        this.addSmartSave();
        this.addProgressPersistence();
        this.addOfflineSupport();
        this.addErrorHandling();
        this.addPerformanceOptimization();
    }
    
    addSmartSave() {
        let saveTimer;
        
        document.addEventListener('input', () => {
            clearTimeout(saveTimer);
            saveTimer = setTimeout(() => {
                app.saveData();
                this.showSaveIndicator();
            }, 1000);
        });
    }
    
    showSaveIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'save-indicator';
        indicator.innerHTML = '<i class="fas fa-check"></i> 已自动保存';
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 0.5rem 1rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-md);
            z-index: 1000;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        document.body.appendChild(indicator);
        
        setTimeout(() => indicator.style.opacity = '1', 10);
        setTimeout(() => {
            indicator.style.opacity = '0';
            setTimeout(() => indicator.remove(), 300);
        }, 2000);
    }
    
    addProgressPersistence() {
        // 保存滚动位置
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('scrollPosition', window.scrollY);
        });
        
        // 恢复滚动位置
        window.addEventListener('load', () => {
            const savedPosition = localStorage.getItem('scrollPosition');
            if (savedPosition) {
                window.scrollTo(0, parseInt(savedPosition));
            }
        });
    }
    
    addOfflineSupport() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js').catch((error) => {
                console.warn('Service Worker注册失败，但不影响应用运行:', error);
            });
        }
        
        window.addEventListener('online', () => {
            this.showNetworkStatus('已重新连接到网络', 'success');
        });
        
        window.addEventListener('offline', () => {
            this.showNetworkStatus('当前处于离线模式', 'warning');
        });
    }
    
    showNetworkStatus(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    addErrorHandling() {
        // 移除错误处理，由全局错误处理接管
        console.log('错误处理已移至全局处理器');
    }
    
    showErrorMessage(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--error-color);
            color: white;
            padding: 1rem;
            border-radius: var(--border-radius);
            box-shadow: var(--shadow-lg);
            z-index: 10000;
        `;
        
        document.body.appendChild(errorDiv);
        
        setTimeout(() => errorDiv.remove(), 10000);
    }
    
    addPerformanceOptimization() {
        // 图片懒加载
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
        
        // 预加载关键资源
        this.preloadCriticalResources();
    }
    
    preloadCriticalResources() {
        const resources = [
            '/style.css',
            '/script.js'
        ];
        
        resources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource;
            link.as = resource.endsWith('.css') ? 'style' : 'script';
            document.head.appendChild(link);
        });
    }
}

// 数据分析和洞察生成
class InsightGenerator {
    constructor(data) {
        this.data = data;
    }
    
    generatePersonalityInsights() {
        const dashboard = this.data.dashboard || {};
        const total = Object.values(dashboard).reduce((sum, val) => sum + val, 0);
        const average = total / 4;
        
        let insights = [];
        
        if (dashboard.health < 5) {
            insights.push({
                type: 'warning',
                icon: 'fas fa-heart',
                title: '健康需要关注',
                description: '您的健康评分较低，建议优先关注身心健康，这是一切发展的基础。',
                actionItems: ['制定运动计划', '改善睡眠质量', '关注心理健康']
            });
        }
        
        if (dashboard.work < dashboard.play + 2) {
            insights.push({
                type: 'info',
                icon: 'fas fa-briefcase',
                title: '工作生活平衡良好',
                description: '您在工作与娱乐之间保持了较好的平衡，这有助于长期的职业发展。',
                actionItems: ['保持当前状态', '寻找工作中的乐趣', '培养工作相关技能']
            });
        }
        
        if (dashboard.love < 6) {
            insights.push({
                type: 'suggestion',
                icon: 'fas fa-users',
                title: '人际关系待提升',
                description: '人际关系是人生幸福的重要因素，建议投入更多时间建立和维护关系。',
                actionItems: ['主动联系朋友', '参与社交活动', '提升沟通技巧']
            });
        }
        
        return insights;
    }
    
    generateValueAlignment() {
        const values = this.data.values || [];
        const odysseyPlans = this.data.odysseyPlans || [];
        
        if (values.length === 0 || odysseyPlans.length === 0) {
            return null;
        }
        
        const alignment = odysseyPlans.map((plan, index) => {
            // 简化的价值观匹配算法
            const score = Math.random() * 0.4 + 0.6; // 模拟匹配度
            return {
                planName: plan.name || `计划 ${index + 1}`,
                alignmentScore: score,
                matchedValues: values.slice(0, Math.floor(Math.random() * 3) + 1),
                recommendations: this.generateAlignmentRecommendations(score)
            };
        });
        
        return alignment;
    }
    
    generateAlignmentRecommendations(score) {
        if (score > 0.8) {
            return ['这个计划与您的价值观高度匹配', '建议优先考虑此方向', '制定具体实施步骤'];
        } else if (score > 0.6) {
            return ['计划与价值观基本匹配', '可以考虑微调计划细节', '增加价值观相关的元素'];
        } else {
            return ['需要重新审视计划', '考虑如何更好地体现核心价值观', '可能需要重大调整'];
        }
    }
    
    generateProgressInsights() {
        const experiments = this.data.experiments || [];
        const completedExperiments = experiments.filter(exp => exp.status === 'completed');
        
        if (completedExperiments.length === 0) {
            return {
                message: '还没有完成任何实验，建议开始您的第一个人生原型实验。',
                suggestions: ['从小型实验开始', '选择感兴趣的领域', '设定明确的学习目标']
            };
        }
        
        const avgEnergy = completedExperiments.reduce((sum, exp) => sum + (exp.energy || 0), 0) / completedExperiments.length;
        const avgInterest = completedExperiments.reduce((sum, exp) => sum + (exp.interest || 0), 0) / completedExperiments.length;
        
        let insights = {
            totalExperiments: experiments.length,
            completedExperiments: completedExperiments.length,
            avgEnergy: avgEnergy.toFixed(1),
            avgInterest: avgInterest.toFixed(1),
            patterns: [],
            recommendations: []
        };
        
        if (avgEnergy > 7) {
            insights.patterns.push('您的实验大多给您带来了正能量');
            insights.recommendations.push('继续在这些方向上深入探索');
        }
        
        if (avgInterest > 7) {
            insights.patterns.push('您对大多数实验都很感兴趣');
            insights.recommendations.push('考虑将兴趣转化为更大的项目');
        }
        
        return insights;
    }
}

// 报告生成器
class ReportGenerator {
    constructor(data) {
        this.data = data;
        this.insights = new InsightGenerator(data);
    }
    
    generateFullReport() {
        return {
            metadata: {
                generatedAt: new Date().toISOString(),
                version: '1.0',
                completionLevel: this.calculateCompletionLevel()
            },
            dashboard: this.data.dashboard,
            personalityInsights: this.insights.generatePersonalityInsights(),
            valueAlignment: this.insights.generateValueAlignment(),
            progressInsights: this.insights.generateProgressInsights(),
            odysseyPlans: this.data.odysseyPlans,
            experiments: this.data.experiments,
            recommendations: this.generateFinalRecommendations()
        };
    }
    
    calculateCompletionLevel() {
        let completed = 0;
        let total = 10;
        
        if (Object.values(this.data.dashboard).some(v => v > 0)) completed++;
        if (this.data.values && this.data.values.length > 0) completed++;
        if (this.data.odysseyPlans && this.data.odysseyPlans.some(p => p.name)) completed++;
        if (this.data.experiments && this.data.experiments.length > 0) completed++;
        // ... 其他检查
        
        return Math.round((completed / total) * 100);
    }
    
    generateFinalRecommendations() {
        const personalityInsights = this.insights.generatePersonalityInsights();
        const valueAlignment = this.insights.generateValueAlignment();
        
        let recommendations = [
            {
                priority: 'high',
                category: '立即行动',
                items: ['选择一个奥德赛计划开始第一个实验', '完善最吸引您的计划细节']
            },
            {
                priority: 'medium',
                category: '短期目标',
                items: ['建立相关领域的人际网络', '学习必要的技能和知识']
            },
            {
                priority: 'low',
                category: '长期规划',
                items: ['定期回顾和调整人生设计', '保持开放心态面对变化']
            }
        ];
        
        return recommendations;
    }
    
    exportToJSON() {
        const report = this.generateFullReport();
        const dataStr = JSON.stringify(report, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `life-design-report-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
    
    exportToPDF() {
        // 创建一个打印友好的页面
        const report = this.generateFullReport();
        const printWindow = window.open('', '_blank');
        
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>人生设计报告</title>
                <style>
                    body { font-family: 'Arial', sans-serif; margin: 40px; line-height: 1.6; }
                    h1, h2, h3 { color: #667eea; }
                    .section { margin-bottom: 30px; page-break-inside: avoid; }
                    .insight { background: #f8fafc; padding: 15px; margin: 10px 0; border-left: 4px solid #667eea; }
                    .dashboard-item { display: flex; justify-content: space-between; margin: 10px 0; }
                    @media print { .no-print { display: none; } }
                </style>
            </head>
            <body>
                ${this.generateHTMLReport(report)}
                <div class="no-print">
                    <button onclick="window.print()">打印报告</button>
                    <button onclick="window.close()">关闭</button>
                </div>
            </body>
            </html>
        `);
        
        printWindow.document.close();
    }
    
    generateHTMLReport(report) {
        return `
            <h1>人生设计报告</h1>
            <p><strong>生成时间：</strong>${new Date(report.metadata.generatedAt).toLocaleString('zh-CN')}</p>
            <p><strong>完成度：</strong>${report.metadata.completionLevel}%</p>
            
            <div class="section">
                <h2>人生仪表板</h2>
                ${Object.entries(report.dashboard).map(([key, value]) => 
                    `<div class="dashboard-item">
                        <span>${this.translateDashboardKey(key)}：</span>
                        <span>${value}/10</span>
                    </div>`
                ).join('')}
            </div>
            
            <div class="section">
                <h2>个人洞察</h2>
                ${report.personalityInsights.map(insight => 
                    `<div class="insight">
                        <h3>${insight.title}</h3>
                        <p>${insight.description}</p>
                        <ul>
                            ${insight.actionItems.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>`
                ).join('')}
            </div>
            
            <div class="section">
                <h2>奥德赛计划</h2>
                ${report.odysseyPlans.map((plan, index) => 
                    `<div class="insight">
                        <h3>计划 ${index + 1}：${plan.name || '未命名'}</h3>
                        <p>${plan.description || '暂无描述'}</p>
                    </div>`
                ).join('')}
            </div>
            
            <div class="section">
                <h2>最终建议</h2>
                ${report.recommendations.map(rec => 
                    `<div class="insight">
                        <h3>${rec.category}</h3>
                        <ul>
                            ${rec.items.map(item => `<li>${item}</li>`).join('')}
                        </ul>
                    </div>`
                ).join('')}
            </div>
        `;
    }
    
    translateDashboardKey(key) {
        const translations = {
            health: '健康',
            work: '工作',
            play: '娱乐',
            love: '关系'
        };
        return translations[key] || key;
    }
}

// 数据导入导出管理器
class DataManager {
    static exportData() {
        const data = app.data;
        const exportData = {
            version: '1.0',
            exportDate: new Date().toISOString(),
            data: data
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        
        const link = document.createElement('a');
        link.href = URL.createObjectURL(dataBlob);
        link.download = `life-design-data-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    }
    
    static importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const importData = JSON.parse(e.target.result);
                    
                    if (importData.data) {
                        app.data = { ...app.data, ...importData.data };
                        app.saveData();
                        app.loadSavedData();
                        app.showNotification('数据导入成功！', 'success');
                        
                        // 刷新界面
                        location.reload();
                    }
                } catch (error) {
                    app.showNotification('文件格式错误，导入失败', 'error');
                }
            };
            
            reader.readAsText(file);
        };
        
        input.click();
    }
    
    static clearAllData() {
        if (confirm('确定要清除所有数据吗？此操作不可恢复。')) {
            localStorage.removeItem('lifeDesignData');
            app.showNotification('所有数据已清除', 'warning');
            setTimeout(() => location.reload(), 1000);
        }
    }
}

// 添加到全局作用域供按钮调用
window.DataManager = DataManager;
window.ReportGenerator = ReportGenerator;

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    try {
        app = new LifeDesignApp();
        
        // 添加CSS动画
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            
            .notification {
                animation: slideIn 0.3s ease-out;
            }
        `;
        document.head.appendChild(style);
        
        console.log('人生设计工坊应用初始化成功');
        
    } catch (error) {
        console.error('应用初始化失败:', error);
        
        // 显示用户友好的错误信息
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #ef4444;
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;
        errorDiv.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-exclamation-triangle"></i>
                <span>页面加载遇到问题，正在尝试修复...</span>
            </div>
        `;
        document.body.appendChild(errorDiv);
        
        // 3秒后移除错误提示
        setTimeout(() => {
            if (errorDiv.parentNode) {
                errorDiv.remove();
            }
        }, 3000);
    }
});

// 安全初始化增强功能
window.addEventListener('load', () => {
    setTimeout(() => {
        try {
            if (typeof app !== 'undefined' && app) {
                // 检查类是否存在再初始化
                if (typeof InteractionEnhancer !== 'undefined') {
                    new InteractionEnhancer();
                }
                if (typeof DataVisualization !== 'undefined') {
                    new DataVisualization();
                }
                if (typeof UXEnhancer !== 'undefined') {
                    new UXEnhancer();
                }
                console.log('增强功能初始化成功');
            }
        } catch (error) {
            console.warn('增强功能初始化失败，但不影响核心功能:', error);
        }
    }, 500);
});

// 备用简化初始化
window.addEventListener('load', () => {
    setTimeout(() => {
        // 如果主应用没有正确初始化，使用备用方案
        if (typeof app === 'undefined' || !app) {
            console.warn('主应用初始化失败，使用备用方案');
            
            // 基本的导航功能
            window.goToStep = function(step) {
                document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
                const sections = ['welcome-section', 'awareness-section', 'define-section', 'ideate-section', 'prototype-section', 'test-section', 'completion-section'];
                const targetSection = document.getElementById(sections[step]);
                if (targetSection) {
                    targetSection.classList.add('active');
                }
            };
            
            // 基本的数据保存
            window.saveData = function() {
                console.log('使用备用保存方案');
                localStorage.setItem('backup-data', JSON.stringify({}));
            };
            
            // 隐藏错误提示
            const errorBoundary = document.getElementById('error-boundary');
            if (errorBoundary) {
                errorBoundary.style.display = 'none';
            }
        }
    }, 2000);
});

// 全局错误处理
window.addEventListener('error', (e) => {
    console.error('全局错误:', e.error);
    
    // 显示错误边界
    const errorBoundary = document.getElementById('error-boundary');
    if (errorBoundary) {
        errorBoundary.style.display = 'block';
    }
    
    // 5秒后自动隐藏
    setTimeout(() => {
        if (errorBoundary) {
            errorBoundary.style.display = 'none';
        }
    }, 5000);
});

// 未处理的Promise拒绝
window.addEventListener('unhandledrejection', (e) => {
    console.error('未处理的Promise拒绝:', e.reason);
    e.preventDefault(); // 阻止默认的错误处理
});
