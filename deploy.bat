@echo off
echo 🚀 人生设计工坊 - 部署脚本
echo.

echo 📋 检查Git安装...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git未安装，请先安装Git: https://git-scm.com/download/win
    pause
    exit /b 1
)
echo ✅ Git已安装

echo.
echo 📁 初始化Git仓库...
if not exist .git (
    git init
    echo ✅ Git仓库已初始化
) else (
    echo ✅ Git仓库已存在
)

echo.
echo 📦 添加文件到Git...
git add .
echo ✅ 文件已添加

echo.
set /p commit_msg="💬 请输入提交信息 (默认: 更新代码): "
if "%commit_msg%"=="" set commit_msg=更新代码

git commit -m "%commit_msg%"
echo ✅ 代码已提交

echo.
echo 🌐 推送到GitHub...
echo 请确保你已经在GitHub创建了仓库并添加了远程地址
echo 如果还没有，请运行: git remote add origin https://github.com/YOUR_USERNAME/life-design-workshop.git
echo.

git push
if %errorlevel% equ 0 (
    echo ✅ 推送成功！
    echo.
    echo 🎉 部署完成！
    echo 👉 现在可以到Vercel导入你的GitHub仓库进行部署
    echo 👉 Vercel地址: https://vercel.com
) else (
    echo ❌ 推送失败，请检查远程仓库设置
)

echo.
pause
