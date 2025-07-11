# Vercel部署检查清单

## ✅ 部署前检查

### 文件结构检查
- [x] index.html (主页面)
- [x] style.css (样式文件)
- [x] script-simple.js (JavaScript文件)
- [x] manifest.json (PWA配置)
- [x] sw.js (Service Worker)
- [x] vercel.json (Vercel配置)

### GitHub仓库检查
- [x] 代码已推送到 https://github.com/feihao1109/life-design-workshop
- [x] 仓库为公开状态
- [x] 包含所有必要文件

## 🚀 Vercel部署设置

### 推荐配置
- **Framework Preset**: Other
- **Build Command**: 留空
- **Output Directory**: ./
- **Install Command**: 留空

### 环境变量
- 无需设置环境变量

## 🔧 可能的问题和解决方案

### 问题1: 部署失败
- 检查所有文件是否都推送到GitHub
- 确保index.html在根目录

### 问题2: 网站无法访问
- 检查index.html语法是否正确
- 查看Vercel部署日志

### 问题3: PWA功能不工作
- 确保manifest.json和sw.js路径正确
- 检查HTTPS是否启用（Vercel自动提供）

### 问题4: 样式丢失
- 检查style.css和script-simple.js的引用路径
- 确保文件名大小写正确

## 📱 部署后验证

部署完成后，测试以下功能：
- [ ] 网站正常打开
- [ ] 五步设计流程正常工作
- [ ] 计划A/B/C选择功能正常
- [ ] 数据保存功能正常
- [ ] 响应式设计在手机上正常
- [ ] PWA安装功能正常

## 🌐 自定义域名（可选）

如果你有自己的域名：
1. 在Vercel项目设置中点击 "Domains"
2. 添加你的域名
3. 按照提示配置DNS记录

---

**祝部署顺利！** 🚀
