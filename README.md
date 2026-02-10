# EventGest - Aplicación AngularJS

## Cambios Realizados

### 1. **Archivos Renombrados (Typos Corregidos)**
- ✅ `login.servicie.js` → `login.service.js`
- ✅ `registration.servicie.js` → `registration.service.js`
- ✅ `user.servicies.js` → `user.service.js`

### 2. **Archivos Duplicados Eliminados**
- ✅ `eventype.controller.js` (duplicado/inconsistente)
- ✅ `eventype.service.js` (duplicado/inconsistente)

### 3. **Módulos Corregidos**
- ✅ Todos los controllers y services ahora usan `eventgestApp` (consistencia)
- ✅ `program.controller.js` - Eliminado `[]` innecesario en declaración del módulo
- ✅ Servicios con `angular.module('eventgestApp', [])` corregidos a `angular.module('eventgestApp')`

### 4. **Archivos HTML Actualizados**
- ✅ `login.html` - Actualizado para referenciar `login.service.js` (sin typo)
- ✅ `dashboard.html` - Recreado con referencias correctas a servicios y controllers

### 5. **Nuevos Servicios Creados**
- ✅ `dashboard.service.js` - Servicio para operaciones del dashboard

### 6. **Controllers Actualizados**
- ✅ `dashboard.controller.js` - Reescrito para usar DashboardService

## Estructura del Proyecto

El proyecto es una aplicación **AngularJS (1.8.2)** diseñada para ejecutarse en el navegador. 

### Para ejecutar:

1. **Opción 1: Usar un servidor local simple (Python)**
   ```bash
   python -m http.server 8000
   # O si usas Python 3:
   python3 -m http.server 8000
   ```
   Luego abre: http://localhost:8000/login.html

2. **Opción 2: Usar Live Server en VS Code**
   - Instala la extensión "Live Server"
   - Click derecho en `login.html` → "Open with Live Server"

3. **Opción 3: Usar ng serve (requiere Angular CLI)**
   - Este proyecto es AngularJS, no Angular
   - Para usar `ng serve`, necesitarías migrar a Angular moderno

## Archivos del Proyecto

```
angularjs-eventgest/
├── app/
│   ├── app.module.js                 # Módulo principal AngularJS
│   ├── controllers/                  # Controllers (limpiados)
│   │   ├── audit.controller.js
│   │   ├── auth.controller.js
│   │   ├── dashboard.controller.js   # ✅ Actualizado
│   │   ├── event.controller.js
│   │   ├── eventType.controller.js
│   │   ├── login.controller.js
│   │   ├── parameter.controller.js
│   │   ├── parametHistos.controller.js
│   │   ├── program.controller.js      # ✅ Corregido
│   │   ├── registration.controller.js
│   │   └── user.controller.js
│   ├── services/                     # Services (renombrados/corregidos)
│   │   ├── audit.service.js
│   │   ├── auth.service.js
│   │   ├── dashboard.service.js      # ✅ Nuevo
│   │   ├── event.service.js
│   │   ├── eventType.service.js
│   │   ├── login.service.js          # ✅ Renombrado
│   │   ├── parameter.service.js
│   │   ├── parametHistos.service.js
│   │   ├── participant.service.js
│   │   ├── program.service.js
│   │   ├── registration.service.js   # ✅ Renombrado
│   │   └── user.service.js           # ✅ Renombrado
│   └── css/
│       └── login.css
├── login.html                        # ✅ Actualizado
├── dashboard.html                    # ✅ Recreado
├── evento.html
├── eventType.html
├── formulario.html
├── index.html
├── parameter.html
├── parametHistos.html
├── programs.html
├── registration.html
└── README.md                         # Este archivo
```

## Estado del Proyecto

✅ **REPARADO Y LISTO PARA USAR**

Todos los errores han sido corregidos:
- Typos en nombres de archivos
- Inconsistencias en módulos AngularJS
- Referencias actualizadas en HTML
- Servicios y controllers organizados
