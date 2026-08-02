# PRUEBAS-E2E — Auditoría funcional de la Línea Desarrollo Institucional

Suite de [Playwright](https://playwright.dev) que verifica la plataforma de forma
repetible: la tercera pata de calidad, junto a la **doctrinal** (`/auditar-curso`) y la
**pedagógica** (`/auditar-pedagogia`). Responde a "¿funciona?", no a "¿es verdad?" ni
"¿enseña bien?". **No reemplaza el piloto humano** (opcional desde ADR-019).

Es una copia adaptada de `INDUCCION-PROGRAMA-JOVENES/PRUEBAS-E2E` (que a su vez viene de
`INDUCCION-ADULTOS/PRUEBAS-E2E`, diseñada agnóstica de línea desde el inicio): la mayoría
de los archivos son **idénticos**. Solo se adaptaron los defaults propios de esta línea
(`playwright.config.js`, `tests/_setup-cursos.js`, `tests/cursos.js`,
`tests/e2e-integracion.spec.js`).

## Estado: Fase 0 + Fase 1a (sin backend real)

Corre contra el sitio **público** (GitHub Pages). **No escribe nada** en el backend de
Apps Script: en Fase 1a las llamadas se interceptan con `page.route()` (`tests/_backend.js`).
Esta línea comparte backend y token (`ADULTOS_ASC_2026`) con Política de Adultos y
Programa de Jóvenes durante el piloto.

**Fase 0 — verificación estática:**

| Archivo | Qué verifica | Checklist |
|---|---|---|
| `tests/smoke.spec.js` | Cada curso carga, título no vacío, sin excepciones JS | §G |
| `tests/links.spec.js` | 0 enlaces internos rotos (externos: solo se reportan) | §M |
| `tests/a11y.spec.js` | Accesibilidad axe WCAG A/AA, claro + oscuro | §H |
| `tests/responsive.spec.js` | Sin scroll horizontal en móvil (Pixel 5) y escritorio | §H |
| `tests/persistence.spec.js` | La preferencia de tema sobrevive a recarga (localStorage) | §F, §H |
| `tests/portal.spec.js` | El portal carga, `lineas.json` válido y enlaces de líneas activas (solo si `ASC_PORTAL_URL`) | §G, §M |

**Fase 1a — flujo del alumno (backend interceptado, sin escribir en prod):**

| Archivo | Qué verifica | Checklist |
|---|---|---|
| `tests/e2e-flujo.spec.js` | Registro → responder cada quiz ≥70% → recorrer módulos → certificado `ASC-AAAA-XXXXX`. Verifica el contrato POST (`register`/`quiz`/`progress`/`certificate` + `token` + `course`), idempotencia del certificado incluida. Corre sobre los 6 cursos activos del Nivel 1. | §F, §G |
| `tests/e2e-plan-builder.spec.js` | Descubre en runtime el curso con `plan-builder`, si alguno lo tiene, y verifica que persiste tras recargar | §F |
| `tests/_backend.js` | Helper: intercepta y captura las llamadas a Apps Script | — |

## Cursos cubiertos (6, Nivel 1 completo)

`bienvenida-desarrollo-institucional`, `pndi-marco-y-principios`,
`niveles-y-estructura-movimiento`, `los-8-ambitos-de-gestion`,
`buenas-practicas-en-tu-grupo`, `mi-aporte-al-desarrollo-institucional`.

## Instalación

```bash
cd PRUEBAS-E2E
npm install
npx playwright install chromium
```

## Uso

```bash
npm test              # toda la suite
npm run smoke         # solo smoke
npm run links         # solo enlaces
npm run a11y          # solo accesibilidad
npm run responsive    # solo responsive
npm run persistence   # solo persistencia
npm run report        # abrir el último reporte HTML
```

```bash
# Un build local servido en localhost
ASC_BASE_URL="http://localhost:8099/02-Plataforma-Web/" npm test
```

## Proyectos (navegadores/viewports)

- `desktop-chromium` — Chrome de escritorio.
- `movil-android` — Pixel 5 (audiencia principal). Los tests marcados
  `@solo-escritorio` (enlaces, a11y, persistencia, flujo E2E) no se duplican en móvil.

## CI

`.github/workflows/pruebas-e2e.yml` (en la raíz de este repo) corre la suite completa en
cada push/PR a `main`: recompila los 6 cursos activos con `build-course.js`, los sirve en
`localhost:8099` y corre `npx playwright test`.

## Pendiente — Fase 1b (persistencia real en un Sheet de pruebas)

Igual que en Adultos y PJ: comprobar que los datos se **escriben** de verdad contra un
backend de pruebas real. Procedimiento en
`INDUCCION-ADULTOS/PRUEBAS-E2E/SETUP-FASE-1B.md` (backend compartido, mismo token); el
`course` de prueba ya está fijado a `bienvenida-desarrollo-institucional` en
`tests/e2e-integracion.spec.js`.
