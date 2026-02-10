@echo off
REM Inicia un servidor HTTP local para la aplicación AngularJS
REM Este script permite acceder a la aplicación desde http://localhost:8000

cd /d "%~dp0"

echo.
echo ================================
echo EventGest - Servidor Local
echo ================================
echo.
echo El servidor está iniciando...
echo Abre tu navegador en: http://localhost:8000
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

python -m http.server 8000

if errorlevel 1 (
    echo.
    echo Error: Python no está instalado o no está en el PATH
    echo Por favor instala Python desde: https://www.python.org/downloads/
    echo.
    pause
)
