@echo off
chcp 65001 >nul
echo.
echo ===============================================
echo    🔧 Git 个人账号配置向导
echo ===============================================
echo.

echo ✅ Git已安装，版本：
git --version
echo.

echo 📝 请输入你的GitHub个人信息：
echo （这些信息会显示在你的提交记录中）
echo.

set /p github_username="请输入你的GitHub用户名: "
set /p github_email="请输入你的GitHub邮箱: "

echo.
echo 🔧 正在配置Git全局用户信息...

git config --global user.name "%github_username%"
git config --global user.email "%github_email%"

echo.
echo ✅ Git配置完成！
echo.
echo 📋 当前配置信息：
git config --global user.name
git config --global user.email
echo.

echo 💡 提示：
echo - 用户名：推荐使用你的GitHub用户名
echo - 邮箱：必须是GitHub账号绑定的邮箱
echo - 这些信息会显示在所有Git提交中
echo.

echo 🚀 配置完成后，你就可以推送代码到GitHub了！
echo 下一步：运行 push-to-github.bat 脚本

echo.
pause
