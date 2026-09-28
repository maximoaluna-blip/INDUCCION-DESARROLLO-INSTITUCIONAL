# Diseño del Curso 10 — 💰 Finanzas Sanas: Presupuesto y Tesorería

**Línea:** Desarrollo Institucional · **Nivel:** 2 · **Posición:** tercer curso de la Prioridad 1 (Hito D: Cursos 7, 8 y 10). Se construye antes que el 9 porque el Plan lo pone en la Prioridad 1.

> **Estado:** v1.0 — 27-sep-2026, bajo la autonomía delegada por el dueño. La fuente que se publica es `finanzas-sanas-presupuesto-tesoreria.json`.

## 0. Decisiones de fuente

1. **El foco del Plan de la línea es un calco del taller regional.** El Plan pide *«8 premisas financieras, 3 roles, cadena de 6 eslabones, 6 pasos para el presupuesto, soportes mínimos, 3 reportes mensuales obligatorios, 14 principios éticos»*: es, punto por punto, el taller **«Planeación y Finanzas» de Flor de Lis II (ValleScout 2026)**, material **regional**. Ninguna de esas cifras tiene fuente nacional; los «14 principios éticos» se buscaron en el texto de **todos** los PDF del corpus y no existen como lista (las palabras aparecen sueltas en la definición de conflicto de interés del Reglamento Nacional, Art. 68). **Tercer foco seguido del Plan sin fuente** (ADR-085, ADR-088). **Se construye sobre las fuentes nacionales.**
2. **Lo que sí tiene fuente, y alcanza para el curso:** el **Capítulo 10 del Reglamento de Grupos** («Capital social y manejo financiero», Arts. 10.1–10.25: reglas de órganos, no de cargos); el **Reglamento Nacional 2026**, Arts. 228 (período fiscal), 230 (normas contables) y 231 (uso de la razón social y contratos); y las fichas **2.1.7 Tesorero** y **2.1.8 Contador de Grupo** del Manual de Cargos (vigente). El trío «Consejo decide · Tesorero opera · Contador vigila» del taller **sí** tiene fuente: esas fichas y el 10.20.
3. **Tres puntos donde manda el Reglamento Nacional (nivel 2) sobre el de Grupos (nivel 3):** el **período fiscal** —estados financieros por año calendario en los tres niveles; abril–marzo solo para la afiliación (RN Art. 228)—, por lo que **no se enseña** el período de presupuesto abril–marzo del 10.19; los **contratos con terceros** —solo a través del representante legal de la región (RN Art. 231-d), no por la personería delegada del 10.13—; y las **normas contables** (RN Art. 230).
4. **Tesorero y Consejo:** el Reglamento de Grupos (5.7) hace del Tesorero un cargo del Consejo; la ficha 2.1.7 del Manual le pone como requisito *«No formar parte de la jefatura de grupo, ni el consejo de grupo»*. Por el Acuerdo 558 manda el Manual en materia de cargos. **El curso no afirma que el Tesorero sea miembro del Consejo**: dice que lo nombra el Consejo y le responde de su gestión.
5. **El Fiscal del 10.18** (refrenda el balance) no opera (ADR-022): el curso lo dice y remite al Contador.

## 1. Ficha

`courseId` `finanzas-sanas-presupuesto-tesoreria` · Nivel 2 · order 10 · duración **medida** ~31 min (declarada ~32) · intro + 5 de contenido + cierre. Previos recomendados: Cursos 7 y 8.

## 2. Hook

> **«La plata del grupo no es de nadie: por eso todos tienen que poder verla.»** (Anclado en 10.2: patrimonio indivisible.)

Caso: la tesorera que recibía las cuotas en su cuenta personal; se enferma y nadie sabe cuánta plata hay. Se resuelve en la L7.

## 3. Lecciones

| # | Lección | Idea central | Fuentes |
|---|---|---|---|
| 1 | Bienvenida | El hook | — |
| 2 | De quién es la plata | Patrimonio indivisible, solo para escultismo, sin reparto; cuotas = gasto | RG 10.1, 10.2, 10.8 |
| 3 | Tres roles | Consejo decide y responde; Tesorero maneja y rinde cuentas; Contador vigila y alerta; cuentas a nombre del grupo | RG 10.20; Manual 2.1.7, 2.1.8 |
| 4 | Cuotas, presupuesto y año fiscal | Consejo fija las ordinarias, Asamblea las extraordinarias; informe anual; el Fiscal ya no opera; año fiscal | RG 10.4–10.6, 10.18; RN 228 |
| 5 | Cómo entra la plata | Fuentes y actividades; permiso previo; sin colectas públicas; donaciones con criterio; contratos por la Región | RG 10.11, 10.12, 10.15, 10.16, 10.10; RN 231 |
| 6 | Rendir cuentas | 30 días con soportes; sanciones; intervención y congelación; prohibición de garante; normas contables | RG 10.21–10.25; RN 230 |
| 7 | Chequeo de salud financiera | Seis preguntas y un compromiso | — |

## 4. Cross-course

← Curso 8 (el presupuesto como tercer eslabón) · ← Curso 7 (decidir/ejecutar/verificar; el Fiscal no vigente) · → Curso 9 (bienes y obligaciones legales) · → Curso 11 (captación de fondos).

## 5. Auditorías y correcciones (27-sep-2026)

**Doctrinal: REQUIERE CORRECCIÓN — 1 crítico.** La tarjeta de colectas repetía la excepción del RG 10.12 (colaborar en colectas de hospitales, Cruz Roja o por calamidades). El **Reglamento Nacional, Art. 80** (p. 22) la cierra: nadie de la Asociación pide limosna, hace retenes ni prácticas similares en la vía pública **«independientemente de la causa»**. Es un **cuarto punto** donde manda el Reglamento Nacional, que el §0.3 no había visto. Además: el trabajo de «paga un servicio» era añadido nuestro (10.8 dice «gasto y no aporte»); la simplificación del 10.25 insinuaba que el Consejo podía autorizar ser garante; la cita del 10.2 se cortaba justo antes de la frase de los excedentes. **Matiz al §0.3:** el RN 231-d aparece **cortado en el PDF oficial** («…de la cual forme parte el grupo, directamente»); el literal c) paralelo sigue «o a través de la figura de la delegación o mandato», así que la norma **no excluye** la delegación. El curso solo dice «a través del representante legal de su región», que es correcto. **No verificable, para consulta al CSN:** si el RN 225 exige autorización nacional para los eventos de recaudo de los grupos o solo la faculta.
**Pedagógica: APTO CON MEJORAS — 4 altos.** Cinco preguntas se acertaban **por polaridad** (la correcta era la única «no», y el build no lo ve porque todas empiezan por «Que»); el cierre se contestaba con el párrafo de encima; el **presupuesto que el Curso 8 promete era un solo párrafo** — se añadió cómo se sigue su ejecución durante el año (Asamblea / cada mes / cierre); y la L4 era una lista para memorizar. Todo reescrito.
