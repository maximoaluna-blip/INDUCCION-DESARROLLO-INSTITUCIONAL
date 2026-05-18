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
| **PROD_SCRIPT_ID** | `1x151jipDy7V2zed9uz9GMIYgmnB8LBhiKdX61Pmj3amWzY83n0Bbji4i` |
| **PROD_DEPLOYMENT_URL** | `https://script.google.com/macros/s/AKfycbzs1IveYZc5i2hrH4P6NYtmMAasmVJ3gpIwRKb4SKEvWT6kFmuOsRcglZzNCkFdaTlE/exec` |
| **AUTH_TOKEN** | `ADULTOS_ASC_2026` |
| **Editor del script** | https://script.google.com/u/0/home/projects/1x151jipDy7V2zed9uz9GMIYgmnB8LBhiKdX61Pmj3amWzY83n0Bbji4i/edit |
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

Los mismos que el backend compartido. Ver [`BACKEND.md` de INDUCCION-ADULTOS](../INDUCCION-ADULTOS/BACKEND.md) para el detalle.

---

## Historial de incidentes

| Fecha | Incidente | Lección aprendida |
|---|---|---|
| 2026-05-17 | Dashboard de DI mostraba solo agregados. Causa raíz compartida con Adultos. | Documentar backend compartido en este archivo. Correr `verificar-backend.js` antes de tocar el backend. |

---

_Última actualización: 2026-05-17_
