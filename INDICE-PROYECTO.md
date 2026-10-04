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
├── Plan-de-Formacion-Linea-Desarrollo-Institucional.md    ← Plan de los 20 cursos (4 niveles)
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

## Cursos del Nivel 2 (Profundización por ámbito de gestión) — completo

> Abierto el 27-sep-2026 con el Curso 7 (ADR-085) y cerrado el 28-sep-2026 con el Curso 14 (ADR-103), bajo la autonomía que dio el dueño hasta completar el nivel. De los 8 focos del Plan, 6 no tenían fuente o la tenían a medias: cada diseño lo registra en su §0.

| # | Curso | courseId | Duración | Estado |
|---|---|---|---|---|
| 7 | 🏛️ Gobernanza Práctica | `gobernanza-practica` | ~35 min · 7 lecciones | ✅ Activo (27-sep-2026) |
| 8 | 🧭 Planeación: del Plan Estratégico al POA | `planeacion-plan-estrategico-poa` | ~32 min · 7 lecciones | ✅ Activo (27-sep-2026, ADR-088) |
| 9 | 🗂️ Administración del Grupo | `administracion-del-grupo` | ~30 min · 7 lecciones | ✅ Activo (27-sep-2026, ADR-092) |
| 10 | 💰 Finanzas Sanas: Presupuesto y Tesorería | `finanzas-sanas-presupuesto-tesoreria` | ~32 min · 7 lecciones | ✅ Activo (27-sep-2026, ADR-089) |
| 11 | 🌱 Captación de Fondos y Ciclo de Proyectos | `captacion-fondos-ciclo-proyectos` | ~35 min · 7 lecciones | ✅ Activo (27-sep-2026, ADR-093) |
| 12 | 📣 Comunicaciones y Relaciones Interinstitucionales | `comunicaciones-relaciones-interinstitucionales` | ~34 min · 7 lecciones | ✅ Activo (27-sep-2026, ADR-101) |
| 13 | 📈 Crecimiento y Sistema de Información | `crecimiento-sistema-informacion` | ~31 min · 7 lecciones | ✅ Activo (27-sep-2026, ADR-102) |
| 14 | 🛡️ Gestión del Riesgo | `gestion-del-riesgo` | ~33 min · 7 lecciones | ✅ Activo (28-sep-2026, ADR-103) |

**Nivel 3 — Especialización por cargo** (3 cursos, 15–17). El panorama de cargos, el Consejero y el Jefe de Grupo son de Política de Adultos (ADR-107 de PA, ADR-111).

| # | Curso | courseId | Duración | Estado |
|---|---|---|---|---|
| 15 | 🪑 Presidente y Vicepresidente: conducir el Consejo | `conducir-el-consejo` | ~39 min · 7 lecciones | ✅ Activo (28-sep-2026, ADR-111) |
| 16 | 🗺️ El Comisionado: llevar la Política a los grupos | `comisionado-region-nacion` | ~37 min · 7 lecciones | 🛠️ En auditoría |
| 17 | Órganos de control y disciplina por nivel | — | — | Por construir |

**Niveles siguientes:**

- **Nivel 4 — Transversales** (3 cursos, 18–20): Salud institucional y GSAT, Ética e integridad en el cargo, Planes mundial y regional.

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

## Estado actual (28-sep-2026)

**Niveles 1 y 2 completos: 14 cursos `active`** (Nivel 2: Cursos 7 a 14, cerrado el 28-sep-2026 con el ADR-103), todos con las 3 auditorías. El Curso 7 (`gobernanza-practica`, ADR-085) pasó doctrinal y pedagógica **con re-auditoría** y la suite E2E contra el build local antes de publicarse.

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

- **Nivel 2 — Profundización**: completo (8 de 8).
- **Nivel 3 — Especialización por cargo** (3 cursos, 15–17): **cerrado el 02-oct-2026** (ADR-111, 112, 113).
- **Nivel 4 — Transversales** (3 cursos, 18–20): **cerrado el 03-oct-2026** (ADR-122 a 125). La línea está completa.
- **Revisar cuando la Asamblea apruebe el plan nacional siguiente** (RN Art. 26; el 2023–2026 vence el 31-dic-2026): L5, L6 y L7 del Curso 20 lo citan como vigente.
- **Revisar hacia julio de 2027** lo que los cursos citan del Reglamento de Grupos (RN Art. 246).
- Evaluar si separar el backend de la Línea Política de Adultos (criterios en `BACKEND.md`).

### Consultas pendientes (al CSN o a la DNDI; ninguna cambia lo que enseñan los cursos publicados)

- **RN Art. 231, literal d:** el texto se corta en el PDF oficial (Cursos 9, 10 y 11 citan la regla principal, que está completa).
- **Acuerdo CSN 558/2023:** su texto no está en el corpus; se aplica por lo que dicen el ADR-022 y el glosario. De su redacción depende si la presidencia del Vicepresidente en la Comisión Ad-hoc (RG 8.2 y 8.5) sigue citable (ADR-109).
- **RN Art. 81:** si «consejeros» incluye a los del Consejo de Grupo (compensación por gestión de donaciones, Curso 11; el curso toma la lectura prudente).
- **RN Art. 47:** si a la excepción («los miembros, patrocinadores y honorarios») le falta «colaboradores», como en el RG 4.2.3 (Curso 13).
- **Documentos que no están en el corpus:** Manual de Imagen Corporativa y Reglamento de Uniformes, Insignias y Distintivos (RN 232, 235; Curso 12), Manual de Afiliaciones (RN 43; Curso 13), manuales de crecimiento de la DNDI, Protocolo Nacional de Transporte, Política de Conflictos de Intereses (Acuerdo 419), Constitución de la OMMS (cita del Curso 3).

### Tareas técnicas

- ~~Privacidad del compromiso en los Cursos 9 a 14~~: corregida el 02-oct-2026 en once cursos (ADR-116), junto con dos promesas que el sistema no cumplía (correo en el Curso 1, «queda en tu certificado» en el 6).

- Extender `checkOvejaNegra` a **prefijos** de 2–4 palabras (ver la deuda técnica de `DECISIONES.md`).
- Variar la última pregunta de los **Cursos 9 y 10**, que comparten el molde «Proponer al Consejo de <mes>…».

---

## Contenido de origen

Los **talleres Flor de Lis II 2026** (Sesiones 2 y 3, dictados por dirigentes de la Regional Valle del Cauca) son una fuente importante de testimonios y ejemplos para esta línea. Los segmentos transcritos y cortados están en `../FLOR DE LIS 2 SESIONES 2 Y 3/` (fuera del repo).

Las definiciones doctrinales provienen de los documentos oficiales de la ASC: **PNDI 2017, Estatuto Nacional 2025, Plan Estratégico 2023-2026**, complementados con la **Estrategia para el Movimiento Scout 2024–2033**, el **Plan Trienal Mundial 2024–2027** y el **Plan Trienal Regional Interamericano 2025–2028** (los de 2021–2024 y 2022–2025 ya vencieron).

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
