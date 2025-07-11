@echo off
echo 🔍 正在检查Git安装状态...
echo.

git --version 2>nul
if %errorlevel% equ 0 (
    echo ✅ Git安装成功！
    echo 📋 检测到的Git版本：
    git --version
    echo.
    echo 🎉 现在你可以开始推送代码到GitHub了！
    echo 💡 下一步：运行 push-to-github.bat 脚本
) else (
    echo ❌ Git尚未安装或未正确配置
    echo.
    echo 📋 请按照以下步骤安装Git：
    echo 1. 访问 https://git-scm.com/download/win
    echo 2. 下载Windows版本的Git
    echo 3. 运行安装程序（使用默认设置）
    echo 4. 重启命令行窗口
    echo 5. 再次运行此脚本验证
)

echo.
pause
