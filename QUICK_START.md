# 🚀 快速部署指南

## 🎯 5分钟上线你的人生设计工坊

### 步骤1: 安装Git (如果没有的话)
下载并安装: https://git-scm.com/download/win

### 步骤2: 注册账号
- GitHub: https://github.com (免费)
- Vercel: https://vercel.com (用GitHub登录)

### 步骤3: 上传到GitHub
1. 在GitHub创建新仓库 `life-design-workshop`
2. 在项目文件夹中打开命令行，运行：
```bash
git init
git add .
git commit -m "人生设计工坊 v1.0"
git remote add origin https://github.com/YOUR_USERNAME/life-design-workshop.git
git push -u origin main
```
*记得替换 YOUR_USERNAME 为你的GitHub用户名*

### 步骤4: 部署到Vercel
1. 访问 https://vercel.com
2. 点击 "New Project"
3. 选择你的GitHub仓库
4. 点击 "Deploy"
5. 等待部署完成（约1-2分钟）

### 步骤5: 完成！
🎉 你的网站现在已经在线了！

**你会得到一个类似这样的网址：**
`https://life-design-workshop-abc123.vercel.app`

---

## ⚡ 使用脚本自动部署

在Windows中，你可以双击运行 `deploy.bat` 脚本来自动化Git操作。

## 🔄 后续更新

每次修改代码后：
```bash
git add .
git commit -m "更新说明"
git push
```
Vercel会自动重新部署！

## 📞 需要帮助？

查看详细指南：
- `DEPLOY.md` - 完整部署指南
- `CHECKLIST.md` - 部署检查清单
- `README.md` - 项目说明

祝你部署顺利！🚀
