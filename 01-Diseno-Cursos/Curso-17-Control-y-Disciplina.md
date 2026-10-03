# Diseño del Curso 17 — ⚖️ Control y disciplina: quién vigila y quién juzga

**Línea:** Desarrollo Institucional · **Nivel:** 3 — Especialización por cargo · **Posición:** tercer y último curso del nivel.

> **Estado:** v1.0 — 02-oct-2026, bajo la autonomía del dueño («plena autonomía», nivel por nivel). La fuente que se publica es `control-y-disciplina.json`.

## 0. Decisiones de fuente

1. **El foco del Plan (§5.1, fila 17) traía cuatro errores**, y el curso no los repite:
   - «Comisión Nacional de Vigilancia y Control (5 miembros)»: son **7**. Estatuto 2025, Art. 70; RN 2026, Art. 200.
   - «Revisor Fiscal y Suplente» como control **regional**: no está vigente (ADR-022). Lo ejerce el **Contador Regional** (Manual 2.2.7); el Revisor Fiscal solo se exige por ley si la Región tiene personería jurídica propia.
   - «Capítulo Regional de la Corte de Honor»: el **RN 2026, Art. 187**, lo organiza como **sala auxiliar**, con 3 adultos que elige la asamblea regional por 2 años. El RN está por encima del Reglamento de Regiones, del Manual y del Código (Art. 19) y deja sin efectos lo que lo contraríe, con un año para actualizar (Art. 245–246). El curso enseña el nombre nuevo y explica el anterior. Se remite al ADR-113.
   - «Comisión Ad-hoc presidida por el Vicepresidente, Art. 1.19.4»: el ancla es el **RG 8.2 y 8.5** (ADR-109).
2. **A quién juzga la Corte.** **Estatuto 2025, Art. 62:** investiga y sanciona las faltas de **toda persona mayor de edad**. El RG 8.7.2 (2013) dejaba al Jefe de Grupo las faltas «muy leves» de los adultos. El **Código de Honor 2022** no tiene esa categoría, y todas sus sanciones las impone la Corte (Art. 7), así que esa excepción no se enseña. Adenda del ADR-109, corregida también en el Curso 3. Los **Rovers mayores de edad**, por el Estatuto, van a la Corte.
3. **Código de Honor, Disciplinario y de Conducta** (Acuerdo CSN 510 y Res. 004-22, 2022): `DOCUMENTOS BASE/SCOUTS/BIBLIOTECA-CSN/`. Está en el corpus, aunque dos auditorías del 28-sep lo dieron por ausente. Fija las faltas y sus sanciones (Arts. 2–4 y 7), las garantías (Arts. 20–22 y 27), la suspensión provisional (Art. 7, par.), la conciliación (Arts. 13–17), la queja (Art. 23) y los límites del capítulo (Art. 31: no sanciona). **Choca con el Estatuto en el tamaño de la Corte:** dice cinco miembros que deciden por tres (Art. 33), y el Estatuto 2025 dice nueve, organizados en salas (Arts. 63 y 67; RN 180–186). Manda el Estatuto, y el curso lo dice.
4. **Control:** RN 195–196 (vigilancia y control: recomendar correctivos); Estatuto 69–76 (CNVC) y 77 (Revisoría Fiscal nacional, elegida por la Asamblea por un año); Manual 2.1.8 y 2.2.7 (Contadores: auditoría y alertas, nombrados por el Consejo de su nivel).
5. **Fuera del curso:** el procedimiento ante un posible abuso es del Curso 25 de PJ y de PT (regla 10 de DI): aquí se nombra y se remite con URL absoluta. La ética y los conflictos de intereses quedan para el Curso 20 del Nivel 4.

## 1. Ficha

`courseId` `control-y-disciplina` · Nivel 3 · order 17 · declara ~36 min · intro + 6 lecciones. Previos recomendados: Cursos 3 y 10; complementarios: Curso 25 de PJ y PT.

## 2. Hook

> **«Vigilar no es juzgar, y juzgar no le toca a cualquiera.»** Caso: el grupo de Gloria arma una «Corte de Honor del grupo» que suspende a un dirigente y le pide al Contador que «investigue y sancione» un faltante del bingo. Tres meses después nada de lo actuado se sostiene.

## 3. Lecciones

| # | Lección | Idea central | Fuentes |
|---|---|---|---|
| 1 | Bienvenida | Hook; remisión a Curso 3 y a PJ 25/PT | — |
| 2 | Vigilar no es juzgar | Control alerta y recomienda; disciplina investiga y sanciona | RN 196; Manual 2.1.8 |
| 3 | Quién controla en cada nivel | Nación: CNVC, Revisoría, CHN; Región: Contador, sala auxiliar; Grupo: Contador, Comisión Ad-hoc | Estatuto 63, 69, 70, 77; Manual 2.1.8, 2.2.7; RN 19, 187, 245–246; RR 1.20.4 |
| 4 | Quién juzga a quién | Adultos → CHN; niños y jóvenes, graves → Comisión Ad-hoc; leves → rama | Estatuto 62; RG 8.2, 8.5, 8.7.1; Código 31; RN 188 |
| 5 | Faltas, sanciones y garantías | Leves/graves/muy graves; descargos, defensor, recursos, suspensión provisional, conciliación | Código 2–4, 7, 13, 20–22, 27; Estatuto 63 |
| 6 | Cuando conoces una falta | No juzgar ni tapar; quién se queja y qué lleva la queja; reserva; colaborar; abuso → ruta de protección | Código 3 g, 4 b, 23, Provisiones 1.3; Estatuto 67, 68, 75 |
| 7 | La revisión | Seis preguntas y un compromiso | — |

## 4. Auditorías y correcciones (02-oct-2026)

**Doctrinal, primera vuelta: REQUIERE CORRECCIÓN — 1 crítico, 6 mayores, 11 menores.** El crítico fue una cita del RN atribuida al Art. 196 que es el **197**. Los mayores:
- «nadie más sanciona», que olvidaba la rama;
- un distractor que el RR 9.1 sostenía (Revisor Fiscal regional por un año);
- el enunciado «un grupo quiere quejarse»;
- **el motor de DI anunciaba un «Curso 20 — Órganos de control» en el Nivel 3** (`engine.linea.js`, sugerencias del Curso 5 y plan impreso);
- el glosario desfasado;
- el «Capítulo Regional» del Curso 3.

Todo aplicado; el motor se corrigió y se reconstruyó la línea.

**Pedagógica: REQUIERE MEJORA — 4 altos.** Regla ciega **12 de 12**. Hubo dos preguntas gemelas del Curso 3, la L7 daba por conocidos hechos que el caso no contaba, la L4 dejaba fuera la ruta de protección y la protagonista se equivocaba siempre. Se cambiaron:
- las 12 preguntas, por casos nuevos: un Rover con cargo regional, la composición de una Comisión, un plazo con viaje, el descuento de una suspensión, la mamá de un lobato;
- el hook, para que contenga lo que la L7 compara;
- el cierre de la L6, donde el Consejo acierta;
- las reflexiones de la L4 y la L5.

«Marta» pasó a «Gloria» (ya era personaje de otros tres cursos de DI).

**Re-auditoría doctrinal:** APTO CON CORRECCIONES. Se aplicaron:
- la notificación personal en la L5Q1;
- el Rover **con cargo** en la L4Q1, para que el Estatuto y el Código apunten al mismo lado;
- los ejemplos del RN 188, que vienen del Código, Arts. 17 y 31.

**Dos vueltas más de regla ciega, con evaluadores nuevos: 12 de 12 las dos.** Las tres opciones de cada pregunta comparten estructura y no hay dos defendibles, pero el curso tiene una tesis única («vigilar no es juzgar», «el adulto va a la Corte») y una vez descartado el que sanciona sin poder, se descarta en todas. Se aplicaron los arreglos baratos (Q5, Q8, Q9) y se publica con la fuga registrada: es estructural de los cursos por cargo (ADR-112, ADR-113).

**Verificación doctrinal final:** ver el ADR-113.
