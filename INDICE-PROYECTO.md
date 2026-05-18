# INDUCCION-DESARROLLO-INSTITUCIONAL — Plataforma de Formación en Desarrollo Institucional

## Asociación Scouts de Colombia · Línea Desarrollo Institucional

**Proyecto:** Formación digital gratuita para adultos voluntarios del movimiento scout sobre Desarrollo Institucional (gobernanza, planeación, finanzas sanas, salud institucional, los 8 ámbitos de gestión PNDI 2017).

- **URL Producción:** https://maximoaluna-blip.github.io/INDUCCION-DESARROLLO-INSTITUCIONAL/
- **Repositorio:** https://github.com/maximoaluna-blip/INDUCCION-DESARROLLO-INSTITUCIONAL
- **Línea hermana:** [INDUCCION-ADULTOS](https://github.com/maximoaluna-blip/INDUCCION-ADULTOS) — Línea Política de Adultos en el Movimiento.
- **Portal madre:** [PORTAL-ADULTOS-ASC](https://maximoaluna-blip.github.io/PORTAL-ADULTOS-ASC/) — landing pública de las 4 líneas.
- **Panel administrativo:** [PORTAL-ADMIN-ASC](https://maximoaluna-blip.github.io/PORTAL-ADMIN-ASC/) — dashboard unificado.

---

## Arquitectura

```
Usuario  →  GitHub Pages (HTML estático)  →  Google Apps Script  →  Google Sheets
                                          ←─  JSON responses    ←─
```

- **Frontend:** HTML5 + CSS3 + JavaScript vanilla (sin frameworks).
- **Hosting:** GitHub Pages, branch `main`, deploy automático.
- **Backend datos:** Google Sheets vía Google Apps Script — **compartido con la Línea Política de Adultos** durante el piloto. Los registros se diferencian por `courseId`.
- **Generación de cursos:** Node.js (`build-course.js`) — JSON → HTML.
- **Despliegue del backend:** `clasp` (Google Apps Script CLI) — `clasp push -f` actualiza el HEAD; los deployments se crean desde la UI web.
- **Certificados PDF:** html2pdf.js + html2canvas + jsPDF (cliente).
- **Tema oscuro:** CSS variables + localStorage (clave compartida `rover-theme`).

---

## Estructura de carpetas

```
INDUCCION-DESARROLLO-INSTITUCIONAL/
├── index.html                                              ← Landing pública de la línea
├── 404.html
├── BACKEND.md                                              ← Documento operativo del backend
├── CREAR-CURSO.md                                          ← Manual para crear un curso
├── AUDITORIA.md                                            ← Proceso de auditoría
├── INDICE-PROYECTO.md                                      ← Este archivo
├── README.md                                               ← Para visitantes del repo
├── Plan-de-Formacion-Linea-Desarrollo-Institucional.md    ← Plan de los 24 cursos (4 niveles)
├── Recomendaciones-Cowork-Diseno-Cursos.md                ← Guía pedagógica para Cowork
│
├── assets/
│   ├── logo-asc.png
│   ├── logo-vallescout.png
│   ├── favicon.svg
│   ├── dark-theme.css
│   └── theme-toggle.js
│
├── 01-Diseno-Cursos/                                       ← Diseños pedagógicos (.md) de cada curso
│   └── Curso-01-Bienvenida-al-Desarrollo-Institucional.md  ← Ejemplo canónico
│
├── 02-Plataforma-Web/
│   ├── cursos.json                                         ← Catálogo del Nivel 1
│   ├── bienvenida-desarrollo-institucional.html            ← Curso 1 (generado)
│   ├── dashboard-admin.html                                ← Redirect al portal admin unificado
│   └── verificar-certificado.html                          ← Verificador público de certificados
│
└── 05-Generador-Cursos/
    ├── build-course.js                                     ← Constructor JSON → HTML
    ├── preview-course.js                                   ← Generador de preview
    ├── verificar-backend.js                                ← Validador pre-deploy
    ├── course-schema.json
    ├── course-schema.example.json
    ├── templates/
    │   ├── styles.css
    │   └── engine.js
    └── borradores/
        └── bienvenida-desarrollo-institucional.json        ← Fuente de verdad del Curso 1
```

---

## Cursos del Nivel 1 (Fundamentación)

| # | Curso | courseId | Duración | Estado |
|---|---|---|---|---|
| 1 | 🏛️ Bienvenida al Desarrollo Institucional | `bienvenida-desarrollo-institucional` | 25 min | ✅ Piloto |
| 2 | 📜 La Política PNDI — Marco y Principios | `politica-pndi` | 30 min | 🔒 Por construir |
| 3 | 🏗️ Niveles y Estructura del Movimiento | `niveles-y-estructura` | 30 min | 🔒 Por construir |
| 4 | 🧭 Los 8 Ámbitos de Gestión | `ocho-ambitos-de-gestion` | 35 min | 🔒 Por construir |
| 5 | 💪 Las 6 Áreas Estratégicas y Salud Institucional | `salud-institucional` | 30 min | 🔒 Por construir |
| 6 | 🗺️ Mi Aporte al Desarrollo Institucional | `mi-aporte-al-di` | 30 min | 🔒 Por construir |

**Niveles siguientes:**

- **Nivel 2 — Profundización por ámbito de gestión** (8 cursos): Gobernanza Práctica, Planeación, Administración del Grupo, Finanzas Sanas, Captación de Fondos, Comunicaciones, Crecimiento, Gestión del Riesgo.
- **Nivel 3 — Especialización por cargo** (6 cursos): Cargos del Consejo, Jefe de Grupo, Presidente, Consejero, Comisionado, Vigilancia y Control.
- **Nivel 4 — Transversales** (4 cursos): Salud Institucional, Buenas Prácticas, Código de Honor, Articulación con Plan Trienal Mundial y Regional.

Detalle completo en [`Plan-de-Formacion-Linea-Desarrollo-Institucional.md`](Plan-de-Formacion-Linea-Desarrollo-Institucional.md).

---

## Features de plataforma activas

- ✅ Lecciones cortas (3-7 min) con auto-guardado en `localStorage`.
- ✅ **Pre-llenado del registro** entre cursos (clave global `globalUserProfile`, compartido con Adultos).
- ✅ **Recuperación de avance** vía email.
- ✅ **Subida de foto** (Curso 1, dibujo del grupo saludable ideal).
- ✅ **Certificados acumulables** + verificación pública por código `ASC-AAAA-XXXXX`.
- ✅ **Citas oficiales plegables** (`policy-quote`) con redacción literal de la doctrina.
- ✅ **Modo oscuro** (clave `rover-theme`).
- ✅ **Backup nocturno** del Sheet (compartido con Adultos).
- ✅ **Dashboard admin unificado** en PORTAL-ADMIN-ASC.

---

## Tipos de sección soportados (renderer)

`paragraph`, `heading`, `info-box`, `mission-box`, `list`, `timeline`, `method-grid`, `blockquote`, `course-objectives`, `video`, `policy-quote`, `photo-upload`, `self-assessment`, `plan-builder`.

Idéntico al renderer de la Línea Política de Adultos. No requiere cambios al motor para construir los siguientes cursos del Nivel 1.

---

## Workflow de cambios

### Cambio de contenido (texto, quiz, lección)

1. Editar `05-Generador-Cursos/borradores/<courseId>.json`.
2. `node 05-Generador-Cursos/build-course.js <courseId>` → regenera el HTML.
3. (Opcional) `node 05-Generador-Cursos/preview-course.js <courseId>` → preview HTML/PDF.
4. `git add` + `commit` + `push` → GitHub Pages redespliega automáticamente.

### Cambio de motor o template (afecta a todos los cursos)

1. Editar `05-Generador-Cursos/build-course.js` o `05-Generador-Cursos/templates/{styles.css,engine.js}`.
2. Rebuild de **todos** los cursos:
   ```bash
   for c in $(ls 05-Generador-Cursos/borradores/*.json | xargs -n1 basename -s .json); do
     node 05-Generador-Cursos/build-course.js $c
   done
   ```
3. Push.

### Cambio de backend (Apps Script)

**Importante:** el backend es compartido. Cualquier cambio afecta también a la Línea Política de Adultos.

1. **Antes:** `node 05-Generador-Cursos/verificar-backend.js` → debe estar 4/4 OK.
2. Editar el código en el repo "fuente": `INDUCCION-ADULTOS/05-Generador-Cursos/google-apps-script.js` (es el responsable canónico del código).
3. Copiar a `.clasp-workspace/Código.js` y `clasp push -f`.
4. Crear deployment nuevo desde la UI web del Apps Script con permisos *Cualquier usuario*.
5. Actualizar `BACKEND.md` (en ambos repos) con la nueva URL.
6. Actualizar `build-course.js` (en ambos repos) con la URL default nueva.
7. Recompilar todos los HTMLs de ambos repos.
8. Push.
9. **Después:** `node verificar-backend.js` → 4/4 OK.

Detalles en [`BACKEND.md`](BACKEND.md).

---

## Cuentas y credenciales

- **GitHub:** `maximoaluna-blip` — autenticado vía `gh` CLI.
- **Google (Apps Script + Sheets + Drive):** `maximoaluna@gmail.com` — autenticado vía `clasp`.
- **Token de auth backend:** `ADULTOS_ASC_2026` (compartido durante el piloto).
- **PROD_SCRIPT_ID:** `1TTJ2VjNta0Vz4p6gAjwvsXggN8g8YfV-FrZuQtWvnUy0ZFRrYA-gCrqe`
- **PROD_DEPLOYMENT_URL:** `https://script.google.com/macros/s/AKfycbxxZBp6XpmdRzZS0BXO02WMq31K5FUU8-Mqzc2Sj0PcwB3cMcrhIqbHQA0naUQb5mgBWw/exec`

---

## Pendientes / próximas etapas

### Fase actual (Curso 1 piloto)

- Compartir URL del Curso 1 con 5-10 adultos voluntarios.
- Recoger retroalimentación durante 1-2 semanas.
- Aplicar ajustes de contenido según observaciones.

### Fase siguiente (Cursos 2-6 del Nivel 1)

- Construir cada curso siguiendo el patrón del Curso 1 (ver `CREAR-CURSO.md`).
- Diseño pedagógico viene de Cowork (ver `Recomendaciones-Cowork-Diseno-Cursos.md`).
- Implementación técnica en Claude Code.

### Fase posterior

- **Nivel 2 — Profundización** (8 cursos por ámbito de gestión).
- **Nivel 3 — Especialización por cargo** (6 cursos).
- **Nivel 4 — Transversales** (4 cursos), priorizando el Curso 23 (Código de Honor) por su carácter universal.
- Evaluar si separar el backend de la Línea Política de Adultos (criterios en `BACKEND.md`).

---

## Contenido de origen

Los **talleres Flor de Lis II 2026** (Sesiones 2 y 3, dictados por dirigentes de la Regional Valle del Cauca) son una fuente importante de testimonios y ejemplos para esta línea. Los segmentos transcritos y cortados están en `../FLOR DE LIS 2 SESIONES 2 Y 3/` (fuera del repo).

Las definiciones doctrinales provienen de los documentos oficiales de la ASC: **PNDI 2017, Estatuto Nacional 2025, Plan Estratégico 2023-2026**, complementados con el **Plan Trienal Mundial 2021-2024 (OMMS)** y el **Plan Regional Interamericano 2022-2025**.

---

## Auditoría del código

Cuando el dueño del proyecto diga *"revisa completo el código"* se ejecutan las 4 etapas documentadas en [`AUDITORIA.md`](AUDITORIA.md): scan → report → apply → verify.

Antes de cualquier acción sobre el backend, correr siempre [`05-Generador-Cursos/verificar-backend.js`](05-Generador-Cursos/verificar-backend.js).
