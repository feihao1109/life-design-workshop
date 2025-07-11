@echo off
chcp 65001 >nul
echo.
echo ===============================================
echo    🚀 人生设计工坊 - GitHub 推送脚本
echo ===============================================
echo.

echo 📋 检查Git安装...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git未安装！
    echo.
    echo 请先安装Git：
    echo 1. 访问 https://git-scm.com/download/win
    echo 2. 下载并安装Git
    echo 3. 重新运行此脚本
    echo.
    pause
    exit /b 1
)
echo ✅ Git已安装

echo.
echo 📝 请输入你的GitHub信息：
set /p github_username="GitHub用户名: "
set /p github_email="GitHub邮箱: "

echo.
echo 🔧 配置Git用户信息...
git config --global user.name "%github_username%"
git config --global user.email "%github_email%"
echo ✅ Git配置完成

echo.
echo 📁 初始化Git仓库...
if not exist .git (
    git init
    echo ✅ Git仓库已初始化
) else (
    echo ✅ Git仓库已存在
)

echo.
echo 📦 添加所有文件...
git add .
echo ✅ 文件已添加到暂存区

echo.
echo 💾 提交代码...
git commit -m "Initial commit: 人生设计工坊 v1.0 - 基于斯坦福大学人生设计课程的在线工具"
if %errorlevel% equ 0 (
    echo ✅ 代码已提交
) else (
    echo ⚠️  提交可能失败，但我们继续...
)

echo.
echo 🔗 添加GitHub远程仓库...
echo 请确保你已经在GitHub上创建了名为 'life-design-workshop' 的仓库
echo 仓库地址应该是: https://github.com/%github_username%/life-design-workshop.git
echo.
set /p confirm="已创建GitHub仓库？(y/n): "
if /i "%confirm%" neq "y" (
    echo.
    echo 请先到GitHub创建仓库：
    echo 1. 访问 https://github.com
    echo 2. 点击 + 号 → New repository
    echo 3. 仓库名：life-design-workshop
    echo 4. 设置为Public
    echo 5. 不要初始化README
    echo 6. 创建后重新运行此脚本
    echo.
    pause
    exit /b 1
)

git remote remove origin >nul 2>&1
git remote add origin https://github.com/%github_username%/life-design-workshop.git
echo ✅ 远程仓库已添加

echo.
echo 🚀 推送到GitHub...
echo 如果是第一次推送，可能需要输入GitHub密码或token
git branch -M main
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ===============================================
    echo           🎉 推送成功！
    echo ===============================================
    echo.
    echo 📱 你的项目现在已经在GitHub上了！
    echo 🔗 访问地址: https://github.com/%github_username%/life-design-workshop
    echo.
    echo 📋 下一步：
    echo 1. 访问 https://vercel.com
    echo 2. 用GitHub账号登录
    echo 3. 导入你的仓库
    echo 4. 一键部署到网上！
    echo.
) else (
    echo.
    echo ❌ 推送失败！
    echo.
    echo 可能的原因：
    echo 1. 需要输入GitHub用户名和密码
    echo 2. 需要设置Personal Access Token
    echo 3. 仓库不存在或权限问题
    echo.
    echo 💡 解决方案：
    echo 1. 使用GitHub Desktop（图形界面，更简单）
    echo 2. 或设置Personal Access Token
    echo.
)

echo.
pause
