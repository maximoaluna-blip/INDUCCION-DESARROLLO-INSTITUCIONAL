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
├── 01-Diseno-Cursos/                                       ← Diseños pedagógicos (.md), uno por curso
│   └── Curso-01..06-*.md                                   ← los 6 del Nivel 1
│
├── 02-Plataforma-Web/
│   ├── cursos.json                                         ← Catálogo del Nivel 1 (6 cursos active)
│   ├── *.html                                              ← los 6 cursos generados
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
        └── *.json                                          ← Fuente de verdad de los 6 cursos
```

---

## Cursos del Nivel 1 (Fundamentación)

> Nivel 1 completo y en producción: los 6 cursos están construidos, con `status: "active"` en `cursos.json` y publicados (HTTP 200).

| # | Curso | courseId | Duración | Estado |
|---|---|---|---|---|
| 1 | 🏛️ Bienvenida al Desarrollo Institucional | `bienvenida-desarrollo-institucional` | 25 min | ✅ Activo |
| 2 | 📜 La Política PNDI: Marco y Principios | `pndi-marco-y-principios` | 30 min | ✅ Activo |
| 3 | 🏗️ Niveles y Estructura del Movimiento | `niveles-y-estructura-movimiento` | 35 min · 7 lecciones | ✅ Activo |
| 4 | 🧭 Los 8 Ámbitos de Gestión | `los-8-ambitos-de-gestion` | 35 min | ✅ Activo |
| 5 | 🌟 Buenas Prácticas en Tu Grupo | `buenas-practicas-en-tu-grupo` | 30 min | ✅ Activo |
| 6 | 🗺️ Mi Aporte al Desarrollo Institucional | `mi-aporte-al-desarrollo-institucional` | 30 min | ✅ Activo |

**Niveles siguientes:**

- **Nivel 2 — Profundización por ámbito de gestión** (8 cursos): Gobernanza Práctica, Planeación, Administración del Grupo, Finanzas Sanas, Captación de Fondos, Comunicaciones, Crecimiento, Gestión del Riesgo.
- **Nivel 3 — Especialización por cargo** (6 cursos): Cargos del Consejo, Jefe de Grupo, Presidente, Consejero, Comisionado, Vigilancia y Control.
- **Nivel 4 — Transversales** (4 cursos): Salud Institucional, Buenas Prácticas, Código de Honor, Articulación con Plan Trienal Mundial y Regional.

Detalle completo en [`Plan-de-Formacion-Linea-Desarrollo-Institucional.md`](Plan-de-Formacion-Linea-Desarrollo-Institucional.md).

---

## Features de plataforma activas

- ✅ Lecciones cortas (3-7 min) con auto-guardado en `localStorage` **verificado** — si la escritura falla, se avisa en vez de perder el trabajo del estudiante en silencio.
- ✅ **Componentes propios de la línea:** brújula personal cross-course, constructor de buenas prácticas, planificador de metas y generador de PDF.
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

**Base común a las 3 líneas (14):**
`paragraph`, `heading`, `info-box`, `mission-box`, `list`, `timeline`, `method-grid`, `blockquote`, `course-objectives`, `video`, `policy-quote`, `photo-upload`, `self-assessment`, `plan-builder`.

**Propios de esta línea (7)** — no existen en Política de Adultos ni en Programa de Jóvenes:
`brujula-display`, `brujula-action`, `practices-builder`, `goal-planner`, `catalog-display`, `courses-suggestion`, `pdf-generator`.

> Es la línea con el renderer **más extendido**: 21 tipos frente a los 14 de las otras dos, y ~613 líneas adicionales de `engine.js`. El catálogo autoritativo es el `enum` de `05-Generador-Cursos/course-schema.json`, que `build-course.js` **valida antes de compilar**: usar un tipo que no esté ahí hace fallar el build.

---

## Workflow de cambios

### Cambio de contenido (texto, quiz, lección)

1. Editar `05-Generador-Cursos/borradores/<courseId>.json`.
2. `node 05-Generador-Cursos/build-course.js <courseId>` → regenera el HTML.
3. (Opcional) `node 05-Generador-Cursos/preview-course.js <courseId>` → preview HTML/PDF.
4. `git add` + `commit` + `push` → GitHub Pages redespliega automáticamente.

### Cambio de motor o template (afecta a todos los cursos)

1. Editar `05-Generador-Cursos/build-course.js` o `05-Generador-Cursos/templates/{styles.css,engine.js}`.
2. **Si el cambio es del núcleo común, aplicarlo también en las otras dos líneas** — el motor está copiado y no viaja solo (ADR-025).
3. Rebuild de **todos** los cursos:
   ```bash
   for c in $(ls 05-Generador-Cursos/borradores/*.json | xargs -n1 basename -s .json); do
     node 05-Generador-Cursos/build-course.js $c
   done
   ```
4. **Verificar que no quedó divergencia:** `python ../verificar-motor.py`
5. Correr `cd PRUEBAS-E2E && npx playwright test` y push.

> **Regla de estilo:** no poner `color:` en estilos **inline** desde `build-course.js` — el tema oscuro no puede sobrescribirlo y el elemento queda ilegible en modo oscuro. Va en `styles.css` con su variante `html[data-theme="dark"]`.

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

## Estado actual (03-ago-2026)

**Nivel 1 completo, en producción y con las 3 auditorías pasadas.** Los 6 cursos están `active` y verificados en vivo.

| Auditoría | Estado | Detalle |
|---|---|---|
| **Doctrinal** (`/auditar-curso`) | ✅ 02-ago-2026 | Primera pasada formal: **10 hallazgos críticos** en 3 cursos (citas alteradas, un cargo inexistente, cifras sin respaldo). Todos corregidos |
| **Pedagógica** (`/auditar-pedagogia`) | ✅ 02-ago-2026 | ~19 quizzes reescritos, hook narrativo añadido a los 6 cursos |
| **Funcional** (`PRUEBAS-E2E`) | ✅ en CI | 50 tests. Desde el 03-ago la accesibilidad recorre **todos los módulos**, no solo el registro |

> **Doctrina corregida en el camino (ADR-022):** el cargo de **Fiscal/Revisor Fiscal de Grupo y Región no está vigente** — lo reemplaza el **Contador**, confirmado por consulta directa con la Jefatura Scout Nacional. Excepción: región con personería jurídica propia. Esta línea estuvo retirada del público unas horas mientras se verificaba (ADR-021, ya cerrado).
>
> **El piloto humano dejó de ser bloqueante** (ADR-019): las 3 auditorías son la compuerta.

## Pendientes / próximas etapas

### Fase siguiente

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

**Última ejecución completa: 03-ago-2026** (`DECISIONES.md` ADR-025). Dos hallazgos de fondo: el **motor está copiado en las 3 líneas** y ya divergió, y la **auditoría de accesibilidad solo cubría el módulo de registro**. Al ampliarla aparecieron bugs de contraste reales en los componentes propios de esta línea — los estados vacíos de la brújula a 1.75:1 en modo oscuro y un `<select>` del goal-planner sin etiqueta accesible —, ya corregidos.

### Herramientas de verificación

| Comando | Qué revisa |
|---|---|
| `node 05-Generador-Cursos/build-course.js <curso>` | Esquema del JSON, reglas de quiz, sesgo de longitud |
| `cd PRUEBAS-E2E && npx playwright test` | Flujo del alumno, enlaces, responsive y accesibilidad de **todos** los módulos |
| `python ../verificar-motor.py` | Divergencia del motor entre las 3 líneas |
| `python ../verificar-consistencia.py` | Catálogo ↔ portal ↔ panel admin ↔ ledger de auditorías |
| `node 05-Generador-Cursos/verificar-backend.js` | Sincronización con el Apps Script — **correr siempre antes de tocar el backend** |

---

## Cómo trabaja Claude Code sobre este proyecto

Todos los cambios se aplican **end-to-end automáticamente** (edit → validate → build → preview → verify → commit → push → verify deploy). El usuario no tiene que pedir cada paso del pipeline.

Inventario completo de scripts (`build-course.js`, `preview-course.js`, `verificar-backend.js`, etc.), triggers que activan procesos automáticos, y patrón de "self-applying changes" documentado en [`FLUJOS-AUTONOMOS-Y-SCRIPTS.md`](https://github.com/maximoaluna-blip/PORTAL-ADULTOS-ASC/blob/main/FLUJOS-AUTONOMOS-Y-SCRIPTS.md) (vive en PORTAL-ADULTOS-ASC porque aplica al ecosistema completo).

---

_Revisado el 03-ago-2026 contra el estado real (auditoría de código, `DECISIONES.md` ADR-025). Correcciones: la sección de pendientes decía "Fase actual: Curso 1 piloto" cuando los **6 cursos llevaban meses activos**; el renderer se describía como "idéntico al de Política de Adultos" cuando esta línea tiene **21 tipos frente a 14** (7 componentes propios); el árbol de carpetas solo listaba el Curso 1; Curso 3 a **35 min y 7 lecciones**; añadidas las 3 auditorías, la doctrina del ADR-022 y las herramientas de verificación._
