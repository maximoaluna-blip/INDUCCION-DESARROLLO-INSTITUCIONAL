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
| `CREAR-CURSO.md` | Manual operativo de creación de cursos de esta línea |
| `Recomendaciones-Cowork-Diseno-Cursos.md` | Guía de diseño pedagógico dirigida a Cowork |
| `INDICE-PROYECTO.md` | Estado, URLs, dependencias técnicas |
| `BACKEND.md` | Backend Apps Script propio de esta línea |
| `AUDITORIA.md` | Historial de auditoría doctrinal |
| `Plan-de-Formacion-Linea-Desarrollo-Institucional.md` | Plan completo de la línea (24 cursos) |

## Brecha conocida (ver informe de estructura, 12-jul-2026)

Esta línea **no tiene suite `PRUEBAS-E2E/`** propia — a diferencia de Política de Adultos y Programa de Jóvenes. El Nivel 1 ya está completo (6/6), así que portar el patrón desde `INDUCCION-PROGRAMA-JOVENES/PRUEBAS-E2E/` (adaptación mecánica, ya probada dos veces) es puro beneficio ahora: cubriría los 6 cursos ya publicados, no solo los que falten.

## Estado (ver `INDICE-PROYECTO.md` para el detalle vivo)

**Nivel 1 "Fundamentación" completo: 6 cursos activos** (Bienvenida, PNDI Marco y Principios, Niveles y Estructura del Movimiento, Los 8 Ámbitos de Gestión, Buenas Prácticas en Tu Grupo, Mi Aporte al DI). Auditoría doctrinal solo parcial (🟡 en `ESTADO-AUDITORIA.md` raíz, sin pasada formal completa por curso). Plan total 24 cursos.
