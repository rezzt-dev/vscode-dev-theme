@echo off
rem muestra de batch para revisar el resaltado de dark dev
setlocal enabledelayedexpansion
set NAME=dark-dev
set /a STEPS=16

:loop
if %STEPS% gtr 0 (
    echo %NAME%: !STEPS!
    set /a STEPS-=1
    goto loop
)
call :done
exit /b 0

:done
echo listo
