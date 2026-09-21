# CLAUDE.md — Línea Desarrollo Institucional

> Ancla local, no la fuente completa de reglas. El documento rector del proyecto vive en el repo raíz **`DOCS-MAESTRAS-ASC`** (`CLAUDE.md`, `ECOSISTEMA.md`, `DECISIONES.md`, `GLOSARIO-ASC.md`) — léelo primero si esta sesión se abrió aislada en este repo y esos archivos no aparecieron solos.

## Qué es

Una de las 3 líneas activas de formación digital para adultos voluntarios de la Asociación Scouts de Colombia (junto a Política de Adultos y Programa de Jóvenes). Cursos cortos, certificables y autoservicio sobre gobernanza, planeación, finanzas sanas, salud institucional y los 8 ámbitos de gestión de la PNDI 2017.

**En vivo:** https://maximoaluna-blip.github.io/INDUCCION-DESARROLLO-INSTITUCIONAL/

## Comparte con Política de Adultos y Programa de Jóvenes

- Mismo motor, pero desde el 03-ago-2026 con **fuente única** (ADR-025): el núcleo `engine.core.js` vive en `_MOTOR/` del repo raíz `DOCS-MAESTRAS-ASC` y se propaga con `sincronizar-motor.py`. Lo que aquí hay en `05-Generador-Cursos/templates/engine.core.js` es una **copia: no editarla**. Lo propio de esta línea va en `engine.linea.js`. `build-course.js` y `styles.css` siguen copiados por línea (los vigila `verificar-motor.py`), pero el `plan-builder` ya no está en ellos: lo renderiza `templates/render.plan-builder.js`, copia sincronizada de `_MOTOR/`, **sin vocabulario** — los textos del componente van en `labels` dentro del JSON del curso (ADR-034 Fase 1).
- Mismo backend de Google Apps Script + Sheet, mismo token (`ADULTOS_ASC_2026`) durante el piloto compartido.
- Mismo pipeline de publicación — `CLAUDE.md` raíz §7-bis — y el mismo modelo de 3 auditorías antes de publicar un curso: doctrinal, pedagógica y funcional.
- Sin cursos habilitantes ni piloto humano obligatorio (ADR-019, `DECISIONES.md` raíz) — las 3 auditorías son la compuerta de calidad.

⚠️ **Esta línea perdió ocho secciones de dos cursos publicados y nadie lo vio en cinco días (14→19-sep-2026, ADR-067).**
El commit `6ad00d6` iba a quitar **un** `case` muerto del `build-course.js` —`self-assessment`, que ningún curso de aquí
usaba— y **se llevó siete vecinos que sí se usaban**. `mi-aporte-al-desarrollo-institucional` se quedó sin su catálogo, su
brújula, su planificador de metas, su acción sugerida, sus cursos sugeridos y su PDF —**su ejercicio entero**— y
`buenas-practicas-en-tu-grupo` sin el catálogo que construye y el que relee. No hubo ni un error: el `default` del `switch`
imprimía un `<p>` vacío, y la suite cerró ese día en 66/66. **El motor de línea nunca perdió sus renderizadores**
(`renderCatalogDisplays`, `renderBrujulaDisplays`, `renderGoalPlanners`, `generatePlanPDF`…): faltaba solo el hueco que el
build emite. Restaurado desde la historia y comprobado **byte a byte** contra lo publicado antes. **Hoy el build falla** ante
un tipo sin `case`, `verificar-motor.py` compara el esquema contra el build y `codigo.spec.js` prohíbe secciones vacías.
*Antes de borrar «código muerto» de esta línea: mirar qué cursos lo declaran, no qué nombre tiene.*

## Específico de esta línea

| Documento | Para qué |
|---|---|
| `CREAR-CURSO.md` | Manual operativo de creación de cursos de esta línea (incluye paso de auditoría funcional) |
| `Recomendaciones-Cowork-Diseno-Cursos.md` | Guía de diseño pedagógico dirigida a Cowork |
| `INDICE-PROYECTO.md` | Estado, URLs, dependencias técnicas |
| `BACKEND.md` | Backend Apps Script propio de esta línea |
| `AUDITORIA.md` | Historial de auditoría doctrinal |
| `PRUEBAS-E2E/README.md` | Auditoría funcional — corre en cada push/PR |
| `Plan-de-Formacion-Linea-Desarrollo-Institucional.md` | Plan completo de la línea (24 cursos) |

## Estado (ver `INDICE-PROYECTO.md` para el detalle vivo)

> **La página que verifica los certificados vive en la RAÍZ del repo** (`verificar-certificado.html`) y se enlaza desde el pie del `index.html` — **ADR-070, 20-sep-2026**. El certificado le dice al adulto *«verifica este certificado ingresando el código en la plataforma web»*, así que la página es la otra mitad de esa promesa. ⚠️ Hasta ese día **apuntaba al backend de Rover** (1 certificado) en vez de al de la plataforma (21), así que **ningún certificado real se podía validar**; y **nadie la enlazaba desde ningún sitio**. Al tocar esa página, comprobar las dos cosas: el `SCRIPT_URL` y que siga enlazada.

> ⚠️ **20-sep-2026 — la línea se trazó por primera vez, y trazar destapó tres correcciones** (ADR-071 y ADR-072). `TRAZABILIDAD.csv` pasa de **9 filas a 28** y de **un curso cubierto a los seis**. Lo que apareció al ir afirmación por afirmación con la fuente al lado: **(1)** `buenas-practicas-en-tu-grupo` le atribuía a un **Grupo** un «revisor fiscal» —cargo no vigente desde el **ADR-022**— en un ejemplo **y en el enunciado de un quiz**; **(2)** el `policy-quote` de `los-8-ambitos-de-gestion` presentaba como cita una frase que la PNDI **no trae** (los ocho nombres eran correctos; la frase, nuestra); **(3)** dos cursos definían el Consejo Scout Nacional citando **scout.org.co** teniendo el **Estatuto Nacional 2025** en el corpus, que lo dice en su **Art. 47**. Los tres corregidos, `contentVersion` a 2026-09-20, recompilados y **suite en verde contra el build local** (93 passed). ⏳ **Queda uno:** la *Constitución de la OMMS*, fuente de la cita literal que abre `niveles-y-estructura-movimiento`, **no está en el corpus ni en la biblioteca oficial** — la fila queda `PENDIENTE` y **el curso no se tocó**.
> **La regla que dejan:** *un `policy-quote` es un contrato de tres cláusulas —literal, oficial y verificable—.* Si la frase la escribimos nosotros, es un `info-box`; si la fuente es una página web y el documento existe, se cita el documento.

> ✅ **Línea pública y activa.** Reactivada el 02-ago-2026: los 6 cursos están en `status: "active"` en `cursos.json` y la entrada de esta línea en `PORTAL-ADULTOS-ASC/lineas.json` volvió a `"active"`. Con esto queda **cerrado el ADR-021** (la pausa preventiva mientras se verificaba la duda doctrinal del Fiscal de Grupo, resuelta en ADR-022). La pausa no alteró contenido.

**Nivel 1 "Fundamentación" completo: 6 cursos construidos** (Bienvenida, PNDI Marco y Principios, Niveles y Estructura del Movimiento — ahora 7 lecciones, dividida la que cubría Regional+Grupo —, Los 8 Ámbitos de Gestión, Buenas Prácticas en Tu Grupo, Mi Aporte al DI). **Las 3 auditorías completas desde el 02-ago-2026** (doctrinal, pedagógica y funcional — ver `ESTADO-AUDITORIA.md` raíz), mismo estándar que Programa de Jóvenes. Plan total 24 cursos.
> **La landing agrupa por nivel desde el 17-sep-2026 (ADR-058).** Cada entrada de `cursos.json` lleva **`level`, `levelName` y `order`**, y el `index.html` los pinta en secciones plegables. **Esta línea ya declaraba los tres campos desde su construcción; lo que faltaba era que la landing los usara** — el dato estaba bien y la página lo ignoraba, que es el reverso del modo de fallo habitual. ⚠️ Son **metadatos de catálogo** — no entran en el HTML del curso, así que añadirlos **no cambió ninguna página publicada**. Y nació `PRUEBAS-E2E/tests/landing.spec.js`, porque **ninguna prueba tocaba esta página**: las suites se parametrizan por el catálogo y lo que no es un curso quedaba fuera por construcción.


**Doctrina corregida el mismo día (ADR-022):** el Fiscal/Revisor Fiscal de Grupo y Región **no está vigente/operativo** — lo reemplaza el **Contador** (Manual de Cargos y Perfiles, PNAM), confirmado por consulta directa con la Jefatura Scout Nacional. Excepción legal: una región con personería jurídica propia sí debe tener Revisor Fiscal por ley colombiana. Ver `CLAUDE.md` raíz §5.1 y `GLOSARIO-ASC.md` §A para la regla general del proyecto.

Todas las mejoras estructurales que habían quedado pendientes tras la auditoría (dividir la lección sobrecargada del Curso 3, gobernanza de 5 elementos + reordenamiento en los 8 ámbitos del Curso 4, recorte de la Lección 3 del Curso 6, ajuste de `CREAR-CURSO.md`) ya se ejecutaron. Queda un solo punto menor cerrado por decisión del dueño del proyecto sin acción pendiente: una discrepancia "Canciller vs. Fiscal" en una meta-tipo del Curso 6 se volvió irrelevante al recortarse ese campo de la Lección 3 (ver `ESTADO-AUDITORIA.md` raíz).
