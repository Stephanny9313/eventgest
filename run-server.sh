#!/bin/bash

# Script para ejecutar el servidor local de EventGest en Linux/Mac
# Uso: bash run-server.sh

cd "$(dirname "$0")"

echo ""
echo "================================"
echo "EventGest - Servidor Local"
echo "================================"
echo ""
echo "El servidor está iniciando..."
echo "Abre tu navegador en: http://localhost:8000"
echo ""
echo "Presiona Ctrl+C para detener el servidor"
echo ""

# Intenta con python3 primero, luego con python
if command -v python3 &> /dev/null; then
    python3 -m http.server 8000
elif command -v python &> /dev/null; then
    python -m http.server 8000
else
    echo "Error: Python no está instalado"
    echo "Por favor instala Python desde: https://www.python.org/downloads/"
    exit 1
fi
