# CLAUDE.md — Línea Desarrollo Institucional

> Ancla local, no la fuente completa de reglas. El documento rector del proyecto vive en el repo raíz **`DOCS-MAESTRAS-ASC`** (`CLAUDE.md`, `ECOSISTEMA.md`, `DECISIONES.md`, `GLOSARIO-ASC.md`) — léelo primero si esta sesión se abrió aislada en este repo y esos archivos no aparecieron solos.

## Qué es

Línea de formación digital para adultos voluntarios de la Asociación Scouts de Colombia sobre la gestión del grupo: los 8 ámbitos de la PNDI 2017, gobernanza, planeación, administración, finanzas, captación de fondos, comunicaciones, crecimiento y gestión del riesgo. Cursos cortos, certificables y autoservicio. Plan total: 21 cursos en 4 niveles (`Plan-de-Formacion-Linea-Desarrollo-Institucional.md`).

**En vivo:** https://maximoaluna-blip.github.io/INDUCCION-DESARROLLO-INSTITUCIONAL/

**Cursos publicados, por nivel: ver `../ESTADO.md`** (lo genera `python generar-estado.py` en la raíz; aquí no se escriben cifras). Niveles 1 y 2 completos (28-sep-2026, ADR-103). **Nivel 3 (Cursos 15–17) con autonomía del dueño desde el 28-sep-2026 hasta cerrarlo**; al cerrarlo, el Nivel 4 se vuelve a consultar. Panorama de cargos, Consejero y Jefe de Grupo son de Política de Adultos: DI remite, no duplica (Plan §5). Lo que enseñó cada curso está en su ADR y en `docs/BITACORA.md` de la raíz; los pendientes, en `INDICE-PROYECTO.md`.

## Comparte con las demás líneas

- **Motor** con fuente única (ADR-025): `05-Generador-Cursos/templates/engine.core.js` y `render.plan-builder.js` son **copias de `_MOTOR/`: no editarlas**. Lo propio de la línea va en `engine.linea.js`; `build-course.js` y `styles.css` son por línea (los vigila `verificar-motor.py`).
- **Backend** Apps Script + Sheet compartido, token `ADULTOS_ASC_2026` (`BACKEND.md`).
- **Publicación** según `CLAUDE.md` raíz §7-bis (tres repos: línea, portal y panel) y **tres auditorías** antes de publicar: doctrinal, pedagógica y funcional (ADR-019).

## Cómo se construye un curso aquí (lo que costó aprender)

1. **Comprobar que el foco del Plan tiene fuente antes de diseñar.** En el Nivel 2, **6 de 8 focos** no la tenían o la tenían a medias (el «modelo de 4 elementos», las «8 áreas / 5 pasos / 12 herramientas», el taller regional de finanzas, las «6 fuentes» y el «17 %», el «≥2 %» regional, el ciclo «identificación-análisis-tratamiento-monitoreo»). Se construye sobre la PNDI, el Reglamento Nacional, el Reglamento de Grupos, el Estatuto y el Manual de Cargos; lo demás queda fuera y se dice en el §0 del diseño.
2. **Una cifra o un ciclo sin fuente no vive en un solo curso**: al quitarlo, buscarlo también en los cursos publicados y en `engine.linea.js` (así salieron el 17 %, el ≥2 % y el ciclo de riesgo de los Cursos 4 y 6 y del motor).
3. **Jerarquía normativa** (RN Art. 19): el Reglamento Nacional 2026 manda sobre el Reglamento de Grupos 2013 (contratos por la Región, RN 231; colectas, RN 80; período fiscal, RN 228; unidades de negocio nacionales, RN 116). El **Acuerdo CSN 558/2023** suspendió lo del RG sobre **cargos de adultos**, no sobre **órganos**: para cargos manda el Manual. El RN da un año (Art. 246) para actualizar el RG: revisar hacia julio de 2027 lo que citan los cursos.
4. **El defecto más repetido de las re-auditorías: un distractor que otra norma vigente sostiene.** Antes de dar una opción por falsa, buscar si otro reglamento, ficha o política la defiende. Y las correcciones meten defectos nuevos: **siempre re-auditar** y cerrar con una verificación acotada de lo cambiado.
5. **Fugas de quiz que el build no ve:** la polaridad («elige la más prudente»), los **prefijos** compartidos por los dos distractores (`checkOvejaNegra` solo mira la primera palabra), las palabras que solo salen en correctas o solo en distractores, y el personaje que opina y siempre se equivoca. Medirlas en cada vuelta: cambian de forma al corregirlas.
6. **Activar un curso es editar `02-Plataforma-Web/cursos.json`:** el build conserva el `status` que ya tiene el catálogo. Si solo se cambia el JSON del curso, la suite local corre **sin él** y sale verde igual — mirar que el número de pruebas suba.
7. **La suite corre contra producción por defecto**: antes de publicar, `ASC_BASE_URL="http://localhost:8128/02-Plataforma-Web/" npx playwright test` (servidor: `preview_start` `desarrollo-institucional`); después, sin la variable. Avisar a las otras sesiones antes de correr una suite.
8. **El recuadro «Compromiso Personal» del certificado se declara por curso** (`commitmentBox`, ADR-092). Las reflexiones piden **roles, no nombres**.
9. **Sin voseo** en ningún texto visible (español neutro colombiano): se busca por su forma, no con una lista.
10. **La protección de niños y jóvenes en la actividad** es del Curso 25 de PJ y de Políticas Transversales: esta línea remite (URL absoluta) y no la enseña.

## Trampas de la línea

- ⚠️ **Antes de borrar «código muerto» de esta línea, mirar qué cursos lo declaran** (ADR-067): quitar un `case` del build se llevó siete que sí se usaban y dejó dos cursos publicados sin su ejercicio durante cinco días. Hoy el build falla ante un tipo sin `case` y `codigo.spec.js` prohíbe secciones vacías.
- ⚠️ **Un `policy-quote` es literal, oficial y verificable** (ADR-071/072). Si la frase es nuestra, va en `info-box`.
- ⚠️ **`verificar-certificado.html` vive en la raíz del repo** y su `SCRIPT_URL` es el backend de la plataforma, no el de Rover (ADR-070).
- ⚠️ **El diseño `.md` no es espejo del JSON**: lo que se publica es el JSON; el diseño guarda las decisiones de fuente y el registro de auditorías.
- ⚠️ **En `DECISIONES.md` los ADR 001–060 van ascendentes y del 061 en adelante descendentes**: un ADR nuevo va encima del mayor del bloque descendente.
- ⚠️ **Fiscal/Revisor Fiscal de Grupo no vigente** (ADR-022): lo reemplaza el Contador.

## Documentos de la línea

| Documento | Para qué |
|---|---|
| `INDICE-PROYECTO.md` | Cursos, arquitectura, workflow y **pendientes** |
| `CREAR-CURSO.md` | Manual operativo de creación de cursos de la línea |
| `Recomendaciones-Cowork-Diseno-Cursos.md` | Guía de diseño pedagógico |
| `01-Diseno-Cursos/` | Un diseño por curso, con §0 (fuentes) y §4 (auditorías) |
| `BACKEND.md` | Backend Apps Script |
| `PRUEBAS-E2E/README.md` | Suite funcional (Playwright + axe), corre en CI |
| `Plan-de-Formacion-Linea-Desarrollo-Institucional.md` | Plan de la línea (21 cursos) |
