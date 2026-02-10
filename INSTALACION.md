# 🔧 Guía de Uso - EventGest

## ✅ Estado del Proyecto

El proyecto ha sido **completamente reparado** y está listo para usar.

### Cambios Realizados:
- ✅ Archivos renombrados (corregidos typos)
- ✅ Duplicados eliminados
- ✅ Módulos AngularJS sincronizados
- ✅ Referencias HTML actualizadas
- ✅ Servicios creados/corregidos

---

## 🚀 Cómo Ejecutar la Aplicación

### Opción 1: Servidor Local (Windows)
```bash
# Double-click en:
run-server.bat

# O ejecutar en terminal:
python -m http.server 8000
```

Luego abre: **http://localhost:8000/login.html**

---

### Opción 2: Servidor Local (Mac/Linux)
```bash
bash run-server.sh

# O directamente:
python3 -m http.server 8000
```

Luego abre: **http://localhost:8000/login.html**

---

### Opción 3: VS Code Live Server
1. Instala la extensión "Live Server" en VS Code
2. Click derecho sobre `login.html`
3. Selecciona "Open with Live Server"

---

## 📝 Puntos de Entrada

| Archivo | Descripción |
|---------|-------------|
| `login.html` | 🔑 Página de inicio/login |
| `dashboard.html` | 📊 Panel de administración |
| `evento.html` | 📅 Gestión de eventos |
| `registration.html` | 📋 Registros de participantes |
| `programs.html` | 📌 Gestión de programas |
| `parameter.html` | ⚙️ Parámetros del sistema |
| `eventType.html` | 🏷️ Tipos de eventos |

---

## 🏗️ Estructura de Carpetas

```
app/
├── app.module.js              # Módulo principal AngularJS
├── controllers/               # Controladores (lógica)
├── services/                  # Servicios (API communication)
└── css/                       # Estilos
```

---

## 🔌 Requisitos Previos

### Backend API
La aplicación requiere un servidor backend ejecutándose en:
```
http://localhost:8080
```

**Endpoints esperados:**
- `GET/POST /api/events` - Eventos
- `GET/POST /api/event-types` - Tipos de evento
- `GET/POST /api/programs` - Programas
- `GET/POST /api/users` - Usuarios
- `GET/POST /api/registrations` - Registros
- `GET/POST /api/participants` - Participantes
- `GET/POST /api/parameters` - Parámetros
- `GET /api/audits/top5` - Últimas auditorías

---

## 📦 Tecnologías Utilizadas

- **AngularJS 1.8.3** - Framework Frontend
- **Chart.js** - Gráficos
- **Boxicons** - Iconos
- **HTML5 + CSS3** - Estructura y estilos

---

## 🐛 Solución de Problemas

### "Error: No puedo conectar a localhost:8080"
- Verifica que el servidor backend esté ejecutándose
- Abre: `http://localhost:8080/actuator/health` (si usa Spring Boot)

### "La página se ve en blanco"
- Abre la consola del navegador (F12)
- Revisa si hay errores de conexión a la API

### "Archivos JS no se cargan"
- Verifica que estés sirviendo desde la carpeta raíz del proyecto
- Comprueba que los nombres de archivo sean correctos (sin typos)

---

## 📚 Recursos Útiles

- [AngularJS Documentation](https://docs.angularjs.org/)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Chart.js Documentation](https://www.chartjs.org/)

---

## 📧 Contacto

Para preguntas o problemas, contacta al equipo de desarrollo.

---

*Última actualización: 8 de febrero de 2026*
