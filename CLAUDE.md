# CLAUDE.md — Línea Desarrollo Institucional

> Ancla local, no la fuente completa de reglas. El documento rector del proyecto vive en el repo raíz **`DOCS-MAESTRAS-ASC`** (`CLAUDE.md`, `ECOSISTEMA.md`, `DECISIONES.md`, `GLOSARIO-ASC.md`) — léelo primero si esta sesión se abrió aislada en este repo y esos archivos no aparecieron solos.

## Qué es

Una de las 3 líneas activas de formación digital para adultos voluntarios de la Asociación Scouts de Colombia (junto a Política de Adultos y Programa de Jóvenes). Cursos cortos, certificables y autoservicio sobre gobernanza, planeación, finanzas sanas, salud institucional y los 8 ámbitos de gestión de la PNDI 2017.

**En vivo:** https://maximoaluna-blip.github.io/INDUCCION-DESARROLLO-INSTITUCIONAL/

## Comparte con Política de Adultos y Programa de Jóvenes

- Mismo motor (`engine.js` / `build-course.js` en `05-Generador-Cursos/`), copiado y adaptado por línea.
- Mismo backend de Google Apps Script + Sheet, mismo token (`ADULTOS_ASC_2026`) durante el piloto compartido.
- Mismo pipeline de publicación — `CLAUDE.md` raíz §7-bis — y el mismo modelo de 3 auditorías antes de publicar un curso: doctrinal, pedagógica y funcional.
- Sin cursos habilitantes ni piloto humano obligatorio (ADR-019, `DECISIONES.md` raíz) — las 3 auditorías son la compuerta de calidad.

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

> ✅ **Línea pública y activa.** Reactivada el 02-ago-2026: los 6 cursos están en `status: "active"` en `cursos.json` y la entrada de esta línea en `PORTAL-ADULTOS-ASC/lineas.json` volvió a `"active"`. Con esto queda **cerrado el ADR-021** (la pausa preventiva mientras se verificaba la duda doctrinal del Fiscal de Grupo, resuelta en ADR-022). La pausa no alteró contenido.

**Nivel 1 "Fundamentación" completo: 6 cursos construidos** (Bienvenida, PNDI Marco y Principios, Niveles y Estructura del Movimiento — ahora 7 lecciones, dividida la que cubría Regional+Grupo —, Los 8 Ámbitos de Gestión, Buenas Prácticas en Tu Grupo, Mi Aporte al DI). **Las 3 auditorías completas desde el 02-ago-2026** (doctrinal, pedagógica y funcional — ver `ESTADO-AUDITORIA.md` raíz), mismo estándar que Programa de Jóvenes. Plan total 24 cursos.

**Doctrina corregida el mismo día (ADR-022):** el Fiscal/Revisor Fiscal de Grupo y Región **no está vigente/operativo** — lo reemplaza el **Contador** (Manual de Cargos y Perfiles, PNAM), confirmado por consulta directa con la Jefatura Scout Nacional. Excepción legal: una región con personería jurídica propia sí debe tener Revisor Fiscal por ley colombiana. Ver `CLAUDE.md` raíz §5.1 y `GLOSARIO-ASC.md` §A para la regla general del proyecto.

Todas las mejoras estructurales que habían quedado pendientes tras la auditoría (dividir la lección sobrecargada del Curso 3, gobernanza de 5 elementos + reordenamiento en los 8 ámbitos del Curso 4, recorte de la Lección 3 del Curso 6, ajuste de `CREAR-CURSO.md`) ya se ejecutaron. Queda un solo punto menor cerrado por decisión del dueño del proyecto sin acción pendiente: una discrepancia "Canciller vs. Fiscal" en una meta-tipo del Curso 6 se volvió irrelevante al recortarse ese campo de la Lección 3 (ver `ESTADO-AUDITORIA.md` raíz).
