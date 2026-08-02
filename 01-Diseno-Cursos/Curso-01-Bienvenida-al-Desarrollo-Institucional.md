# Diseño del Curso 1 — 🏛️ Bienvenida al Desarrollo Institucional

**Línea:** Desarrollo Institucional · **Nivel:** 1 (Fundamentación) · **Posición:** Curso 1 de 6 del Nivel 1.

> Vertical slice del Nivel 1. Este curso es la prueba de concepto del marco metodológico aplicado a la línea Desarrollo Institucional. Tras pilotaje, se replicará el patrón a los Cursos 2–6.

---

## 1. Ficha del curso

| Campo | Valor |
|---|---|
| `courseId` | `bienvenida-desarrollo-institucional` |
| Título | Bienvenida al Desarrollo Institucional |
| Subtítulo | Formación de Adultos Voluntarios — Asociación Scouts de Colombia |
| Icono | 🏛️ |
| Duración | ~25 min |
| Lecciones de contenido | 6 + intro + certificado |
| Audiencia primaria | Todo adulto que entra a la línea: jefes de grupo, miembros del consejo de grupo, consejeros de grupo y regionales, comisionados regionales y nacionales, miembros de Cortes de Honor y Comisiones de Vigilancia y Control, adultos voluntarios en general. |
| Pre-requisitos | Ninguno. Es la puerta de entrada a la línea. |
| Logro final | "Constructor Institucional" |

---

## 2. Objetivos del curso

Al completar este curso, el adulto:

1. **Reconoce** que el Desarrollo Institucional no es asunto exclusivo de comisionados sino un compromiso que atraviesa todas las prácticas de cuidado de la institución scout.
2. **Identifica** ejemplos concretos de Desarrollo Institucional en su grupo o región actual.
3. **Desarma** los principales mitos que dificultan la apropiación del DI por parte del adulto voluntario.
4. **Ubica** los órganos de gobierno, operación y control de la ASC y la normatividad marco vigente (Estatuto Nacional 2025, PNDI 2017, Plan Estratégico 2023–2026).
5. **Conecta** la salud institucional de su grupo con la calidad de la experiencia educativa que reciben los chicos.
6. **Expresa** un primer compromiso concreto de aporte al DI desde su rol actual.

---

## 3. Hook pedagógico (la idea poderosa que sostiene el curso)

> **"Desarrollo Institucional no es lo que hacen los de arriba mientras nosotros trabajamos con los chicos. Es lo que hacemos cada vez que cuidamos que el grupo dure, funcione y crezca con bien. Nadie se libra."**

Este hook se enuncia explícitamente en la Lección 1 (Bienvenida) al abrir el curso y se retoma como cierre textual en la Lección 6 (Tu primer compromiso), haciendo eco. Su función es contradecir el supuesto erróneo de que DI es competencia ajena al adulto operativo.

---

## 4. Estructura de lecciones

### 4.1 Mapa general

| # | Lección | Duración | Idea central | Logro al completar |
|---|---|---|---|---|
| 1 | 👋 Bienvenida | 3 min | "Estás aquí porque importas para que esto dure." | Empecé el camino |
| 2 | 🏛️ ¿Qué es Desarrollo Institucional, en realidad? | 5 min | DI es todo lo que hacemos para que el grupo dure, funcione y crezca con bien. | DI está en todo |
| 3 | 🧨 Los 5 mitos del DI (y cómo desarmarlos) | 5 min | Lo que crees que es DI no siempre es DI. | Mito-buster |
| 4 | 🇨🇴 Tu institución en una página | 5 min | Sé quiénes deciden, quiénes ejecutan y quiénes vigilan en tu ASC. | Conozco mi institución |
| 5 | 💡 Por qué un grupo saludable cambia la vida de los chicos | 4 min | La salud institucional protege la experiencia educativa. | Veo por qué importa |
| 6 | ✍️ Tu primer compromiso | 3 min | Saber sin actuar no transforma; el primer paso es chico y concreto. | Constructor Institucional (final) |

**Total estimado: ~25 min** de lecciones de 3–5 min, dentro del rango óptimo del marco metodológico.

---

### 4.2 Lección 1 — 👋 Bienvenida (3 min, isIntro: true)

**Idea central:** "Estás aquí porque importas para que esto dure."

**Secciones (en orden):**

1. **`info-box`** — Tiempo estimado del curso (~25 min) y promesa concreta: _"Al final vas a tener claro qué es DI, por qué te aplica a ti, y cuál es tu primer compromiso."_
2a. **`paragraph`** — Saludo cálido en segunda persona. Reconocimiento del lugar del adulto en el movimiento.
2b. **`paragraph`** — Enuncia el hook del curso al inicio (para hacer eco con el cierre de la Lección 6): _"Quizás escuchaste el término “Desarrollo Institucional” y pensaste: eso es lo que hacen los de arriba, mientras nosotros trabajamos con los chicos. Pues no. **Desarrollo Institucional es lo que hacemos cada vez que cuidamos que el grupo dure, funcione y crezca con bien. Nadie se libra** — ni tú tampoco."_
3. **`heading` (nivel 3)** — _"Lo que vas a vivir en este curso"_
4. **`list`** — Las 5 ideas centrales que verá (una por lección 2–6).
5. **`mission-box`** — Invitación a no apurar, a tomar el curso lección por lección y a escribir las reflexiones pensando en su grupo concreto.

**Reflexión:** ninguna en la intro (siguiendo el patrón del Curso 1 de la Línea Política de Adultos: la lección de bienvenida no lleva reflexión ni quiz).

**Quiz:** ninguno.

**Logro al completar:** "Empecé el camino".

---

### 4.3 Lección 2 — 🏛️ ¿Qué es Desarrollo Institucional, en realidad? (5 min)

**Idea central:** DI es todo lo que hacemos para que el grupo dure, funcione y crezca con bien.

**Secciones (en orden):**

1. **`info-box`** — Idea central de la lección.
2. **`paragraph`** — Anti-definición: _"Si abres la PNDI 2017 vas a leer '...dar directrices que identifiquen, definían y articulen los ámbitos de gestión que dan soporte al Movimiento Scout para el cumplimiento de la Misión y la Visión.' Es exacta, palabra por palabra (incluido ese 'definían' un poco raro del original). Y, si nunca has hecho un curso así, es difícil de digerir. Vamos a llegar a esa frase, pero por el camino aterrizado."_
3. **`heading` (nivel 3)** — _"Mira tu propio grupo y vas a ver DI por todos lados"_
4. **`method-grid`** — 6 ejemplos cotidianos de DI con icono y color, para mostrar que el adulto ya hace DI:
    - **El secretario** que toma acta y la guarda → _gobernanza_
    - **El tesorero** que abre la cuenta del grupo en el banco → _administración_
    - **La mamá** que organiza un bingo para el viaje → _recursos económicos_
    - **El intendente** que cuenta las carpas antes y después → _activos_
    - **El consejero** que media un conflicto entre dirigentes → _relaciones humanas_
    - **El jefe** que reporta el accidente del campamento → _gestión del riesgo_
5. **`paragraph`** — Conclusión: _"Ninguna de estas personas está pensando 'estoy haciendo Desarrollo Institucional'. Pero todas lo están haciendo. Y todas, de alguna forma, son responsables de que el grupo dure, funcione y crezca con bien."_
6. **`policy-quote`** — Cita textual de la PNDI 2017 con su definición técnica:
    - `text`: _"...para fomentar el progreso y crecimiento integral de nuestras instituciones..."_
    - `source`: "Política Nacional de Desarrollo Institucional 2017, Introducción, p. 3"
    - `label`: "📋 Ver lo que dice la política textualmente"
7. **`info-box`** — Reformulación accesible: _"En palabras simples: DI es la columna vertebral del grupo. Lo que lo sostiene cuando nadie está mirando."_

**Reflexión:** _"Mira tu grupo o región. Escribe **dos cosas que ya están haciendo bien** en términos de DI (cualquiera de los seis ejemplos del método-grid sirve) y **una cosa que sospechas que está floja**."_

**Quiz (2 preguntas):**

> **P1.** El papá de un lobato te dice: _"A mí no me interesa el Desarrollo Institucional, yo solo vengo a ayudar en las actividades de la manada."_ Según lo que viste en esta lección, ¿qué le respondes?
>
> a) _"Tienes razón, DI es solo cosa de comisionados y del consejo de grupo."_
> b) _"Ayudar en las actividades de la manada de forma constante y confiable ya es una forma de Desarrollo Institucional — hacer que el grupo funcione."_  ✅
> c) _"DI es la documentación contable que exige el Estado, así que a él no le aplica tampoco."_

> **P2.** Una mamá del grupo organiza un bazar para juntar fondos para el campamento de invierno. Según esta lección, ¿está haciendo Desarrollo Institucional?
>
> a) _No, ella no es comisionada ni dirigente formal._
> b) _Solo si el bazar está incluido en el plan operativo anual._
> c) _Sí, está aportando al ámbito de Gestión de Recursos Económicos del grupo._  ✅

**Logro:** "DI está en todo".

---

### 4.4 Lección 3 — 🧨 Los 5 mitos del DI (y cómo desarmarlos) (5 min)

**Idea central:** Lo que crees que es DI no siempre es DI. Vale la pena revisar tus supuestos.

**Secciones (en orden):**

1. **`info-box`** — Idea central de la lección.
2. **`paragraph`** — Apertura: _"Hablemos de los cinco mitos que escuchamos una y otra vez en los grupos. Si alguna vez has pensado uno de estos, no estás solo. Pero queremos que salgas de aquí pensando distinto."_
3. **`heading` (nivel 3)** — _"Mito 1 — 'Eso es trabajo de los comisionados, no mío'"_
4. **`paragraph`** — Refutación: el comisionado coordina y orienta, pero quien aterriza el DI en la realidad del grupo son los adultos del consejo y todos los voluntarios. La PNDI explícita 3 niveles de aplicación (Nacional, Regional, **Grupo**).
5. **`heading` (nivel 3)** — _"Mito 2 — 'DI es papeleo y burocracia'"_
6. **`paragraph`** — Refutación: el documento existe para sostener la práctica, no al revés. Acta sin reunión = papel muerto. Reunión sin acta = recuerdo que se borra. Ambas se necesitan.
7. **`heading` (nivel 3)** — _"Mito 3 — 'Si los chicos están bien, lo institucional puede esperar'"_
8. **`paragraph`** — Refutación: cuando lo institucional falla, los chicos lo sufren primero. Dirigente que se va con la única clave del depósito; padres que reclaman cuotas mal cobradas; campamento sin protocolo de transporte. La calidad de la experiencia educativa **depende** de la salud institucional.
9. **`heading` (nivel 3)** — _"Mito 4 — 'Eso ya lo hace alguien más'"_
10. **`paragraph`** — Refutación: cuento clásico "Todo el mundo, Alguien, Cualquiera y Nadie" (taller Flor de Lis II). Cuando la responsabilidad es de todos, nadie la asume. El servicio empieza por uno mismo.
11. **`heading` (nivel 3)** — _"Mito 5 — 'Para hacer DI hay que ser experto en gerencia'"_
12. **`paragraph`** — Refutación: hay momentos para los expertos (un revisor fiscal, un abogado, un contador). Pero la mayor parte del DI cotidiano se hace con sentido común, método y compromiso. Ningún jefe de grupo nació sabiendo; aprendió haciendo + acompañado.
13. **`info-box`** — Cierre: _"Si hubo un mito que reconociste como tuyo: bienvenido al club. Ahora lo importante es que ya tienes con qué responderle a quien lo repita."_

**Reflexión:** _"Piensa en una persona concreta de tu grupo o región (puedes usar solo su rol o iniciales) que alguna vez dijo o pensó algo parecido a uno de estos 5 mitos — y en qué momento fue (una reunión, una salida, una conversación de pasillo). Escribe qué dijo y qué le responderías hoy, con tus propias palabras."_

**Quiz (2 preguntas):**

> **P1.** Un dirigente nuevo te dice: _"Yo solo quiero estar con los chicos, no me metas en cosas administrativas."_ ¿Cuál es la mejor respuesta según esta lección?
>
> a) _"Tienes razón, hay otros para eso."_
> b) _"Justamente para que los chicos estén bien, necesitamos que el grupo funcione institucionalmente; tu aporte cuenta."_  ✅
> c) _"Mejor no participes en el consejo entonces."_

> **P2.** En el consejo de tu grupo todos están de acuerdo en que hay que actualizar las normas de funcionamiento del Grupo… pero nadie levanta la mano para hacerlo porque "seguro alguien ya lo está haciendo". Pasan tres meses y sigue sin hacerse. Según el cuento de Todo el mundo, Alguien, Cualquiera y Nadie, ¿qué está pasando?
>
> a) _"El grupo necesita contratar a un experto externo para que lo haga."_
> b) _"Cuando una responsabilidad es 'de todos', en la práctica termina sin ser de nadie — alguien concreto tiene que asumirla."_  ✅
> c) _"Es normal: eso es tarea exclusiva del comisionado regional, no del consejo de grupo."_

**Logro:** "Mito-buster".

---

### 4.5 Lección 4 — 🇨🇴 Tu institución en una página (5 min)

**Idea central:** Sé quiénes deciden, quiénes ejecutan y quiénes vigilan en tu ASC.

**Secciones (en orden):**

1. **`info-box`** — Idea central de la lección.
2. **`paragraph`** — Apertura: _"En la próxima lección entras al detalle. Pero antes necesitas un mapa simple. La Asociación Scouts de Colombia, como cualquier institución sana, tiene tres tipos de órganos en cada nivel."_
3. **`method-grid`** — Tres tipos de órganos con icono distinto:
    - 🏛️ **Gobierno** — _Asambleas y Consejos. Deciden el rumbo._ → Color morado.
    - ⚙️ **Operación** — _Equipos de Jefatura. Ejecutan las decisiones._ → Color verde.
    - 👁️ **Control** — _Cortes de Honor y Comisiones de Vigilancia y Control. Velan por la legalidad y la ética._ → Color amarillo.
4. **`paragraph`** — Aplicación: _"En tu grupo: Asamblea de Grupo (aprueba el rumbo) → Consejo de Grupo (gobierna el día a día) → Equipo de Jefatura (ejecuta) → el Fiscal (o Revisor Fiscal) y su Suplente, que vigilan las cuentas y el cumplimiento de las normas. En tu región: Asamblea Regional → Consejo Regional → Jefatura Regional → Revisoría Fiscal (Revisor Fiscal y Suplente). En el país: Asamblea Scout Nacional → Consejo Scout Nacional → Jefatura Scout Nacional → Comisión Nacional de Vigilancia y Control + Corte de Honor Nacional."_
5. **`heading` (nivel 3)** — _"La normatividad marco que rige todo"_
6. **`list`** — Las 4 normas marco vigentes:
    - **Estatuto Nacional 2025** — la norma constitucional de la ASC.
    - **Política Nacional de Desarrollo Institucional 2017** — el marco doctrinal del DI.
    - **Plan Estratégico 2023–2026** — el rumbo nacional para el cuatrienio.
    - **Reglamentos** — Reglamento Nacional de Grupos Scouts, Reglamento Nacional de Regiones Scout.
7. **`info-box`** — _"Los puedes consultar todos en https://scout.org.co/biblioteca · No tienes que aprendértelos. Solo saber que existen y dónde encontrarlos cuando los necesites."_
8. **`policy-quote`** — Cita textual del CSN:
    - `text`: _"El Consejo Scout Nacional es el órgano que dirige la institución de acuerdo con las normas legales, los Estatutos, los Reglamentos, los acuerdos y las decisiones de la Asamblea Nacional. En receso de la Asamblea Scout Nacional, es la autoridad máxima de la Asociación."_
    - `source`: "scout.org.co · Quiénes Somos · Consejo Scout Nacional"
    - `label`: "📋 Ver definición oficial del CSN"

**Reflexión:** _"En tu grupo o región, ¿sabrías nombrar a la persona que hoy preside el Consejo? ¿Y al jefe? ¿Y a la persona que ejerce el órgano de control (el Fiscal o Revisor Fiscal de tu grupo)? Anota lo que sepas y lo que no — eso vale más que adivinar."_

**Quiz (2 preguntas):**

> **P1.** El plan anual de actividades y el presupuesto del grupo los prepara el Consejo de Grupo. ¿Quién los aprueba?
>
> a) _El jefe de grupo, como cabeza visible del equipo de Jefatura._
> b) _El mismo Consejo de Grupo, en sesión ordinaria, dejándolo registrado en acta._
> c) _La Asamblea de Grupo, sobre la propuesta presentada por el Consejo de Grupo._  ✅

> **P2.** Un dirigente te dice: _"Lo que dice el Estatuto ya quedó viejo, ahora lo que manda es la Política Nacional de Desarrollo Institucional de 2017."_ ¿Qué le respondes según esta lección?
>
> a) _"Tiene razón, la PNDI 2017 es la norma constitucional vigente y reemplaza al Estatuto."_
> b) _"No exactamente: el Estatuto Nacional 2025 es la norma constitucional vigente de la ASC; la PNDI 2017 es el marco doctrinal específico del DI, pero no reemplaza al Estatuto."_  ✅
> c) _"Ninguno de los dos aplica ya — lo que rige hoy es solo el Plan Estratégico 2023–2026."_

**Logro:** "Conozco mi institución".

---

### 4.6 Lección 5 — 💡 Por qué un grupo saludable cambia la vida de los chicos (4 min)

**Idea central:** La salud institucional protege la experiencia educativa.

**Secciones (en orden):**

1. **`info-box`** — Idea central de la lección.
2. **`paragraph`** — Apertura emocional: _"Hasta acá hablamos de estructura y normatividad. Suena lejano de los chicos. Pero quiero que veas algo que vemos pocas veces: cuando el DI falla, el primero en sufrir es el lobato, el scout, el caminante, el rover."_
3. **`heading` (nivel 3)** — _"Tres historias reales (con detalles cambiados)"_
4. **`timeline`** — Tres historias breves:
    - **Grupo A — Cuando el dinero se mezcla con el bolsillo personal.** El tesorero llevaba la plata del grupo en su billetera. Renunció en mitad del año. El nuevo tesorero recibió un cuaderno con 14 anotaciones a mano. Tres familias dejaron de pagar la cuota porque "no se sabe a dónde va". El campamento de fin de año se canceló.
    - **Grupo B — Cuando el campamento sale sin protocolo.** Un dirigente se llevó a la tropa al cerro. Un chico se cayó. Sin lista de participantes, sin contacto de padres, sin permiso firmado. La emergencia se atendió, pero el grupo recibió una sanción de la región. Tres familias retiraron a sus hijos.
    - **Grupo C — Cuando el grupo se cuida.** Hace acta de cada reunión, cuenta sus carpas, tiene tesorero y contador, pide permiso firmado de cada salida, capacita a sus dirigentes en Safe from Harm. Lleva 23 años funcionando. Sus rovers son hoy los padres de la nueva manada.
5. **`paragraph`** — Síntesis: _"El DI no es un fin en sí mismo. Es la condición silenciosa para que la experiencia scout funcione."_
6. **`heading` (nivel 3)** — _"Cómo se ve un grupo institucionalmente sano"_ — la PNDI 2017 (Cap. 11) define una Institución Saludable como aquella que cumple su Misión y su Visión a través de la ejecución de buenas prácticas de manera consciente, sistemática y sostenida. El Capítulo 10 de la PNDI nombra 5 atributos específicos que hacen que una práctica sea realmente buena.
7. **`list`** — Los 5 atributos (panorama, sin profundizar — es spoiler del Curso 5):
    - Innovadora (aporta una mejora respecto a cómo se hacían las cosas antes).
    - Efectiva (logra el resultado que buscaba, y se puede comprobar).
    - Sostenible (se mantiene en el tiempo con los recursos del grupo, sin depender de una sola persona).
    - Replicable (otro grupo podría adoptarla con ajustes mínimos, está documentada).
    - Aplicable (sirve no solo a quien la inventó, sino que puede usarse en otros grupos o niveles del Movimiento).
8. **`info-box`** — Anuncio: _"En el Curso 5 vas a recorrer los 8 ámbitos del Curso 4 y construir tu catálogo personal de buenas prácticas del grupo filtradas con estos 5 atributos. Hoy solo guarda el mapa."_

**Reflexión:** _"De las tres historias, ¿cuál se parece más a algo que has visto en un grupo cercano (no necesariamente el tuyo)? Escribe en una frase qué falló institucionalmente y qué pudo haberlo prevenido."_

**Quiz (2 preguntas):**

> **P1.** En la historia del Grupo A, lo que falló fue principalmente…
>
> a) _Que la mamá no supo organizar el bingo._
> b) _Que el grupo no tenía orden contable y mezclaba lo personal con lo institucional._  ✅
> c) _Que el tesorero no era contador._

> **P2.** En un grupo, los chicos están felices en las reuniones, así que el consejo decide posponer indefinidamente organizar los permisos y actualizar el protocolo de salidas: "ya después vemos eso, lo importante es que los pelados la están pasando bien". Según esta lección, ¿qué le dirías a ese consejo?
>
> a) _"Tienen razón — mientras los chicos estén contentos, lo institucional puede esperar."_
> b) _"Ese papeleo no cambia nada; son temas totalmente aparte del bienestar de los chicos."_
> c) _"Justo para que los chicos sigan felices y seguros, ese papeleo hoy es lo que evita una historia como la del Grupo A o el Grupo B mañana."_  ✅

**Logro:** "Veo por qué importa".

---

### 4.7 Lección 6 — ✍️ Tu primer compromiso (3 min)

**Idea central:** Saber sin actuar no transforma; el primer paso es chico y concreto.

**Secciones (en orden):**

1. **`info-box`** — Idea central de la lección.
2. **`paragraph`** — Apertura: _"Llegaste hasta acá. Antes de pasar al Curso 2 necesitamos algo: que conviertas lo que viste en un primer paso concreto."_
3. **`heading` (nivel 3)** — _"Imagina tu grupo saludable ideal"_
4. **`paragraph`** — Instrucción del ejercicio: dibujar (o tomar foto a un dibujo, o subir una imagen que represente) cómo se vería tu grupo o región si fuera institucionalmente sano. No es un examen artístico, es un ancla visual de lo que quieres construir.
5. **`photo-upload`**
    - `photoId`: `bienvenida-di-grupo-saludable`
    - `prompt`: "Tu grupo saludable ideal"
    - `hint`: _"Puedes dibujarlo en papel y tomarle foto, o usar cualquier imagen que para ti represente un grupo institucionalmente sano. Es solo para ti — la guardamos en tu navegador."_
    - `buttonLabel`: "Subir mi imagen"
6. **`heading` (nivel 3)** — _"Un compromiso chico, concreto y tuyo"_
7. **`paragraph`** — Plantilla: _"Esta semana voy a __________. Lo voy a hacer con __________. Y la señal de que se cumplió será __________."_
8. **`mission-box`** — _"No prometas grande. Promete chico. La diferencia entre un grupo sano y uno frágil son cien promesas chicas cumplidas, no una grande olvidada."_
9. **`heading` (nivel 3)** — _"Lo que viene"_
10. **`list`** — Mapa de los siguientes 5 cursos del Nivel 1, con icono y nombre:
    - 📜 **Curso 2** — La Política PNDI: Marco y Principios.
    - 🏗️ **Curso 3** — Niveles y Estructura del Movimiento.
    - 🧭 **Curso 4** — Los 8 Ámbitos de Gestión.
    - 🌟 **Curso 5** — Buenas Prácticas en Tu Grupo: catálogo personal de buenas prácticas, recorriendo los 8 ámbitos con los 5 atributos de la PNDI 2017 Cap. 10.
    - 🗺️ **Curso 6** — Mi Aporte al Desarrollo Institucional (plan personal).
11. **`info-box`** — Despedida: _"Bienvenido al equipo de los que sostienen. Lo que viene vale el viaje."_

**Reflexión:** _"Escribe tu compromiso completo siguiendo la plantilla. Esto te lo enviaremos por correo cuando descargues tu certificado para que lo recuerdes en una semana."_

**Quiz (2 preguntas):**

> **P1.** ¿Cuál de estos compromisos cumple mejor el criterio "chico, concreto y tuyo"?
>
> a) _"Voy a transformar la cultura institucional del grupo este año."_
> b) _"Voy a proponer en la próxima reunión del consejo que firmemos el acta antes de salir."_  ✅
> c) _"Voy a estudiarme la PNDI completa."_

> **P2.** Un consejero lleva dos años diciendo en cada reunión "este año vamos a transformar completamente la cultura institucional del grupo" — y nada cambia. En el grupo vecino, alguien solo prometió "voy a proponer que firmemos el acta antes de salir" — y lo cumplió las cuatro veces que salieron. ¿Qué enseña esta comparación, según el cierre del curso?
>
> a) _"Que las promesas grandes son más valiosas porque muestran más compromiso."_
> b) _"Que un grupo institucionalmente sano se construye con promesas chicas que sí se cumplen, no con promesas grandes que se quedan en el aire."_  ✅
> c) _"Que ese tipo de promesas deberían dejárselas al jefe de grupo, que es quien tiene la responsabilidad final."_

**Logro al completar:** "Constructor Institucional" (logro final del curso, `unlockOnModule: -1`).

---

## 5. Logros (achievements)

| ID | Nombre | Emoji | Desbloqueo |
|---|---|---|---|
| `achievement-1` | Empecé el camino | 👋 | Al completar Lección 1 |
| `achievement-2` | DI está en todo | 🏛️ | Al completar Lección 2 |
| `achievement-3` | Mito-buster | 🧨 | Al completar Lección 3 |
| `achievement-4` | Conozco mi institución | 🇨🇴 | Al completar Lección 4 |
| `achievement-5` | Veo por qué importa | 💡 | Al completar Lección 5 |
| `achievement-final` | Constructor Institucional | 🏗️ | Al completar el curso (`unlockOnModule: -1`) |

---

## 6. Conexiones cross-course

### 6.1 Hacia adelante (dentro del Nivel 1 de DI)

- **L2 → Curso 2:** la mención de los 6 ejemplos de DI ancla los 8 ámbitos que el Curso 2 va a desarrollar.
- **L4 → Curso 3:** la "institución en una página" anuncia el Curso 3 que profundiza la estructura (5 niveles, 3 órganos por nivel).
- **L5 → Curso 5:** los 5 atributos de buena práctica (PNDI Cap. 10) se enuncian aquí y se aterrizan en el catálogo personal de buenas prácticas del Curso 5 ("Buenas Prácticas en Tu Grupo").
- **L6 → Curso 6:** el compromiso escrito sirve de input al Plan personal de Aporte que construirá el Curso 6 con `plan-builder`.

### 6.2 Cross-línea con la Línea Política de Adultos

- Si el adulto ya hizo el Curso 1 (Bienvenida al Movimiento de Adultos) de la Línea Política de Adultos, el formato le será familiar (microlearning, lecciones cortas, photo-upload, reflexión, quiz).
- El compromiso escrito en L6 puede leerse junto al Plan Personal de Desarrollo del Curso 5 de Política de Adultos (si existe) en el dashboard del adulto.

---

## 7. Tipos de sección utilizados

| Tipo | Lecciones donde aparece |
|---|---|
| `info-box` | L1, L2, L3, L4, L5, L6 (todas) |
| `paragraph` | Todas |
| `heading` (nivel 3) | L1, L3, L4, L5, L6 |
| `list` | L1, L4, L5, L6 |
| `method-grid` | L2, L4 |
| `mission-box` | L1, L6 |
| `policy-quote` | L2, L4 |
| `timeline` | L5 |
| `photo-upload` | L6 |
| `reflection` | L2, L3, L4, L5, L6 (excepto L1 intro) |
| `quiz` | L2, L3, L4, L5, L6 (excepto L1 intro) |

**No requiere ningún tipo de sección nuevo** — todos los tipos usados ya están soportados por el motor (`engine.js`) de la línea Política de Adultos. Esto significa que el Curso 1 de DI puede construirse sin tocar el motor.

---

## 8. Multimedia requerido

| Activo | Tipo | Estado | Observación |
|---|---|---|---|
| Video introductorio del curso | MP4 (opcional) | Por decidir | El Curso 1 de Política de Adultos usa videos del Taller Flor de Lis I. Podríamos extraer un fragmento del video Sesion 2 de Flor de Lis II (1.06 GB) si decidimos transcribir. |
| Imagen de portada del curso | PNG | Por crear | Estilo coherente con la línea Política de Adultos (morado #622599 + amarillo #FFE675). |
| Iconos del `method-grid` de L2 | Emoji | Listo | Se renderizan con emoji en el motor actual. |

**Decisión sugerida:** lanzar el Curso 1 sin videos en su primera versión. Si tras el piloto los adultos piden testimonios en video, transcribir Sesion 2 de Flor de Lis II y extraer 2–3 segmentos cortos.

---

## 9. Validación contra el marco metodológico

| Criterio del MARCO-METODOLOGICO-PEDAGOGICO | Cumplimiento |
|---|---|
| Curso entre 20 y 40 min | ✅ ~25 min |
| Lecciones de 3–8 min, óptimo 5–7 | ✅ rango 3–5 min, dentro del óptimo |
| Cada lección termina independiente | ✅ |
| Lenguaje conversacional, tutea | ✅ |
| Citas oficiales plegables (`policy-quote`) | ✅ L2 (PNDI) y L4 (CSN) |
| Reflexión personal por lección | ✅ excepto intro |
| Mini-quiz 1–3 preguntas, 70 % | ✅ 2 preguntas por lección |
| 4–6 logros + 1 final | ✅ 5 + 1 |
| Lección 1 marcada `isIntro: true` sin quiz | ✅ |
| Conexión cross-course | ✅ con Cursos 2–6 del nivel y con Línea Política de Adultos |

---

## 10. Próximos pasos

1. **Revisar este diseño** con el dueño del proyecto. Aplicar ajustes de tono, ejemplos, mitos, historias.
2. **Generar el JSON** del curso en `INDUCCION-DESARROLLO-INSTITUCIONAL/05-Generador-Cursos/borradores/bienvenida-desarrollo-institucional.json` siguiendo `course-schema.json`. Replicar el motor desde `INDUCCION-ADULTOS`.
3. **Generar HTML** con `node build-course.js bienvenida-desarrollo-institucional`.
4. **Generar preview PDF** y revisar.
5. **Pilotar** con 5–10 adultos voluntarios. Recoger retroalimentación durante 1–2 semanas.
6. **Ajustar** según retroalimentación y replicar el patrón a los Cursos 2–6 del Nivel 1.

---

_Documento de diseño del Curso 1, versión inicial — 10 de mayo de 2026. Validado contra el marco metodológico de la plataforma y la biblioteca oficial de la ASC (scout.org.co/biblioteca, revisada el mismo día)._
