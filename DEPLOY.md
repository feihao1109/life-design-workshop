# 🚀 部署指南：GitHub + Vercel

## 📋 准备工作

### 1. 安装Git（如果还没安装）
- 下载：https://git-scm.com/download/win
- 安装后重启命令行

### 2. 注册账号
- GitHub账号：https://github.com
- Vercel账号：https://vercel.com （建议用GitHub登录）

## 📁 第一步：上传到GitHub

### 1. 在GitHub创建新仓库
1. 登录GitHub
2. 点击右上角 "+" → "New repository"
3. 仓库名：`life-design-workshop`
4. 描述：`基于斯坦福大学人生设计课程的在线工具`
5. 选择 "Public"（公开仓库）
6. 不要初始化README（我们已经有了）
7. 点击 "Create repository"

### 2. 本地Git操作
在项目目录 `c:\life-purpose-guide` 中运行以下命令：

```bash
# 初始化Git仓库
git init

# 添加所有文件
git add .

# 提交代码
git commit -m "Initial commit: 人生设计工坊 v1.0"

# 添加远程仓库（替换YOUR_USERNAME为你的GitHub用户名）
git remote add origin https://github.com/YOUR_USERNAME/life-design-workshop.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 3. 如果推送失败
如果提示需要认证，可以：
- 使用GitHub Desktop（图形化界面）
- 或设置Personal Access Token

## 🌐 第二步：部署到Vercel

### 方法一：通过Vercel网站（推荐）
1. 访问 https://vercel.com
2. 用GitHub账号登录
3. 点击 "New Project"
4. 导入你的GitHub仓库 `life-design-workshop`
5. 项目设置：
   - Framework Preset: "Other"
   - Root Directory: "./"
   - Build Command: 留空
   - Output Directory: "./"
6. 点击 "Deploy"
7. 部署完成后会得到一个URL，如：`https://life-design-workshop-xxx.vercel.app`

### 方法二：使用Vercel CLI
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel

# 部署到生产环境
vercel --prod
```

## 🔄 后续更新

每次修改代码后：
```bash
git add .
git commit -m "描述你的修改"
git push
```

Vercel会自动重新部署最新版本。

## 📱 自定义域名（可选）

1. 在Vercel项目设置中
2. 点击 "Domains"
3. 添加你的自定义域名
4. 按照提示配置DNS

## 🛠️ 常见问题

### Q: Git推送时要求用户名密码？
A: 使用Personal Access Token代替密码，或使用GitHub Desktop

### Q: Vercel部署失败？
A: 检查vercel.json配置，确保所有文件路径正确

### Q: PWA功能不工作？
A: 确保使用HTTPS访问（Vercel自动提供）

### Q: 如何查看部署日志？
A: 在Vercel项目页面的"Functions"或"Deployments"标签中

---

## 🎉 部署成功后

- GitHub仓库：`https://github.com/YOUR_USERNAME/life-design-workshop`
- 线上访问：`https://life-design-workshop-xxx.vercel.app`
- 自动部署：每次GitHub提交都会触发Vercel重新部署

**恭喜！你的人生设计工坊已经上线了！** 🚀
