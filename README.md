# Línea Desarrollo Institucional · ASC

Plataforma de formación online de la **Línea Desarrollo Institucional** de la Asociación Scouts de Colombia. Cursos cortos sobre gobernanza, planeación, finanzas sanas, salud institucional y los 8 ámbitos de gestión de la PNDI 2017.

🌐 **Producción:** https://maximoaluna-blip.github.io/INDUCCION-DESARROLLO-INSTITUCIONAL/

## Estado actual

**Línea completa: los cuatro niveles**, cada curso con las tres auditorías (doctrinal, pedagógica y funcional). El detalle por curso y por nivel lo genera el repo raíz en `ESTADO.md` (`python generar-estado.py`); la lista de cursos, con su ADR, está en `INDICE-PROYECTO.md`. El reparto del Nivel 3 con Política de Adultos está en el Plan §5.

## Estructura del proyecto

```
INDUCCION-DESARROLLO-INSTITUCIONAL/
├── index.html                          # Landing público (GitHub Pages)
├── 404.html
├── verificar-certificado.html        # Valida un código ASC-AAAA-XXXXX contra el backend (ADR-070)
├── assets/                             # Logos, favicon, dark theme
├── 02-Plataforma-Web/                  # HTMLs públicos
│   ├── cursos.json                     # Catálogo: Nivel 1 (6 cursos) + Nivel 2 (8 de 8) — con level/levelName/order
│   ├── *.html                          # Un HTML por curso
│   ├── dashboard-admin.html
│   └── verificar-certificado.html
├── 05-Generador-Cursos/                # Pipeline de construcción
│   ├── build-course.js                 # JSON → HTML (preserva el status del catálogo en cada rebuild)
│   ├── preview-course.js               # HTML → preview imprimible
│   ├── templates/{engine.core.js (copia de _MOTOR), render.plan-builder.js (copia), engine.linea.js, styles.css}
│   ├── borradores/                     # Fuentes de verdad (JSON)
│   └── previews/                       # (gitignored)
└── PRUEBAS-E2E/                        # Auditoría funcional (Playwright + axe), corre en CI
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
