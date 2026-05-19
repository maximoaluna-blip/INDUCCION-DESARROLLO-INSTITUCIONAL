# Backend — Línea Desarrollo Institucional

> Documento operativo del Apps Script que sirve de backend a esta línea.
> **Lee esto antes de tocar el Apps Script.** Lo que está acá es la fuente de verdad para evitar deployments huérfanos y desincronización entre código local y producción.

---

## ⚠️ Backend compartido durante el piloto

**Esta línea NO tiene Apps Script propio aún.** Durante el piloto del Curso 1 (Bienvenida al Desarrollo Institucional), comparte backend con la Línea Política de Adultos:

- Mismo Apps Script
- Mismo Google Sheet
- Mismo token de auth
- Los registros se distinguen por la columna `courseId` (ej. `bienvenida-desarrollo-institucional`)

→ Si quieres editar el código del backend, hazlo en el repo `INDUCCION-ADULTOS` (su `BACKEND.md` es la fuente de verdad).

---

## Identificadores (heredados del backend compartido)

| Campo | Valor |
|---|---|
| **PROD_SCRIPT_ID** | `1TTJ2VjNta0Vz4p6gAjwvsXggN8g8YfV-FrZuQtWvnUy0ZFRrYA-gCrqe` |
| **PROD_DEPLOYMENT_URL** | `https://script.google.com/macros/s/AKfycbxxZBp6XpmdRzZS0BXO02WMq31K5FUU8-Mqzc2Sj0PcwB3cMcrhIqbHQA0naUQb5mgBWw/exec` |
| **AUTH_TOKEN** | `ADULTOS_ASC_2026` |
| **Editor del script** | https://script.google.com/u/0/home/projects/1TTJ2VjNta0Vz4p6gAjwvsXggN8g8YfV-FrZuQtWvnUy0ZFRrYA-gCrqe/edit |
| **Repo dueño del backend** | `INDUCCION-ADULTOS` (mirar su `BACKEND.md`) |
| **courseIds de esta línea en el sheet** | `bienvenida-desarrollo-institucional` (y los siguientes que se publiquen) |

---

## Cómo verificar la sincronización (sin tocar nada)

```bash
node 05-Generador-Cursos/verificar-backend.js
```

Si el Paso 4 falla diciendo que faltan campos detallados → el deployment de producción tiene código viejo. Hay que redeployar desde el editor del script (ver `BACKEND.md` de INDUCCION-ADULTOS).

---

## Cuándo separar este backend del de Adultos

Considera crear un Apps Script propio para esta línea cuando:

- El volumen de inscripciones supere ~1000/mes (Apps Script tiene cuotas por ejecuciones diarias).
- Quieras dashboards completamente separados (no es estrictamente necesario — el `dashboard-admin.html` de cada línea ya filtra por courseId).
- Necesites lógica de negocio distinta (ej. emisión de certificados con plantillas diferentes).
- Quieras separar permisos administrativos por línea.

### Pasos para separar (cuando se decida):
1. Crear nuevo Apps Script desde la UI web.
2. Copiar el código de `google-apps-script.js`.
3. Crear nuevo Google Sheet vinculado.
4. Definir nuevo AUTH_TOKEN (ej. `DI_ASC_2026`).
5. Deployar como Web App "anyone".
6. Actualizar este `BACKEND.md` con los nuevos IDs.
7. Actualizar `build-course.js` con la nueva URL y token.
8. Recompilar todos los cursos de la línea.
9. Migrar los registros del sheet viejo al nuevo (solo los de `courseId` de esta línea).

---

## Endpoints expuestos

Los mismos que el backend compartido. Ver [`BACKEND.md` de INDUCCION-ADULTOS](../INDUCCION-ADULTOS/BACKEND.md) para el detalle de los endpoints estándar (registro, completados, eventos, recuperar progreso).

### Endpoints/handlers agregados en mayo 2026 (persistencia universal)

Como parte de la implementación de **persistencia híbrida universal** (Opción B) para que TODO el contenido textual del cursante se respalde en backend, se agregaron los siguientes handlers al Apps Script compartido:

| Handler | Pestaña destino | Qué guarda |
|---|---|---|
| `handleReflection` | `Reflexiones` | Una fila por reflexión escrita por el cursante en cualquier lección (campos: timestamp, email, courseId, moduleIndex, texto). |
| `handleAssessment` | `Autodiagnosticos` | El resultado de cualquier `self-assessment` o `plan-builder` con perfil (DI Curso 4 — competencias, etc.). Reemplaza la fila previa del mismo `(email, courseId, key)`. |
| `handlePlan` | `Planes` | El plan personal de desarrollo (ADULTOS Curso 5, DI Curso 6). Reemplaza la fila previa del mismo `(email, courseId)`. |
| `handleCatalog` | `Catalogos` | Catálogo de buenas prácticas del DI Curso 5 (`practices-builder`). Una fila por entrada del catálogo; las filas previas para `(email, courseId)` se borran antes de insertar. |

El handler `handleRecover` (recuperación por correo) fue extendido para devolver, además del progreso clásico, los campos `catalogs`, `reflectionsByCourse`, `assessments`, `plans`. El motor (`engine.js`) los recibe y rehidrata `localStorage` cross-device.

> **Patrón clave:** todos los handlers son **fire-and-forget** desde el frontend. `localStorage` sigue siendo la fuente de verdad inmediata; el backend se actualiza en background y solo se consulta cuando el cursante pide "recuperar progreso por correo". Una caída del backend nunca rompe la experiencia.

### Estado de despliegue

- **AUTH_TOKEN:** `ADULTOS_ASC_2026` (sin cambios).
- **Versión productiva:** deployment `@5` (mayo 2026) — incluye los 4 handlers nuevos y el `handleRecover` extendido. La línea ROVER mantiene su propio Apps Script (`@4`) con el mismo conjunto de handlers.
- **Verificación:** `node 05-Generador-Cursos/verificar-backend.js` retorna 4/4 OK desde el deployment `@5`.

---

## Historial de incidentes

| Fecha | Incidente | Lección aprendida |
|---|---|---|
| 2026-05-17 | Dashboard de DI mostraba solo agregados. Causa raíz compartida con Adultos. | Documentar backend compartido en este archivo. Correr `verificar-backend.js` antes de tocar el backend. |
| 2026-05-18 | Reflexiones, autodiagnósticos, planes y catálogos vivían solo en `localStorage` — vulnerables a borrado de navegador / cambio de dispositivo. | Implementar persistencia híbrida universal: 4 nuevos handlers + 4 nuevas pestañas. Mantener `localStorage` como fuente inmediata; backend solo para recuperación. |

---

_Última actualización: 2026-05-19_
