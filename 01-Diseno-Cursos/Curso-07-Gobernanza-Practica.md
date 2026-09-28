# Diseño del Curso 7 — 🏛️ Gobernanza Práctica

**Línea:** Desarrollo Institucional · **Nivel:** 2 (Profundización por ámbito de gestión) · **Posición:** primer curso del Nivel 2 (Prioridad 1, Hito D del Plan).

> El Curso 3 le dio al adulto **el mapa** (qué órganos existen en cada nivel) y el Curso 4 le nombró **los 5 sub-ámbitos** de la Gobernanza. Este curso no repite ninguno de los dos: enseña **cómo se decide de verdad** en un grupo — quién decide, quién ejecuta, quién verifica; cómo funcionan la Asamblea y el Consejo en la práctica; de dónde salen las reglas y cuáles están vigentes; y con qué principios se mide si la gobernanza del grupo es sana.

> **Estado del diseño:** BORRADOR v0.2 — 27-sep-2026 (v0.2: revisión completa pedida por el dueño — ver §9), pendiente de aprobación del dueño antes de codificar (paso 2 de `CREAR-CURSO.md`).

---

## 0. Decisiones de fuente tomadas al diseñar (leer antes de aprobar)

1. **El «modelo de gobernanza de 4 elementos (sentido, estructura, legitimidad, funcionamiento)»** que el Plan de Formación (§4.1 y glosario §9) pone como foco de este curso **no aparece en ninguna fuente escrita del corpus**: ni en la PNDI 2017, ni en el Estatuto 2025, ni en los reglamentos, ni en el texto de las presentaciones de Flor de Lis II (la de Gobernanza es de imágenes sin texto extraíble). Aplicando la regla del ADR-072 —*lo que no se puede trazar a un documento no se enseña como doctrina*— **el curso no lo usa**. En su lugar se apoya en dos fuentes trazables: la **definición de la PNDI §8.2.1** (decidir · implementar · verificar) y los **8 Principios de Buena Gobernanza del Estatuto Nacional 2025, Art. 9**, que ningún curso de la plataforma usa todavía.
2. **Reglamento Nacional de Grupos Scouts (2013) y Acuerdo C.S.N. 558/2023.** El Acuerdo suspendió lo que el Reglamento dice sobre **cargos de adultos** (requisitos, atribuciones, funciones, calidades, período, selección…) — ADR-022. Por eso el curso cita del Reglamento **solo lo que regula a los órganos y sus reuniones** (estructura funcional 1.19, facultades de la Asamblea 4.3, clases de reunión 4.4, actas 4.25–4.26, reuniones y quórum del Consejo 5.5, facultades del Consejo 5.6) y **no enseña funciones de cargos** (Presidente, Secretario, Tesorero): eso es del Nivel 3 y de la PNAM. ⚠️ **Punto para la auditoría doctrinal:** la **integración del Consejo** (Art. 5.1 — cuatro representantes legales, un Rover elegido por sus pares, el Jefe de Grupo con voz sin voto) roza la frontera «selección/período de cargos». El diseño la usa **solo en la L4 y solo para el Rover** como ejemplo de participación juvenil; si el auditor la considera suspendida, se cae ese ejemplo y la L4 no pierde su idea central.
3. **El órgano de control del Grupo** se nombra según el ADR-022: **Contador de Grupo**, no Fiscal. Donde el Reglamento dice «Fiscal» (5.5, 4.25.2) el curso no lo cita. La L5 usa precisamente este caso como ejemplo de *norma escrita ≠ norma vigente*.
4. **No se toca la relación Jefe de Grupo ↔ Jefes de Rama** (Curso 16 de PJ, en construcción en otra sesión). Del Jefe de Grupo este curso solo dice que **ejecuta el Plan de Grupo** (Estatuto Art. 18) y **rinde cuentas** ante el Consejo, el Jefe Scout Regional y la Asamblea (Art. 19). ⚠️ **No dice si es o no miembro del Consejo**, a propósito: el Estatuto (Art. 19, «integrará el Consejo») y el Reglamento (5.1.4, «por derecho propio, con voz pero sin voto») lo sitúan dentro, y el **Manual de Cargos, ficha 2.1.10** (p. 76 del PDF, 68 impresa) le pone como requisito *«No formar parte del Consejo Scout de Grupo»*. Es una discrepancia entre fuentes que este curso no necesita arbitrar — **queda anotada para la auditoría doctrinal y para el Curso 16 de DI** (Jefe de Grupo). Aviso de la sesión de PJ, 27-sep-2026.

---

## 1. Ficha del curso

| Campo | Valor |
|---|---|
| `courseId` | `gobernanza-practica` |
| Título | Gobernanza Práctica |
| Subtítulo | Curso 7 de la Línea Desarrollo Institucional · Nivel 2 — Profundización por ámbito de gestión |
| Icono | 🏛️ |
| Duración | ~37 min |
| Lecciones | intro + 5 de contenido + cierre + certificado |
| `level` / `levelName` / `order` | `2` / «Profundización por ámbito de gestión» / `7` |
| Audiencia primaria | Miembros de consejos de grupo y regionales, jefes de grupo, delegados a asambleas; cualquier adulto que participe en decisiones del grupo. |
| Cursos previos recomendados | Curso 3 (Niveles y Estructura) y Curso 4 (Los 8 Ámbitos). Recomendación, no bloqueo (ADR-019). |
| Logro final | «Gobernanza en práctica» |

---

## 2. Objetivos del curso

Al completarlo, el adulto:

1. **Separa** en cualquier decisión del grupo los tres momentos que la PNDI asigna a la Gobernanza: **quién decide, quién ejecuta y quién verifica**.
2. **Ubica** una decisión concreta en el órgano que le corresponde —Asamblea, Consejo o Jefatura— según el Estatuto 2025 (Art. 18–19) y el Reglamento de Grupos.
3. **Prepara** una Asamblea de Grupo y una reunión de Consejo que cumplan lo mínimo: quién vota, qué se aprueba, quórum y un acta que deje trazabilidad.
4. **Distingue** la jerarquía de las normas (Estatuto → reglamentos del CSN → normas de funcionamiento del Grupo) y reconoce que una norma escrita puede no estar vigente.
5. **Evalúa** la gobernanza de su propio grupo con los **8 Principios de Buena Gobernanza** del Estatuto (Art. 9) y se compromete con una mejora concreta.

---

## 3. Hook pedagógico

> **«Una decisión que nadie tomó, nadie la puede cumplir — y nadie la puede corregir.»**

Se enuncia en la Lección 1 con el caso del chat, reaparece en la L2 (quién decidió), en la L3/L4 (el acta como prueba de que *alguien* decidió) y se cierra en la L7.

---

## 4. Estructura de lecciones

### 4.1 Mapa general

| # | Lección | Duración | Idea central | Logro |
|---|---|---|---|---|
| 1 | 👋 Bienvenida — «¿Quién decidió eso?» | 3 min | Gobernanza no es tener órganos: es que cada decisión tenga dueño, ejecutor y verificador. | Empecé la práctica |
| 2 | 🔀 Decidir, ejecutar, verificar | 6 min | La Asamblea dirige, el Consejo administra, la Jefatura ejecuta y rinde cuentas. Mezclarlos es el error más común. | Sé quién decide qué |
| 3 | 🗳️ La Asamblea de Grupo | 6 min | La máxima autoridad del grupo se reúne al menos una vez al año, y lo que no queda en su acta no existe. | Preparo una Asamblea |
| 4 | 🪑 El Consejo entre asambleas | 6 min | El Consejo gobierna por mandato de la Asamblea: se reúne cada mes, decide con quórum y deja actas. | Sé cómo sesiona el Consejo |
| 5 | 📜 Las reglas del juego | 6 min | Las normas tienen jerarquía, las dicta quien tiene la facultad, y una norma escrita puede no estar vigente. | Leo las reglas del juego |
| 6 | ⚖️ Los 8 principios de buena gobernanza | 6 min | El Estatuto 2025 fija 8 principios; con ellos se mide si un grupo decide bien, no solo si decide. | Mido la gobernanza |
| 7 | 🎯 Tu compromiso de gobernanza | 4 min | Una mejora concreta, con dueño y fecha, en el principio más débil de tu grupo. | Gobernanza en práctica |

**Total estimado: ~37 min.** (El Plan decía ~35; la banda por lección manda —`MANUAL` §A.6.5—, no el total.)

---

### 4.2 Lección 1 — 👋 Bienvenida: «¿Quién decidió eso?» (3 min, `isIntro: true`)

**Idea central:** Gobernanza no es tener órganos: es que cada decisión tenga dueño, ejecutor y verificador.

**Secciones:**

1. **`info-box`** — Tiempo (~37 min) y promesa: _«Al final vas a saber a qué órgano le toca cada decisión, cómo se prepara una Asamblea y una reunión de Consejo que valgan, de dónde salen las reglas del grupo y con qué 8 principios medir si tu grupo decide bien.»_
2. **`paragraph`** — Caso de apertura: _«Jueves, 10 p. m. En el chat de familias de la Tropa alguien escribe: "Entonces el campamento de junio se cambia a la finca de mi cuñado, que sale más barato". Tres personas responden con un pulgar. En junio, la mitad de las familias no sabe del cambio, el Jefe de Tropa se entera por un papá y el tesorero no tiene cómo justificar el anticipo. Nadie hizo nada malo a propósito. **Simplemente, nadie decidió** — y por eso nadie pudo cumplirlo ni corregirlo.»_
3. **`paragraph`** — Puente: _«En el Curso 3 dibujaste el mapa de los órganos del grupo. En el Curso 4 viste que la Gobernanza es uno de los 8 ámbitos. Este curso responde la pregunta práctica: **cuando hay que decidir algo, ¿cómo se hace bien?**»_
4. **`heading` (3)** — _«Lo que vas a practicar»_
5. **`list`** — las ideas centrales de las lecciones 2–7.
6. **`mission-box`** — _«Ten a mano, si puedes, el último acta del consejo de tu grupo (o recuerda la última reunión). La vas a usar como caso real a lo largo del curso.»_

**Reflexión / Quiz:** ninguno.

---

### 4.3 Lección 2 — 🔀 Decidir, ejecutar, verificar (6 min)

**Idea central:** La Asamblea dirige, el Consejo administra, la Jefatura ejecuta y rinde cuentas. Mezclarlos es el error más común.

**Secciones:**

1. **`info-box`** — Idea central.
2. **`paragraph`** — _«La Política Nacional de Desarrollo Institucional define la Gobernanza con tres verbos: se ocupa de **la toma de decisiones, su implementación y la verificación de su cumplimiento**. Tres momentos distintos. Un grupo sano sabe, para cada decisión, quién hace cada uno.»_
3. **`policy-quote`** — `label`: «📋 Ver la definición oficial» · `text` (literal): _«Se ocupa de la toma de decisiones, su implementación y la verificación del cumplimiento de las mismas dentro de la institución; lo anterior implica desarrollar una estructura de toma de decisiones definida con claridad, que sea del conocimiento de todos y cada uno de los miembros de la organización, que sea abierta, descentralizada, transparente y eficaz […]»_ · `source`: «Política Nacional de Desarrollo Institucional 2017, §8.2.1 Gobernanza, p. 9».
4. **`method-grid`** — 3 tarjetas, el patrón que el Estatuto repite en Grupo, Región y Nación:
    - 🗳️ **Dirige — Asamblea Scout de Grupo** → _«Máxima autoridad. Elige autoridades y delegados, recibe los informes de gestión y financieros.»_
    - 🪑 **Administra — Consejo de Grupo** → _«Responsable de la administración del grupo.»_
    - 🧭 **Ejecuta — Jefe de Grupo y su Jefatura** → _«Ejecuta el Plan de Grupo y rinde cuentas ante el Consejo, el Jefe Scout Regional y la Asamblea.»_
5. **`policy-quote`** — `label`: «📋 Ver lo que dice el Estatuto» · `text` (literal, Art. 18): _«El Grupo Scout es la base de nuestra organización. Su administración es responsabilidad del Consejo de Grupo. A nivel operativo, el jefe de Grupo es el encargado de la ejecución del Plan de Grupo. Su máxima autoridad será la Asamblea Scout de Grupo […]»_ · `source`: «Estatuto Nacional de la Asociación Scouts de Colombia 2025, Art. 18, p. 16».
6. **`info-box`** — _«El mismo patrón se repite arriba: en la **Región** (Asamblea Regional → Consejo Regional → Jefe Scout Regional, Art. 20–23) y en la **Nación** (Asamblea Scout Nacional, «máxima instancia de gobierno» → Consejo Scout Nacional → Jefe Scout Nacional, Art. 28–30). Si entiendes el grupo, entiendes los tres niveles.»_
7. **`heading` (3)** — _«Los dos cruces más comunes»_
8. **`list`** — _«**El Consejo que conduce el programa:** decide qué actividad hace la Manada el sábado. Eso es ejecución — le toca a la Jefatura, el órgano técnico de conducción del Programa de Jóvenes (Reglamento 1.19.3), dentro del Plan de Grupo.»_ · _«**La Jefatura que administra:** compromete un gasto que el Consejo no aprobó. Eso es administración — le toca al Consejo.»_ · _«**Nadie verifica:** se aprueba, se ejecuta… y nadie vuelve a mirar si se cumplió. Sin el tercer momento, la decisión queda a la buena suerte.»_

**Reflexión:** _«Piensa en la última decisión importante de tu grupo. ¿Quién la tomó, quién la ejecutó y quién verificó que se cumpliera? Si alguno de los tres no tiene nombre, escríbelo: ahí está tu primer hallazgo.»_

**Quiz:**

> **P1.** El Consejo de Grupo discute si la Tropa debe hacer su excursión en el páramo o en la costa, y termina votando el destino. Según esta lección, ¿qué pasó?
> a) _El Consejo ejerció su función: toda salida del grupo es una decisión de administración._
> b) _El Consejo invadió la ejecución del programa, que le toca a la Jefatura dentro del Plan._ ✅
> c) _El Consejo actuó bien, porque la Asamblea le delega todas las decisiones del grupo scout._

> **P2.** El Consejo aprueba comprar carpas nuevas y encarga la compra a uno de sus miembros. Seis meses después nadie sabe si llegaron completas. ¿Qué momento de la gobernanza falló?
> a) _La verificación: se decidió y se ejecutó, pero nadie comprobó que la decisión se cumpliera._ ✅
> b) _La decisión: el Consejo no debía aprobar una compra sin consultarla antes con la Asamblea._
> c) _La ejecución: ningún miembro del Consejo debe comprar nada sin que lo apruebe la Jefatura._

**Logro:** «Sé quién decide qué».

---

### 4.4 Lección 3 — 🗳️ La Asamblea de Grupo (6 min)

**Idea central:** La máxima autoridad del grupo se reúne al menos una vez al año, y lo que no queda en su acta no existe.

**Secciones:**

1. **`info-box`** — Idea central.
2. **`paragraph`** — _«Muchos grupos viven la Asamblea como un trámite de marzo. Es al revés: es **el único momento del año en que el grupo entero decide**. Todo lo que el Consejo hace después, lo hace por mandato de ella.»_
3. **`timeline`** — La Asamblea en 4 pasos:
    - **Cuándo** → _«Ordinaria, al menos una vez al año, dentro de los tres primeros meses. Extraordinaria, cuando algo urgente lo exige — con puntos precisos y sin "proposiciones y varios".»_ (Reglamento de Grupos 4.4.2–4.4.3)
    - **Quién vota** → _«Los representantes legales de los niños, niñas y jóvenes, **un voto por núcleo familiar**; los Rovers, que se representan a sí mismos; y el representante de la entidad auspiciadora, si la hay. Solo votan quienes estén a paz y salvo.»_ (4.2.1 y parágrafo primero)
    - **Qué decide** → _«Aprueba el Plan de Grupo; estudia y aprueba o imprueba informes, cuentas y estados financieros; elige a los miembros del Consejo y a los delegados a la Asamblea Regional; aprueba proyectos y presupuestos.»_ (4.3)
    - **Qué deja** → _«Un acta numerada con lugar, fecha, asistentes, asuntos, decisiones **y los votos a favor, en contra, en blanco y abstenciones**, que se envía al Consejo Regional (o al Nacional, si el grupo está adscrito a la Nación). Sin esa copia, el nivel superior no reconoce a los dignatarios elegidos.»_ (4.25–4.26)
4. **`policy-quote`** — `label`: «📋 Ver qué debe decir el acta» · `text` (literal, 4.25): _«Las actas se encabezarán con su número y expresarán cuando menos: lugar, fecha y hora de la reunión; la forma y antelación de la convocatoria; la lista de los asistentes […]; los asuntos tratados; las decisiones adoptadas y el número de votos emitidos en favor, en contra, en blanco o las abstenciones […]»_ · `source`: «Reglamento Nacional de Grupos Scouts, Art. 4.25».
5. **`info-box`** — _«Fíjate en el detalle de los votos. Un acta que dice "se aprobó" no sirve para nada cuando alguien lo discute dos años después. Una que dice "se aprobó con 23 votos a favor, 4 en contra y 2 abstenciones" cierra la discusión en un minuto.»_

**Reflexión:** _«¿Cuándo fue la última Asamblea de tu grupo? ¿Aprobó el Plan de Grupo y los estados financieros, o solo eligió Consejo? Escribe qué le faltó —o qué hizo bien— según los cuatro pasos de esta lección.»_

**Quiz:**

> **P1.** En la Asamblea de un grupo, una mamá y un papá de la misma familia quieren votar por separado. ¿Qué indica el Reglamento?
> a) _Votan los dos, porque cada representante legal presente tiene derecho a su propio voto._
> b) _Vota uno solo: el voto de los representantes legales es de un voto por núcleo familiar._ ✅
> c) _Vota uno solo, pero únicamente si la familia tiene un solo hijo inscrito en el grupo._

> **P2.** El acta de la Asamblea dice: «Se eligió el nuevo Consejo». Dos meses después la región no reconoce a los elegidos. ¿Cuál es la causa más probable?
> a) _El acta no llegó al Consejo Regional, y sin esa copia no se reconoce a los elegidos._ ✅
> b) _La región debe ratificar a cada consejero con una votación propia antes de reconocerlo._
> c) _El acta no llevaba la firma de todos los asistentes, requisito para que sea válida._

**Logro:** «Preparo una Asamblea».

---

### 4.5 Lección 4 — 🪑 El Consejo entre asambleas (6 min)

**Idea central:** El Consejo gobierna por mandato de la Asamblea: se reúne cada mes, decide con quórum y deja actas.

**Secciones:**

1. **`info-box`** — Idea central.
2. **`policy-quote`** — `label`: «📋 Ver de dónde sale su autoridad» · `text` (literal, 5.6): _«La autoridad del Consejo de Grupo emana directamente de la Asamblea de Grupo y por lo tanto es la máxima autoridad legal, administrativa y financiera del Grupo y el organismo directivo del Grupo mientras la Asamblea de Grupo no se encuentre reunida.»_ · `source`: «Reglamento Nacional de Grupos Scouts, Art. 5.6».
3. **`method-grid`** — Las reglas mínimas de una reunión válida (5.5):
    - 📅 **Cada mes** → _«Reuniones ordinarias como mínimo una vez al mes.»_
    - ✉️ **Citación escrita** → _«Con mínimo dos días comunes de anticipación.»_
    - 🔢 **Quórum de cinco** → _«El quórum mínimo para deliberar y decidir se conforma con cinco de sus miembros.»_
    - ⚡ **Urgencias** → _«Solo con la totalidad de sus miembros presentes puede autocitarse y sesionar de inmediato.»_
4. **`heading` (3)** — _«Lo que le toca al Consejo»_ 
5. **`list`** — selección de 5.6: ejecutar los mandatos de la Asamblea; revisar y aprobar el Plan de Grupo y enviarlo a la región; administrar bienes y recursos y fijar las cuotas; preparar el presupuesto y vigilar su ejecución; aprobar o improbar las cuentas mensuales; brindar protección integral a los niños, niñas y jóvenes.
6. **`info-box`** — Participación juvenil _(sujeto a la nota 2 de §0)_: _«El Consejo tiene un asiento para un **Rover**, elegido por sus pares del grupo (Reglamento 5.1.2). No es un gesto simbólico: la PNDI pide que la estructura de decisiones propicie "la participación de los jóvenes". Si el Rover no viene o no habla, el grupo tiene un problema de gobernanza, no de asistencia.»_
7. **`paragraph`** — _«Y el acta. El Reglamento se la exige a la Asamblea con todo detalle; al Consejo le aplica la misma lógica: **sin acta, la decisión depende de la memoria de quien estuvo**. Decisión, votos, responsable de ejecutarla y fecha para revisarla — los tres momentos de la L2 en cuatro renglones.»_

**Reflexión:** _«Toma la última reunión de Consejo de tu grupo (o la que recuerdes). ¿Hubo citación escrita, quórum de cinco y acta con responsable y fecha? Marca lo que faltó y escribe qué costaría ponerlo la próxima vez.»_

**Quiz:**

> **P1.** Un sábado se reúnen cuatro miembros del Consejo y aprueban un gasto urgente. ¿Qué dice esta lección de esa decisión?
> a) _Es válida si la urgencia queda bien explicada en el acta de la reunión._
> b) _No es válida hasta que la Asamblea la ratifique en su próxima reunión._
> c) _No es válida: sin quórum, porque el Consejo decide con mínimo cinco miembros._ ✅

> **P2.** Entre asambleas, ¿quién tiene la autoridad para aprobar o improbar las cuentas mensuales del grupo?
> a) _El Consejo de Grupo, que gobierna por mandato de la Asamblea mientras esta no está reunida._ ✅
> b) _El Jefe de Grupo, porque es quien ejecuta el Plan de Grupo y maneja la operación diaria._
> c) _El Consejo Regional, porque las cuentas de los grupos se revisan en el nivel superior._

**Logro:** «Sé cómo sesiona el Consejo».

---

### 4.6 Lección 5 — 📜 Las reglas del juego (6 min)

**Idea central:** Las normas tienen jerarquía, las dicta quien tiene la facultad, y una norma escrita puede no estar vigente.

**Secciones:**

1. **`info-box`** — Idea central.
2. **`paragraph`** — _«Uno de los 5 sub-ámbitos de la Gobernanza (Curso 4) son las **Regulaciones**: crear, revisar e incluso suprimir las normas internas. Para hacerlo bien hay que saber tres cosas: qué norma manda sobre cuál, quién puede dictarla y si sigue vigente.»_
3. **`timeline`** — La escalera de las normas:
    - **1. Estatuto Nacional (2025)** → _«La norma de mayor rango de la Asociación. Los estatutos regionales deben ser coherentes, en todo, con él (Art. 26).»_
    - **2. Políticas y reglamentos nacionales** → _«Los dicta el Consejo Scout Nacional, que ejerce **de manera exclusiva** la facultad reglamentaria, con participación de regiones y grupos (Art. 55.1).»_
    - **3. Normas de funcionamiento del Grupo** → _«Las define la Asamblea de Grupo, siempre dentro de las normas de la Asociación y de la Región (Reglamento 4.3.12).»_
4. **`policy-quote`** — `label`: «📋 Ver la facultad reglamentaria» · `text` (literal, Art. 55.1): _«Ejercer de manera exclusiva la facultad reglamentaria, permitiendo la participación de las Regiones y Grupos Scout en la elaboración o modificación de sus reglamentos.»_ · `source`: «Estatuto Nacional 2025, Art. 55.1 (atribuciones del Consejo Scout Nacional), p. 29».
5. **`info-box`** (advertencia) — _«Por eso un grupo **no tiene "reglamento interno"**: tiene **normas de funcionamiento**. El nombre importa: le recuerda al grupo que no legisla, sino que ordena su funcionamiento dentro de lo que ya está dictado.»_ (Glosario §A)
6. **`heading` (3)** — _«Escrita no es lo mismo que vigente»_
7. **`paragraph`** — Caso real: _«El Reglamento Nacional de Grupos Scouts de 2013 todavía dice que el grupo tiene un Fiscal o Revisor Fiscal. Pero en 2023 el Consejo Scout Nacional, mediante el **Acuerdo 558**, suspendió lo que los reglamentos dicen sobre los cargos de adultos, y el Estatuto 2025 remite los cargos a la **Política de Adultos en el Movimiento vigente**, cuyo Manual de Cargos no tiene Fiscal de Grupo: el control contable lo hace el **Contador de Grupo**. Quien leyera solo el Reglamento buscaría un cargo que no existe.»_
8. **`mission-box`** — _«Regla práctica: antes de citar una norma en una reunión, pregúntate **¿quién la dictó, sobre cuál se apoya y sigue vigente?** Si hay duda o vacío, quien interpreta el marco normativo es el Consejo Scout Nacional (Estatuto, Art. 55.1).»_

**Reflexión:** _«¿Tu grupo tiene sus normas de funcionamiento por escrito? Si las tiene, ¿alguna contradice o repite algo del Reglamento o del Estatuto? Si no las tiene, ¿cuál es la primera que escribirías?»_

**Quiz:**

> **P1.** Un consejo de grupo quiere aprobar su propio «reglamento interno» para cambiar el período de sus miembros. ¿Qué le dirías?
> a) _Que puede hacerlo, porque cada grupo es autónomo para dictar sus propios reglamentos._
> b) _Que no le corresponde: la facultad reglamentaria es exclusiva del Consejo Scout Nacional._ ✅
> c) _Que puede hacerlo, siempre que la Asamblea Regional apruebe después ese reglamento._

> **P2.** Un adulto cita en el Consejo un artículo del Reglamento de Grupos de 2013 sobre un cargo de adultos. ¿Qué conviene verificar antes de aplicarlo?
> a) _Que esté vigente: el Acuerdo 558 suspendió las disposiciones reglamentarias sobre cargos de adultos._ ✅
> b) _Que esté firmado: los artículos del Reglamento solo obligan si el grupo los ratificó en Asamblea._
> c) _Que esté publicado: el Reglamento aplica solo en regiones que lo adoptaron en su propio estatuto._

**Logro:** «Leo las reglas del juego».

---

### 4.7 Lección 6 — ⚖️ Los 8 principios de buena gobernanza (6 min)

**Idea central:** El Estatuto 2025 fija 8 principios; con ellos se mide si un grupo decide bien, no solo si decide.

**Secciones:**

1. **`info-box`** — Idea central.
2. **`paragraph`** — _«Hasta aquí vimos si el grupo decide **conforme a las reglas**. Pero se puede cumplir cada artículo y decidir mal: a puerta cerrada, sin escuchar a nadie, sin explicar nada. Para eso el Estatuto de 2025 fija ocho principios con los que la Asociación se compromete a desarrollar **todas** sus actividades.»_
3. **`policy-quote`** — `label`: «📋 Ver el artículo del Estatuto» · `text` (literal, Art. 9): _«La Asociación Scouts de Colombia desarrollará sus actividades de conformidad con los siguientes principios de buena gobernanza: Democracia y Participación; Orientación al consenso; Responsabilidad; Transparencia; Receptividad; Efectividad y eficiencia; Equidad e inclusión; Guiada por el Estado de Derecho.»_ · `source`: «Estatuto Nacional 2025, Art. 9, p. 7».
4. **`info-box`** — _«El Estatuto **nombra** los ocho principios pero no los define. Lo que sigue es una **pregunta de chequeo** por principio, escrita para este curso — no es texto oficial.»_ (regla del ADR-072: lo que escribimos nosotros va en `info-box`, no en `policy-quote`)
5. **`method-grid`** — 8 tarjetas, principio → pregunta de chequeo:
    - 🗳️ **Democracia y Participación** → _«¿Votan quienes deben votar, y los jóvenes tienen voz en las decisiones que los afectan?»_
    - 🤝 **Orientación al consenso** → _«¿Se busca el acuerdo antes de ir a votar, o se vota para no conversar?»_
    - 🧾 **Responsabilidad** → _«¿Cada decisión tiene un responsable y alguien que rinde cuentas?»_
    - 🔍 **Transparencia** → _«¿Las actas y las cuentas se pueden consultar?»_
    - 👂 **Receptividad** → _«¿Las familias y los dirigentes saben cómo hacer llegar una propuesta o un reclamo, y reciben respuesta?»_
    - ⚙️ **Efectividad y eficiencia** → _«¿Lo que se decide se ejecuta, y a un costo razonable?»_
    - 🌈 **Equidad e inclusión** → _«¿Alguien queda sistemáticamente por fuera de las decisiones?»_
    - ⚖️ **Guiada por el Estado de Derecho** → _«¿Se respetan el Estatuto, los reglamentos y la ley colombiana — incluso cuando sería más cómodo no hacerlo?»_
6. **`paragraph`** — Conexión con la PNDI: _«La PNDI de 2017 ya pedía lo mismo con otras palabras: una estructura de decisiones **definida con claridad, conocida por todos, abierta, descentralizada, transparente y eficaz**, con participación de los jóvenes. El Estatuto de 2025 lo convierte en principios de toda la Asociación.»_

**Reflexión:** _«Recorre los 8 principios pensando en tu grupo. ¿Cuál es el más fuerte y cuál el más débil? Para el más débil, anota un ejemplo concreto de los últimos meses que lo muestre.»_

**Quiz:**

> **P1.** Un consejo aprueba todo por mayoría en diez minutos, sin discusión, y nunca publica sus actas. Cumple el quórum y las citaciones. ¿Qué principios del Art. 9 está descuidando?
> a) _Descuida ninguno: si cumple quórum y citación, su gobernanza ya es buena._
> b) _Descuida Efectividad y eficiencia, porque diez minutos no alcanzan para decidir._
> c) _Descuida Orientación al consenso y Transparencia: no busca acuerdo ni se deja ver._ ✅

> **P2.** Según el curso, las preguntas de chequeo de cada principio…
> a) _Son una ayuda escrita para el curso: el Estatuto nombra los principios pero no los define._ ✅
> b) _Son la definición oficial de cada principio, tomada textualmente del Art. 9 del Estatuto._
> c) _Son el instrumento oficial de autoevaluación que el CSN pide aplicar cada año a los grupos._

**Logro:** «Mido la gobernanza».

---

### 4.8 Lección 7 — 🎯 Tu compromiso de gobernanza (4 min)

**Idea central:** Una mejora concreta, con dueño y fecha, en el principio más débil de tu grupo.

**Secciones:**

1. **`info-box`** — Idea central.
2. **`paragraph`** — Recapitulación del hook: _«Una decisión que nadie tomó, nadie la puede cumplir. Ahora tienes cuatro herramientas para que eso no pase en tu grupo: los tres momentos, la Asamblea y el Consejo bien llevados, la escalera de normas y los ocho principios.»_
3. **`list`** — Ejemplos de compromisos pequeños y verificables: _«Proponer al Consejo un formato de acta con decisión, votos, responsable y fecha de revisión.»_ · _«Revisar que el acta de la última Asamblea llegó al Consejo Regional.»_ · _«Proponer que los Rovers del grupo presenten un punto en la próxima reunión del Consejo.»_ · _«Escribir las normas de funcionamiento del grupo que hoy solo existen "de palabra".»_
4. **`info-box`** — Puente: _«La Gobernanza tiene un quinto sub-ámbito que este curso solo nombró: la **Planificación Estratégica**. Es el tema del **Curso 8 — Planeación: del Plan Estratégico al POA**. Y si eres tesorero o estás en el Consejo, el **Curso 10 — Finanzas Sanas** aterriza lo que aquí viste de cuentas y presupuesto.»_ ⚠️ _Ajustar a «(próximamente)» si al publicar estos cursos no existen todavía._

**Reflexión (compromiso):** _«Escribe tu compromiso de gobernanza: qué vas a hacer, en cuál de los 8 principios, con quién y para cuándo.»_

**Quiz:** ninguno.

**Logro:** «Gobernanza en práctica» (`unlockOnModule: -1`).

---

## 5. Logros

| Logro | Se desbloquea |
|---|---|
| Sé quién decide qué | L2 |
| Preparo una Asamblea | L3 |
| Sé cómo sesiona el Consejo | L4 |
| Leo las reglas del juego | L5 |
| Mido la gobernanza | L6 |
| **Gobernanza en práctica** (final) | `-1` |

## 6. Certificado

- `courseName`: «Gobernanza Práctica»
- `description`: «Completó el curso de gobernanza práctica: distinguir quién decide, quién ejecuta y quién verifica; llevar una Asamblea y un Consejo con quórum y actas; leer la jerarquía y la vigencia de las normas, y evaluar su grupo con los 8 Principios de Buena Gobernanza del Estatuto Nacional 2025.»

---

## 7. Conexiones cross-course

- **← Curso 3:** el mapa de órganos. Este curso **no repite** la arquitectura por nivel; la da por sabida y la pone a funcionar.
- **← Curso 4:** los 5 sub-ámbitos de Gobernanza (Gobierno, Regulaciones, Estructuras, Funciones, Planificación Estratégica). L2 trabaja Gobierno/Funciones, L3–L4 Estructuras en funcionamiento, L5 Regulaciones; Planificación Estratégica se deriva al Curso 8.
- **← Curso 6:** su `courses-suggestion` ya recomienda este curso a quien marcó Gobernanza en NO/PARCIAL — **promesa publicada que este curso cumple**.
- **→ Curso 8** (Planeación) y **→ Curso 10** (Finanzas Sanas): ver L7.
- **→ Nivel 3** (Cursos 15–20): funciones de cada cargo del Consejo, que aquí se evitan a propósito (§0.2).

## 8. Trazabilidad prevista (filas para `TRAZABILIDAD.csv`)

| Lección | Afirmación | Fuente | Ubicación |
|---|---|---|---|
| L2 | Definición de Gobernanza (decidir, implementar, verificar) — cita literal | PNDI 2017 | §8.2.1, p. 9 |
| L2 | Asamblea máxima autoridad / Consejo administra / Jefe ejecuta el Plan — cita literal | Estatuto 2025 | Art. 18, p. 16 |
| L2 | Jefe de Grupo rinde cuentas ante Consejo, Jefe Regional y Asamblea | Estatuto 2025 | Art. 19, p. 16 |
| L2 | Patrón repetido en Región y Nación; Asamblea Nacional «máxima instancia de gobierno» | Estatuto 2025 | Art. 20–23, 28–30, pp. 16–20 |
| L2 | Equipo de Jefatura = órgano técnico de conducción del Programa de Jóvenes | Reglamento de Grupos | 1.19.3 |
| L3 | Asamblea ordinaria anual en los tres primeros meses; extraordinaria sin varios | Reglamento de Grupos | 4.4.2–4.4.3 |
| L3 | Un voto por núcleo familiar; Rovers se representan; paz y salvo | Reglamento de Grupos | 4.2.1 y parágrafo 1.º |
| L3 | Facultades de la Asamblea | Reglamento de Grupos | 4.3 |
| L3 | Contenido del acta — cita literal | Reglamento de Grupos | 4.25 |
| L3 | Envío del acta a la región; sin ella no se reconocen dignatarios | Reglamento de Grupos | 4.26 |
| L4 | Autoridad del Consejo emana de la Asamblea — cita literal | Reglamento de Grupos | 5.6 |
| L4 | Reunión mensual, citación 2 días, quórum 5, autocitación con totalidad | Reglamento de Grupos | 5.5 |
| L4 | Rover en el Consejo, elegido por pares ⚠️ ver §0.2 | Reglamento de Grupos | 5.1.2 |
| L5 | Estatutos regionales coherentes con el nacional | Estatuto 2025 | Art. 26, p. 18 |
| L5 | Facultad reglamentaria exclusiva del CSN; interpreta el marco normativo — cita literal | Estatuto 2025 | Art. 55.1, p. 29 |
| L5 | Normas de funcionamiento del Grupo | Reglamento de Grupos | 4.3.12 |
| L5 | Acuerdo 558/2023 y Contador de Grupo | ADR-022 (Infografía PNAM; Manual de Cargos 2.1.8) | — |
| L6 | 8 Principios de Buena Gobernanza — cita literal | Estatuto 2025 | Art. 9, p. 7 |
| L6 | Estructura clara, conocida, abierta, descentralizada, transparente, eficaz | PNDI 2017 | §8.2.1, p. 9 |

## 9. Revisión v0.1 → v0.2 (27-sep-2026)

Revisión completa pedida por el dueño antes de aprobar. Cada cita literal se cotejó otra vez contra el PDF (el orden del Art. 9 se confirmó **mirando la página impresa**, porque una de las extracciones de texto lo devolvía en otro orden). Lo que cambió:

- **Paridad de quiz:** 4 preguntas tenían la correcta 12+ caracteres más larga que cualquier distractor (L2-P1, L3-P2, L5-P1, L6-P1); una no tenía dos opciones con la misma primera palabra (L6-P1), y una delataba la correcta por **polaridad** —era la única que empezaba por «No»— (L4-P1). Las seis reescritas moviendo distractores o acortando la correcta **sin cambiar lo que afirma**.
- **L6:** se borró *«algo que los estatutos anteriores no tenían tan explícito»* — afirmación histórica sin fuente en el corpus (solo está el Estatuto 2025).
- **L6:** el chequeo de Democracia y Participación ya no depende del Rover del Consejo (§0.2), por si el auditor declara suspendido el Art. 5.1.
- **L2-P2:** fuera el «intendente»: nombrar un cargo sin necesidad metía al curso en funciones de cargos (§0.2).
- **L3:** el acta va al Consejo Regional **o Nacional** (4.26 dice «según el caso»; hay grupos adscritos a la Nación).
- **L2:** la Nación completa el patrón con el **Art. 30** (Asamblea Scout Nacional, «máxima instancia de gobierno»), y el reparto Consejo/Jefatura se ancla también en el **Reglamento 1.19.3**.
- **§0.4:** discrepancia Manual de Cargos 2.1.10 ↔ Estatuto 19 / Reglamento 5.1.4 sobre si el Jefe de Grupo es miembro del Consejo. El curso no lo afirma en ningún sentido.
- **Observación fuera de alcance, para el dueño:** el Estatuto 2025 **sigue nombrando** un «Revisor Fiscal Regional» entre quienes asisten con voz a la Asamblea Regional (Art. 22). No contradice el ADR-022 —que ya prevé Revisor Fiscal en regiones con personería jurídica propia (Art. 25)—, pero conviene tenerlo presente para el Curso 20.

## 10. Paso a JSON (27-sep-2026, diseño aprobado por el dueño)

- **La L7 lleva quiz** (2 preguntas de cierre), aunque el diseño decía «ninguno»: en esta línea todo módulo de contenido tiene quiz, y el flujo E2E lo recorre así. Preguntas: *¿por dónde empezar si las decisiones se toman en el chat?* (correcta: llevarlas al Consejo con acta de votos, responsable y fecha) y *¿cuál es un compromiso bien formulado?* (correcta: el que tiene reunión, objeto y fecha).
- **Seis distractores alargados** unos caracteres porque el build avisó que la correcta era la más larga en 7/12 preguntas (márgenes de 3 a 6). Las correctas no se tocaron. **Desde aquí la fuente es el JSON**, no este diseño.

## 11. Correcciones de las auditorías (27-sep-2026)

**Doctrinal: APTO CON CORRECCIONES MENORES** (0 críticos; 2 mayores de documentación). **Pedagógica: REQUIERE MEJORA** (3 altos, 11 medios, 5 bajos). Aplicado todo en el JSON, que es la fuente:

- **Doctrinales:** m1 el asiento juvenil se ancla en el **Estatuto Art. 27** (*Consejeros Juveniles*) además del 5.1.2 — y el auditor confirmó que el Acuerdo 558 **no** alcanza al Rover (no es miembro adulto), ni a 5.5/5.6 como reglas del órgano, así que la duda del §0.2 queda **cerrada**; m2 «un cargo que no existe» → «que hoy ya no opera»; m5 la Jefatura decide las actividades **con los niños**; m6 «el único momento del año» y «que este curso solo nombró» corregidos. **M1** glosario (v1.30: subsección de órganos del Grupo y gobernanza, fila «consejero» ampliada y discrepancia del Jefe de Grupo registrada sin arbitrar); **M2** 22 filas en `TRAZABILIDAD.csv`, con la remisión del Estatuto en el **Art. 16** y el Acuerdo 558 por la infografía PNAM (m3).
- **Pedagógicas:** **H1** el caso del chat se resuelve en la L7 y su quiz lo cobra (y ya no contradice a la L2); **H2** puente en L4 sobre por qué el Consejo es «organismo directivo», quién verifica y cómo intervienen Consejo y Asamblea en el Plan de Grupo; **H3** descripción, intro, logro de L3 y certificado ya no prometen el quórum de la Asamblea, que el curso no enseña; M1–M5 y M7 cinco preguntas de memoria pasadas a casos (L3-P1, L4-P2, L5-P1 y P2, L6-P2, L7-P2); M6 duración **medida**: ~34 min (el total subió al añadir H1, H2 y M8); M8 puente de los principios con lo ya practicado; M9 la L2 presenta los órganos como recuerdo del Curso 3 y dice quién verifica; M10 la intro dice que hay que acertar las 2 preguntas y la L7 pide copiar el compromiso en el certificado; M11 y B1–B4.
- **Pendiente de decisión del dueño (toca el build, no el curso):** la caja fija de «Compromiso Personal» del certificado invita a un compromiso genérico; el auditor propone un campo opcional `certificate.commitmentPrompt`.
- **Pendiente de fuente:** el texto del Acuerdo CSN 558/2023 no está en el corpus (se verifica por la infografía PNAM); pedirlo a la DNAM o a la Secretaría del CSN.
