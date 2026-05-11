# Línea Desarrollo Institucional · ASC

Plataforma de formación online de la **Línea Desarrollo Institucional** de la Asociación Scouts de Colombia. Cursos cortos sobre gobernanza, planeación, finanzas sanas, salud institucional y los 8 ámbitos de gestión de la PNDI 2017.

🌐 **Producción:** https://maximoaluna-blip.github.io/INDUCCION-DESARROLLO-INSTITUCIONAL/

## Estado actual

Piloto del **Nivel 1 — Ruta de Fundamentación** (6 cursos, ~3 horas).

| # | Curso | Estado |
|---|-------|--------|
| 1 | 🏛️ Bienvenida al Desarrollo Institucional | ✅ Activo (piloto) |
| 2 | 📜 La Política PNDI — Marco y Principios | 🔒 Próximo |
| 3 | 🏗️ Niveles y Estructura del Movimiento | 🔒 Próximo |
| 4 | 🧭 Los 8 Ámbitos de Gestión | 🔒 Próximo |
| 5 | 💪 Las 6 Áreas Estratégicas y Salud Institucional | 🔒 Próximo |
| 6 | 🗺️ Mi Aporte al Desarrollo Institucional | 🔒 Próximo |

## Estructura del proyecto

```
INDUCCION-DESARROLLO-INSTITUCIONAL/
├── index.html                          # Landing público (GitHub Pages)
├── 404.html
├── assets/                             # Logos, favicon, dark theme
├── 02-Plataforma-Web/                  # HTMLs públicos
│   ├── cursos.json                     # Catálogo del Nivel 1
│   ├── bienvenida-desarrollo-institucional.html
│   ├── dashboard-admin.html
│   └── verificar-certificado.html
└── 05-Generador-Cursos/                # Pipeline de construcción
    ├── build-course.js                 # JSON → HTML
    ├── preview-course.js               # HTML → preview imprimible
    ├── templates/{engine.js, styles.css}
    ├── borradores/                     # Fuentes de verdad (JSON)
    └── previews/                       # (gitignored)
```

## Pipeline para crear/actualizar un curso

```bash
# 1. Editar el JSON
# 05-Generador-Cursos/borradores/<courseId>.json

# 2. Compilar
node 05-Generador-Cursos/build-course.js <courseId>

# 3. Preview imprimible
node 05-Generador-Cursos/preview-course.js <courseId>

# 4. (Opcional) PDF visual via Chrome headless
```

## Backend

Por simplicidad para el piloto, esta línea comparte el endpoint de Google Apps Script con la Línea Política de Adultos. Los registros se diferencian por `courseId`. Más adelante puede separarse en su propio script según volumen.

## Documentación

- [`Plan-de-Formacion-Linea-Desarrollo-Institucional.md`](../INDUCCION-DESARROLLO-INSTITUCIONAL/Plan-de-Formacion-Linea-Desarrollo-Institucional.md) (en carpeta de diseño separada)
- Marco metodológico común: ver portal `PORTAL-ADULTOS-ASC`.

---

© 2026 Asociación Scouts de Colombia
