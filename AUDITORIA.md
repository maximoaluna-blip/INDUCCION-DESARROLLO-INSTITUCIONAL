# Proceso de Auditoría, Revisión y Depuración

> Línea Desarrollo Institucional — ASC.

Este documento describe el proceso que se ejecuta cuando el usuario diga la frase trigger:

> **"revisa completo el codigo"**

(o variaciones: *"audita el código", "haz limpieza", "optimiza todo"*)

El objetivo es mantener la plataforma sana después de cada ronda de cambios — encontrar inconsistencias, código muerto, problemas de seguridad o calidad, y aplicar mejoras incrementales sin romper lo que funciona.

---

## Stages del proceso

### Stage 1 — Scan (escaneo)

Recorrer el código aplicando estos checks:

#### A. Limpieza y código muerto

- Archivos no referenciados desde `cursos.json`, `index.html` o cualquier otro código activo.
- Funciones JS no llamadas desde ningún lado (búsqueda con grep).
- `console.log`/`console.warn`/`debugger` que quedaron de debugging.
- Comentarios `TODO`/`FIXME`/`XXX` que apunten a problemas reales (no notas de diseño).
- Strings que referencian la línea de Adultos en lugares específicos de DI (cuidar separación entre líneas).

#### B. Seguridad

- Credenciales o tokens hardcodeados en archivos públicos de manera incorrecta.
  - El `AUTH_TOKEN` del Apps Script SÍ va hardcodeado por diseño — verificar que esté solo en `google-apps-script.js` y `engine.js`, no en otros lugares.
- Uso de `innerHTML` con datos de usuario sin sanitizar (XSS).
- URLs expuestas que no deberían ser públicas.
- Datos sensibles guardados en `localStorage` sin necesidad.

#### C. Performance

- Archivos grandes sin razón (HTML > 500 KB, JS > 500 KB).
- Videos sin `preload="none"` o sin lazy loading.
- Imágenes sin compresión adecuada.
- Loops o renders innecesariamente costosos.

#### D. Accesibilidad (a11y)

- Imágenes `<img>` sin atributo `alt`.
- Botones sin etiqueta accesible.
- Inputs sin `<label>`.
- Contraste de colores manifiestamente bajo (spot check).
- Atributos ARIA mal aplicados.

#### E. Consistencia

- Branding: ¿quedan referencias a "Política de Adultos" en archivos específicos de DI (excepto donde compartimos backend)?
- Token: validar que el `AUTH_TOKEN` (`ADULTOS_ASC_2026` compartido durante el piloto) esté igual en frontend y backend.
- URL del backend: ¿hay URLs hardcodeadas inconsistentes entre archivos?
- Color: paleta azul institucional (`#1565C0`) — no debe haber morados (`#622599`) de Adultos.

#### F. Integridad esquema/contrato

- Cada JSON de curso (`borradores/*.json`) cumple `course-schema.json`.
- Todos los tipos de sección usados en los JSONs están soportados por el renderer en `build-course.js`.
- `cursos.json` (catálogo) tiene entries cuyos `file` y `folder` existen en el filesystem.
- Las rutas `src` de los videos en cada curso apuntan a archivos que existen.

#### G. Documentación

- `INDICE-PROYECTO.md` refleja el estado actual del proyecto.
- `BACKEND.md` tiene el Script ID, Deployment URL y Token actualizados.
- `Plan-de-Formacion-Linea-Desarrollo-Institucional.md` refleja los cursos publicados.
- `CREAR-CURSO.md` y `Recomendaciones-Cowork-Diseno-Cursos.md` están al día.
- Comentarios en código que explican *por qué* (no qué) están vigentes.

#### H. Build & deploy health

- Los HTML generados están sincronizados con los JSONs fuente.
- Los HTML desplegados en GitHub Pages coinciden con el último build local.
- El `cursos.json` en producción coincide con el local.
- **`verificar-backend.js` retorna 4/4 OK.**

---

### Stage 2 — Report (reporte categorizado)

Producir un reporte con hallazgos clasificados por severidad:

| Símbolo | Categoría | Significado | Acción por defecto |
|---|---|---|---|
| 🔴 | **Crítico** | Bug funcional, problema de seguridad real, o algo que rompe la experiencia | Aplicar fix automáticamente, reportar después |
| 🟡 | **Recomendado** | Violación de buenas prácticas, código muerto, inconsistencia, riesgo bajo | Proponer fix, esperar OK del usuario |
| 🟢 | **Opcional** | Mejora cosmética, micro-optimización, sugerencia de refactor | Solo mencionar; no aplicar salvo petición explícita |

Cada hallazgo debe incluir:

- Categoría (🔴 / 🟡 / 🟢)
- Archivo y línea (cuando aplica)
- Descripción breve del problema
- Descripción breve del fix propuesto

---

### Stage 3 — Apply (aplicación)

- 🔴 Críticos: aplicar siempre.
- 🟡 Recomendados: aplicar tras OK del usuario (puede ser global *"aplica todos los amarillos"* o selectivo).
- 🟢 Opcionales: solo si el usuario pide.

---

### Stage 4 — Verify (verificación)

Después de aplicar fixes:

- Validar JSONs (`python -c "import json; json.load(open(...))"`).
- Rebuild de los cursos afectados.
- Diff con producción (`curl -I` a las URLs públicas para confirmar que siguen vivas).
- Si hay cambios sustanciales, push a GitHub y esperar redeploy.
- **Correr `node 05-Generador-Cursos/verificar-backend.js`** — debe seguir retornando 4/4 OK.
- Reportar al usuario qué se aplicó y qué queda pendiente.

---

## Políticas

### Sobre el código generado

Los archivos en `02-Plataforma-Web/*.html` son **generados** desde `05-Generador-Cursos/borradores/*.json` mediante `build-course.js`. **Nunca editar los HTML directamente** — siempre el JSON fuente y rebuild. La auditoría debe verificar que el HTML generado coincida con la última versión del JSON.

### Sobre el Apps Script

El backend en `05-Generador-Cursos/google-apps-script.js` (referencia local) corresponde al script `1TTJ2VjN...gCrqe` desplegado vía `clasp push`. Cualquier cambio al backend debe pasar también por correr `verificar-backend.js` antes y después.

### Sobre el contenido educativo

La auditoría **no modifica el texto pedagógico** de los cursos sin permiso explícito. Solo arregla:

- Errores ortográficos manifiestos
- Referencias rotas (a cursos / lecciones que no existen)
- HTML mal formado dentro de los strings de texto
- Inconsistencias de numeración entre cursos cruzados
- Citas doctrinales que apuntan a documentos no vigentes (ej. una "PNDI 2010" cuando la vigente es 2017)

Cualquier sugerencia de re-redacción se reporta como 🟢 (opcional) y no se aplica sin permiso.

---

_Documento operativo de auditoría — Línea Desarrollo Institucional._
