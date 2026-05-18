# Diseño del Curso 6 — 🗺️ Mi Aporte al Desarrollo Institucional

**Línea:** Desarrollo Institucional · **Nivel:** 1 (Fundamentación) · **Posición:** Curso 6 de 6 del Nivel 1 — **Cierre del Nivel 1**.

> Curso de cierre del Nivel 1. Convierte todo lo aprendido en un **plan personal de aporte al DI**, listo para firmar y compartir con el consejo. Usa un `plan-builder` que **lee el perfil del Curso 5** y precarga metas-tipo por dimensión, con recursos sugeridos y plazos. Termina sugiriendo 2-3 cursos del Nivel 2.

---

## 1. Ficha del curso

| Campo | Valor |
|---|---|
| `courseId` | `mi-aporte-al-desarrollo-institucional` |
| Título | Mi Aporte al Desarrollo Institucional |
| Subtítulo | Curso 6 de la Línea Desarrollo Institucional · Cierre del Nivel 1 — Fundamentación |
| Icono | 🗺️ |
| Duración | ~30 min |
| Lecciones de contenido | 6 + intro + certificado |
| Audiencia primaria | La misma de la Línea. En especial: cualquier adulto que haya cursado al menos hasta el Curso 5. |
| Pre-requisitos | Curso 5 (recomendado fuertemente — sin perfil de salud no se puede construir el plan automáticamente). |
| Logro final | "Tengo mi plan firmado" |
| Componente especial | **Plan-builder interactivo** que lee `salud-institucional-perfil` (del Curso 5) y `brujula-personal` (del Curso 2), y entrega un **PDF imprimible** del plan personal. |

---

## 2. Objetivos del curso

Al completar este curso, el adulto:

1. **Recibe** un plan precargado con base en su perfil del Curso 5 (las dimensiones más bajas se priorizan).
2. **Personaliza** las metas: elige cuáles adopta, ajusta su plazo (3 / 6 / 12 meses), añade metas propias.
3. **Identifica** los recursos sugeridos para cada meta: qué leer del repositorio ASC, qué pedir a la región, con quién hablar primero.
4. **Descarga** un PDF firmable de su plan personal para llevarlo al consejo o guardarlo como compromiso.
5. **Recibe** la sugerencia de los 2-3 cursos del Nivel 2 que más le sirven, según las dimensiones donde salió más bajo.
6. **Cierra** el Nivel 1 con un compromiso aterrizado, no abstracto.

---

## 3. Hook pedagógico

> **"El aprendizaje sin compromiso es solo entretenimiento. Hoy se vuelve compromiso."**

Se enuncia en la Lección 1, se referencia al construir cada meta en las Lecciones 3-4 y se cierra en la Lección 6 con el plan firmado.

---

## 4. Estructura de lecciones

### 4.1 Mapa general

| # | Lección | Duración | Idea central | Logro al completar |
|---|---|---|---|---|
| 1 | 👋 Bienvenida | 3 min | "El aprendizaje sin compromiso es solo entretenimiento." | Empecé el plan |
| 2 | 🔍 Tu perfil de salud — lo que dijiste de ti mismo | 4 min | El perfil del Curso 5 es el punto de partida del plan. | Veo mi perfil claro |
| 3 | 🎯 Las metas-tipo por dimensión | 7 min | Para cada dimensión hay 3-5 metas-tipo, con plazos y recursos sugeridos. | Conozco las opciones |
| 4 | 🛠️ Construye tu plan personal | 8 min | Plan-builder interactivo: priorizar, ajustar, añadir propias. | Hice mi plan |
| 5 | 🧭 Tu brújula personal en acción + sugerencia de cursos del Nivel 2 | 4 min | El principio elegido en el Curso 2 sirve como criterio de priorización. Y los cursos del Nivel 2 más útiles según tu perfil. | Conozco mi ruta de aprendizaje |
| 6 | 📜 Firma y comparte tu plan | 4 min | PDF imprimible, firma personal, opción de compartir con el consejo. | Tengo mi plan firmado |

**Total estimado: ~30 min.**

---

### 4.2 Lección 1 — 👋 Bienvenida (3 min, `isIntro: true`)

**Idea central:** "El aprendizaje sin compromiso es solo entretenimiento."

**Secciones (en orden):**

1. **`info-box`** — Tiempo estimado (~30 min) y promesa: _"Al final vas a salir con un **plan personal de aporte al DI firmado**, listo para llevar al consejo de tu grupo o región, o para guardarlo como tu compromiso personal. Sin abstracciones. Con metas, plazos y primer paso definido."_
2. **`paragraph`** — Apertura: _"Llegaste al final del Nivel 1. Atravesaste seis cursos. Aprendiste qué es DI, conociste el marco doctrinal, ubicaste los órganos, recorriste los 8 ámbitos y mediste la salud institucional de tu grupo. Pero todo eso pierde sentido si no se traduce en algo concreto que vas a hacer. Este curso es ese puente."_
3. **`paragraph`** — _"La buena noticia: **no vas a empezar de cero**. Este curso lee automáticamente tu perfil del Curso 5 (las 6 dimensiones de salud institucional que ya evaluaste) y tu brújula personal del Curso 2 (el principio que elegiste como criterio primero). A partir de ahí te propone metas concretas y tú las personalizas."_
4. **`heading` (nivel 3)** — _"Lo que vas a vivir en este curso"_
5. **`list`** — Las 5 ideas centrales de las Lecciones 2-6.
6. **`mission-box`** — _"Tip de uso: este curso es el más práctico del Nivel 1. Casi todo el tiempo vas a estar marcando, ajustando y escribiendo. Cuando salgas, vas a tener un PDF firmable. Tómate este momento en serio — el plan es para los próximos 12 meses."_

**Reflexión:** ninguna.

**Quiz:** ninguno.

**Logro al completar:** "Empecé el plan".

---

### 4.3 Lección 2 — 🔍 Tu perfil de salud — lo que dijiste de ti mismo (4 min)

**Idea central:** El perfil del Curso 5 es el punto de partida del plan. Revisarlo es el primer paso para construir sobre realidad, no sobre suposición.

**Secciones (en orden):**

1. **`info-box`** — Idea central de la lección.
2. **`paragraph`** — _"Antes de definir metas necesitas ver con claridad tu perfil. El sistema cargó automáticamente lo que respondiste en el Curso 5. Si todavía no hiciste el Curso 5, te aviso ahora — vuelve a hacerlo y regresa, porque sin perfil este curso no funciona en su versión interactiva."_
3. **`profile-display`** (componente que muestra el perfil cargado de localStorage `salud-institucional-perfil`):
    - Si hay perfil: muestra las 6 dimensiones con su grado (1-5) usando un gráfico de radar o de barras horizontales.
    - Si no hay perfil: muestra mensaje "Aún no tienes perfil guardado" con botón "Ir al Curso 5" + opción de continuar el curso de forma manual (introducir grados aquí).
4. **`heading` (nivel 3)** — _"Cómo se traduce tu perfil en prioridades"_
5. **`list`**:
    - "**Brechas críticas:** las dimensiones que marcaste en Grado 1 o 2. Son las primeras que vas a abordar."
    - "**Brechas de mejora:** las dimensiones en Grado 3. Son las que ya funcionan pero necesitan formalización."
    - "**Fortalezas:** las dimensiones en Grado 4 o 5. Tu aporte aquí es **mantener y, si estás en 5, escribir la buena práctica** para compartirla con otros grupos."
6. **`info-box`** — _"💡 Si todas tus dimensiones están en grados 2-3 (lo más típico), no intentes mejorar las 6 a la vez. Elige **máximo 3** para los próximos 12 meses. La mejora sostenida supera a la mejora dispersa."_
7. **`heading` (nivel 3)** — _"Tu brújula personal del Curso 2"_
8. **`paragraph`** — _"También cargué el principio que elegiste como brújula personal en el Curso 2. Lo vamos a usar como criterio cuando tengas que decidir el orden de tus metas — porque cuando haya empate, ese principio decide."_
9. **`brujula-display`** (componente que muestra el principio guardado de `brujula-personal`):
    - Si hay brújula: muestra el principio + la justificación que el adulto escribió.
    - Si no hay: muestra "No registramos tu brújula. Puedes definirla en el Curso 2 o seguir sin ella" + opción de elegir aquí.

**Reflexión:** _"Mirando tu perfil completo en una pantalla por primera vez: ¿qué te llama la atención? ¿Es lo que esperabas o hay alguna sorpresa? Una sola frase."_

**Quiz (2 preguntas):**

> **P1.** Las "brechas críticas" en el perfil de salud institucional son…
>
> a) _Las dimensiones marcadas en Grado 4 o 5._
> b) _Las dimensiones marcadas en Grado 1 o 2 — donde la práctica no existe o es muy informal._ ✅
> c) _Solo la dimensión más baja, sin importar el grado._

> **P2.** Si todas tus dimensiones están en grados 2-3 (situación típica), este curso recomienda…
>
> a) _Intentar mejorar las 6 dimensiones al mismo tiempo, para no demorarse._
> b) _Elegir máximo 3 dimensiones prioritarias para los próximos 12 meses, porque la mejora sostenida supera a la dispersa._ ✅
> c) _Dejarlo así, porque el grupo está en promedio._

**Logro:** "Veo mi perfil claro".

---

### 4.4 Lección 3 — 🎯 Las metas-tipo por dimensión (7 min)

**Idea central:** Para cada dimensión hay 3-5 metas-tipo, con plazos sugeridos y recursos. Las verás todas antes de elegir, para tener panorama.

**Secciones (en orden):**

1. **`info-box`** — Idea central de la lección.
2. **`paragraph`** — _"En la próxima lección vas a armar tu plan. Antes, conoce el catálogo de metas-tipo que tienes a disposición. Son **24 metas-tipo en total** (3-5 por dimensión), formuladas para que sean concretas, observables y alcanzables en 3, 6 o 12 meses."_
3. **`heading` (nivel 3)** — _"🎯 Metas-tipo de Dimensión 1 — Propósito"_
4. **`method-grid`** — 4 metas-tipo:
    - **P1 (3 meses):** _"Revisar y actualizar el Plan de Grupo vigente — convocar al consejo a una sesión específica de revisión."_ → Recursos: el Plan de Grupo actual + Curso 8 Nivel 2 (Planeación) cuando esté disponible. Hablar con: Presidente del Consejo.
    - **P2 (6 meses):** _"Construir el Plan de Grupo si no existe — 5 pasos según marco PNDI y herramientas oficiales."_ → Recursos: Manual del Plan de Grupo del Plan Regional + Curso 8. Hablar con: Comisionado Regional de DI.
    - **P3 (12 meses):** _"Lograr que el Plan de Grupo sea conocido por el 80 % de los dirigentes — taller de inducción al Plan."_ → Recursos: Plan firmado + tiempo de reunión. Hablar con: Jefe de Grupo.
    - **P4 (3 meses):** _"Hacer un mural visible en la sede con la misión, visión y los principales objetivos del año."_ → Recursos: cartulina, marcadores, una tarde de trabajo. Hablar con: Equipo de Jefatura.
5. **`heading` (nivel 3)** — _"🏛️ Metas-tipo de Dimensión 2 — Gobernanza"_
6. **`method-grid`** — 4 metas-tipo:
    - **G1 (3 meses):** _"Implementar firma de acta al cierre de cada reunión del consejo — antes de salir, todos firman."_ → Recursos: formato de acta. Hablar con: Secretario del Consejo.
    - **G2 (6 meses):** _"Migrar todas las actas históricas a una carpeta compartida (Drive o equivalente) con nomenclatura clara."_ → Recursos: cuenta de Drive o similar. Hablar con: Secretario + Presidente.
    - **G3 (3 meses):** _"Convocar formalmente al Fiscal o Revisor Fiscal a las reuniones del consejo con tema financiero — su presencia se vuelve la norma, no la excepción."_ → Recursos: agenda del consejo. Hablar con: Presidente.
    - **G4 (12 meses):** _"Construir o actualizar las Normas de Funcionamiento del Grupo (Art. 4.3.12) y aprobarlas en Asamblea — la Asamblea del próximo año."_ → Recursos: Reglamento Nacional de Grupos Scouts. Hablar con: Consejo + Asamblea.
7. **`heading` (nivel 3)** — _"⚙️ Metas-tipo de Dimensión 3 — Gestión"_
8. **`method-grid`** — 4 metas-tipo:
    - **GE1 (3 meses):** _"Abrir cuenta bancaria del grupo si no existe + sacar la plata de cuentas personales."_ → Recursos: documentación del grupo, banco. Hablar con: Tesorero + Banco.
    - **GE2 (6 meses):** _"Implementar libro contable básico (Excel o herramienta similar) con conciliación mensual."_ → Recursos: plantilla contable básica. Hablar con: Tesorero + Contador.
    - **GE3 (3 meses):** _"Inventario completo de activos (carpas, equipos, libros, herramientas) — uno solo, antes del próximo campamento."_ → Recursos: planilla de inventario. Hablar con: Intendente.
    - **GE4 (6 meses):** _"Lograr que el 100 % de los dirigentes tenga A Salvo del Peligro vigente y registrado en la planilla del grupo."_ → Recursos: cursos A Salvo del Peligro (DNDI). Hablar con: Jefe de Grupo + Equipo.
9. **`heading` (nivel 3)** — _"🤝 Metas-tipo de Dimensión 4 — Relaciones"_
10. **`method-grid`** — 4 metas-tipo:
    - **R1 (3 meses):** _"Establecer comunicación mensual con las familias — formato (boletín, mensaje, reunión) a definir."_ → Recursos: lista de familias actualizada. Hablar con: Jefe de Grupo + Comunicador del Grupo.
    - **R2 (6 meses):** _"Construir protocolo escrito de manejo de conflictos entre dirigentes — incluye quién media, en qué orden, hasta cuándo escalar."_ → Recursos: Código de Honor, Disciplinario y de Conducta (Resolución C.S.N. N° 004-22). Hablar con: Consejero del Grupo + Vicepresidente.
    - **R3 (12 meses):** _"Formalizar al menos 1 alianza con institución del barrio (parroquia, colegio, junta de acción comunal) con acuerdo escrito."_ → Recursos: carta de propuesta + acuerdo de alianza. Hablar con: Presidente del Consejo.
    - **R4 (6 meses):** _"Aplicar las encuestas de percepción del PNAM (Docs 16, 17, 18) a familias y chicos — al menos una vez al año."_ → Recursos: Formatos PNAM 16, 17, 18. Hablar con: Asesor Personal o jefes de rama.
11. **`heading` (nivel 3)** — _"📈 Metas-tipo de Dimensión 5 — Crecimiento"_
12. **`method-grid`** — 4 metas-tipo:
    - **C1 (3 meses):** _"Implementar registro mensual de ingresos y salidas de membresía — quién entra, quién se va, por qué."_ → Recursos: plantilla simple. Hablar con: Secretario + Jefes de Rama.
    - **C2 (6 meses):** _"Construir Plan de Captación anual: estrategias específicas (campaña de barrio, jornada de puertas abiertas, alianzas con colegios)."_ → Recursos: Plan de Acción de Crecimiento 2023-2026 (DNDI). Hablar con: Comisionado Regional de Crecimiento.
    - **C3 (12 meses):** _"Lograr crecimiento neto ≥ 2 % en la membresía total (KPI del Plan Regional Interamericano 2022-2025)."_ → Recursos: registro mensual + plan de captación. Hablar con: Consejo de Grupo.
    - **C4 (6 meses):** _"Habilitar el grupo en SiScout y mantenerlo al día — el registro oficial es la fuente de verdad."_ → Recursos: SiScout. Hablar con: Comisionado Regional de Crecimiento.
13. **`heading` (nivel 3)** — _"✅ Metas-tipo de Dimensión 6 — Cumplimiento"_
14. **`method-grid`** — 4 metas-tipo:
    - **CU1 (3 meses):** _"Verificar y poner al día la documentación legal del grupo: personería jurídica, RUT, declaraciones, etc."_ → Recursos: Cámara de Comercio + DIAN + Reglamento Nacional de Grupos. Hablar con: Contador + Tesorero.
    - **CU2 (3 meses):** _"Implementar protocolo de transporte en TODAS las salidas — sin excepción, sin atajos."_ → Recursos: Protocolo Nacional de Transporte (DNDI) + Lista de chequeo. Hablar con: Comisionado de Riesgo del Grupo (si existe) o Jefe.
    - **CU3 (6 meses):** _"Realizar Asamblea Anual de Grupo cumpliendo el Reglamento Nacional de Grupos Scouts — convocatoria con tiempo, quórum, actas."_ → Recursos: Reglamento Nacional de Grupos Scouts. Hablar con: Consejo de Grupo.
    - **CU4 (12 meses):** _"Realizar una autoauditoría anual de cumplimiento con base en una lista de verificación — antes de la próxima Asamblea."_ → Recursos: lista de chequeo de cumplimiento. Hablar con: Fiscal del Grupo + Consejo.

**Reflexión:** _"Mira las 24 metas-tipo. ¿Cuáles 2-3 sientes que son las primeras que deberías abordar dado tu perfil? Anótalas — las vas a usar en la siguiente lección."_

**Quiz (2 preguntas):**

> **P1.** Las metas-tipo de este catálogo están formuladas con tres atributos clave. ¿Cuáles?
>
> a) _Concretas, observables y alcanzables en 3, 6 o 12 meses._ ✅
> b) _Ambiciosas, transformadoras y para el largo plazo (5+ años)._
> c) _Generales, para que cada grupo las adapte como quiera._

> **P2.** Si tu perfil del Curso 5 marcó Dimensión Cumplimiento en Grado 1, ¿qué meta-tipo sería más sensata para empezar (3 meses)?
>
> a) _CU4 — autoauditoría anual completa antes de la próxima Asamblea._
> b) _CU1 o CU2 — verificar y poner al día la documentación legal, e implementar protocolo de transporte en TODAS las salidas. Son las brechas más críticas y se atienden primero._ ✅
> c) _Ninguna meta de Cumplimiento — primero las otras dimensiones._

**Logro:** "Conozco las opciones".

---

### 4.5 Lección 4 — 🛠️ Construye tu plan personal (8 min)

**Idea central:** Plan-builder interactivo. Priorizar, ajustar plazos, añadir metas propias. Al final tienes un plan propio guardado.

**Secciones (en orden):**

1. **`info-box`** — Idea central de la lección.
2. **`paragraph`** — _"Llegó la parte más importante. Vas a interactuar con un plan-builder que ya tiene precargado lo siguiente según tu perfil:"_
3. **`list`**:
    - "Las dimensiones del Curso 5 ordenadas de más baja (Grado 1) a más alta (Grado 5)."
    - "Para cada dimensión baja, una recomendación de 1-3 metas-tipo de las que viste en la lección anterior."
    - "Plazo sugerido: para Grado 1-2, metas de 3 meses; para Grado 3, metas de 6 meses; para Grado 4-5, metas de 12 meses o de 'mantener'."
4. **`heading` (nivel 3)** — _"🛠️ Tu plan-builder"_
5. **`plan-builder`** (componente interactivo):
    - `planId`: `plan-personal-di`
    - `preloadFromAssessment`: `salud-institucional-perfil` (lee perfil del Curso 5)
    - `preloadFromCompass`: `brujula-personal` (lee brújula del Curso 2)
    - `metaCatalog`: las 24 metas-tipo de la Lección 3
    - `fields` por meta:
        - **Adoptar / Descartar / Ajustar**
        - **Plazo:** 3 / 6 / 12 meses (preseleccionado según grado)
        - **Primer paso (esta semana):** texto libre
        - **Persona con quien hablar primero:** texto libre
        - **Señal de cumplimiento:** texto libre (qué será evidencia de que se cumplió)
    - `addCustomGoal`: el adulto puede añadir hasta 3 metas propias (no de las 24 del catálogo).
    - `maxAdoptedGoals`: 5 metas en total (recomendación del marco — no más).
    - `resultStorageKey`: `plan-personal-di`
    - `buttonLabel`: "Guardar mi plan"
6. **`info-box`** — _"💡 Recomendación: si te cuesta elegir entre dos metas, **usa tu brújula personal del Curso 2** como desempate. El principio que elegiste decide. Por ejemplo: si tu brújula es 'Participación Juvenil', priorizá metas que involucren a los chicos en la decisión (como C4 SiScout con la patrulla, o R1 comunicación con familias)."_
7. **`heading` (nivel 3)** — _"🧮 La regla del plan: máximo 5 metas"_
8. **`paragraph`** — _"Un plan con 10 metas es un plan que nadie cumple. Un plan con 3-5 metas bien escogidas es un plan que cambia tu grupo. La diferencia entre 5 y 10 no es 'el doble de logros' — es 'la mitad del foco'. **Quédate con 5 máximo. Las otras 19 metas estarán esperándote el año entrante.**"_

**Reflexión:** _"Después de hacer tu plan, mira tus 3-5 metas elegidas. ¿Cuál es la que sientes que más te emociona o más miedo te da hacer? Esa probablemente es la que más importa. Coméntalo en una frase."_

**Quiz (2 preguntas):**

> **P1.** ¿Cuántas metas máximo recomienda este curso adoptar en el plan personal?
>
> a) _10, para no quedarse corto._
> b) _Máximo 5 — la diferencia entre 5 y 10 no es el doble de logros sino la mitad del foco._ ✅
> c) _Todas las 24 metas-tipo._

> **P2.** Para cada meta adoptada, el plan-builder te pide definir cuatro cosas: adopción/ajuste, plazo, **primer paso esta semana**, persona con quien hablar primero, y…
>
> a) _Costo en pesos colombianos._
> b) _Señal de cumplimiento — qué será evidencia de que se cumplió._ ✅
> c) _Nombre del reemplazo si fallas._

**Logro:** "Hice mi plan".

---

### 4.6 Lección 5 — 🧭 Tu brújula personal en acción + sugerencia de cursos del Nivel 2 (4 min)

**Idea central:** El principio elegido en el Curso 2 sirve como criterio de priorización. Y según tu perfil del Curso 5, hay 2-3 cursos del Nivel 2 especialmente útiles.

**Secciones (en orden):**

1. **`info-box`** — Idea central de la lección.
2. **`heading` (nivel 3)** — _"🧭 Tu brújula personal aplicada"_
3. **`paragraph`** — _"En el Curso 2 elegiste un principio del DI como tu brújula personal. Ahora ese principio toma rol de criterio: cuando tengas un dilema entre dos metas, o entre una meta y otra prioridad del grupo, ese principio decide."_
4. **`brujula-action`** (componente que toma el principio guardado y muestra ejemplos aplicados):
    - Si la brújula es **Participación Juvenil**: _"Tu criterio será priorizar metas que involucren a los chicos en las decisiones. Por ejemplo: en C2 (Plan de Captación) involucrá al clan; en R1 (comunicación con familias) usá un boletín hecho con los rovers."_
    - Si es **Normatividad**: _"Tu criterio será cuidar el cumplimiento del marco legal y reglamentario. CU1, CU2, CU3 saltan al primer lugar de tu lista."_
    - Si es **Coherencia**: _"Tu criterio será que lo que prometemos lo cumplamos. P3 (que el Plan sea conocido por el 80 %) y R1-R3 (relaciones formales con familias y barrio) van al frente."_
    - Si es **Colectividad y Consenso**: _"Tu criterio será que las decisiones sean tomadas con todos los actores. G1-G2-G3 (gobernanza con actas y Fiscal) suben en prioridad."_
    - (Y así para los 7 principios.)
5. **`heading` (nivel 3)** — _"🎒 Cursos del Nivel 2 sugeridos para ti"_
6. **`paragraph`** — _"El Nivel 2 de esta línea tiene 8 cursos, uno por ámbito de gestión. Según las dimensiones donde saliste más bajo en el Curso 5, te recomiendo estos 2-3 para empezar (cuando estén publicados):"_
7. **`courses-suggestion`** (componente que lee `salud-institucional-perfil` y sugiere cursos):
    - Si **Propósito** baja → **Curso 8 — Planeación: del Plan Estratégico al POA**.
    - Si **Gobernanza** baja → **Curso 7 — Gobernanza Práctica**.
    - Si **Gestión** baja (financiera) → **Curso 10 — Finanzas Sanas: Presupuesto y Tesorería**.
    - Si **Gestión** baja (general) → **Curso 9 — Administración del Grupo**.
    - Si **Crecimiento** baja → **Curso 13 — Crecimiento y Sistema de Información**.
    - Si **Cumplimiento** baja (riesgo) → **Curso 14 — Gestión del Riesgo**.
    - Si **Relaciones** baja → **Curso 12 — Comunicaciones y Relaciones Interinstitucionales**.
    - Si todo en 4-5 → sugerir Curso 22 (Buenas Prácticas Institucionales) del Nivel 4: _"Tu grupo es referencia. Considera documentar y compartir tu buena práctica."_
8. **`info-box`** — _"📅 Disclaimer: los Cursos 7-14 del Nivel 2 están actualmente en construcción. Esta sugerencia te orienta para cuando estén disponibles. Por ahora, los materiales fuente (PNDI 2017, Plan Regional 2022-2025, Manual de Estímulos, etc.) están en [scout.org.co/biblioteca](https://scout.org.co/biblioteca)."_

**Reflexión:** _"Mira las 1-3 sugerencias de cursos del Nivel 2 que te aparecieron. ¿Cuál tomarías primero cuando estén disponibles? ¿Por qué?"_

**Quiz (2 preguntas):**

> **P1.** Tu brújula personal del Curso 2 sirve principalmente para…
>
> a) _Memorizar el principio que más te guste._
> b) _Tener un criterio claro para decidir cuando tengas un dilema entre dos metas o entre el plan y otra prioridad del grupo._ ✅
> c) _Demostrar que conoces los 7 principios._

> **P2.** Si en el Curso 5 marcaste Gobernanza en Grado 2, este curso te sugiere empezar en el Nivel 2 con…
>
> a) _Curso 13 — Crecimiento y Sistema de Información._
> b) _Curso 7 — Gobernanza Práctica._ ✅
> c) _Curso 14 — Gestión del Riesgo._

**Logro:** "Conozco mi ruta de aprendizaje".

---

### 4.7 Lección 6 — 📜 Firma y comparte tu plan (4 min)

**Idea central:** PDF imprimible, firma personal, opción de compartir con el consejo. Cierre del Nivel 1.

**Secciones (en orden):**

1. **`info-box`** — Idea central de la lección.
2. **`paragraph`** — _"Llegaste al final del Nivel 1 de la Línea Desarrollo Institucional. Empezaste preguntándote qué tenía que ver el DI contigo. Sales con 5 metas concretas, plazos, primeros pasos definidos, y un mapa de cursos para seguir aprendiendo. Falta una sola cosa: firmar."_
3. **`heading` (nivel 3)** — _"📜 Generá tu PDF firmable"_
4. **`pdf-generator`** (componente que arma el PDF del plan):
    - Encabezado: nombre del adulto + grupo o región + fecha.
    - Sección 1: el perfil de salud institucional (las 6 dimensiones con su grado).
    - Sección 2: la brújula personal (principio elegido + justificación).
    - Sección 3: las 5 metas adoptadas con todos sus campos (plazo, primer paso, persona, señal de cumplimiento).
    - Sección 4: los 2-3 cursos del Nivel 2 sugeridos.
    - Sección 5: espacio para firma personal + opcional firma del Presidente del Consejo de Grupo.
    - Footer: enlace al curso para revisar el plan dentro de 6 meses.
    - Botón: **"Descargar mi plan en PDF"**.
5. **`heading` (nivel 3)** — _"🤝 Compartir con tu consejo"_
6. **`paragraph`** — _"Una buena práctica de muchos adultos del Movimiento: llevar este plan a una reunión del consejo de grupo o regional. No para que sea aprobado (es tu plan personal), sino para hacerlo público dentro del equipo. Cuando otros lo conocen, se vuelve más fácil de cumplir — porque te van a preguntar."_
7. **`info-box`** — _"💡 Si tu Presidente del Consejo está de acuerdo, puedes pedirle que firme el plan como testigo. No te genera obligación contractual, pero sí compromiso público dentro del equipo. Es un gesto fuerte."_
8. **`heading` (nivel 3)** — _"🎯 Cierre del Nivel 1"_
9. **`paragraph`** — _"Estás cerrando 6 cursos en los que pasaste de 'el DI es asunto ajeno' a 'tengo un plan personal con metas claras'. Ese es el viaje del Nivel 1. Lo que viene en el Nivel 2 es profundizar por ámbito (8 cursos). En el Nivel 3 especializarte por cargo (6 cursos). En el Nivel 4 abordar los transversales (4 cursos). Es un camino — y acaba de empezar."_
10. **`blockquote`** — _"El aprendizaje sin compromiso es solo entretenimiento. Hoy tu aprendizaje se volvió compromiso firmado. Bienvenido al equipo de los que sostienen — con plan en mano."_
11. **`info-box`** — _"🗓️ **Próximo paso natural:** poné en tu calendario una alerta dentro de 3 meses para revisar tu plan. ¿Cuáles metas avanzaron? ¿Cuáles se atrasaron y por qué? Eso es Desarrollo Institucional aplicado a ti mismo."_

**Reflexión:** _"Escribe tu compromiso final en una frase: 'Yo, ___, me comprometo con estas ___ metas en los próximos 12 meses por la salud institucional de ___ (mi grupo / mi región / mi consejo).' Esta frase queda guardada en tu certificado del Nivel 1."_

**Quiz (2 preguntas):**

> **P1.** El PDF que generas en este curso incluye…
>
> a) _Solo tu perfil del Curso 5._
> b) _Tu perfil + tu brújula + las 5 metas adoptadas + los 2-3 cursos del Nivel 2 sugeridos + espacio para firma personal y del Presidente del Consejo._ ✅
> c) _Solo las metas, sin perfil ni cursos sugeridos._

> **P2.** Una buena práctica final que sugiere este curso para fortalecer el cumplimiento del plan es…
>
> a) _Guardarlo solo para uno mismo, sin que nadie más lo sepa._
> b) _Llevarlo al consejo de grupo o regional para hacerlo público dentro del equipo — porque cuando otros lo conocen, se vuelve más fácil de cumplir._ ✅
> c) _Subirlo a redes sociales con foto del firmante._

**Logro al completar:** "Tengo mi plan firmado" (logro final del curso y del Nivel 1, `unlockOnModule: -1`).

---

## 5. Logros (achievements)

| ID | Nombre | Emoji | Desbloqueo |
|---|---|---|---|
| `achievement-1` | Empecé el plan | 👋 | Al completar Lección 1 |
| `achievement-2` | Veo mi perfil claro | 🔍 | Al completar Lección 2 |
| `achievement-3` | Conozco las opciones | 🎯 | Al completar Lección 3 |
| `achievement-4` | Hice mi plan | 🛠️ | Al completar Lección 4 |
| `achievement-5` | Conozco mi ruta de aprendizaje | 🧭 | Al completar Lección 5 |
| `achievement-final` | Tengo mi plan firmado | 🗺️ | Al completar el curso (`unlockOnModule: -1`) |
| `achievement-nivel-1-completo` | **Fundamento Institucional ASC** | 🏛️ | Logro especial que reconoce haber completado los 6 cursos del Nivel 1 (cross-curso). |

---

## 6. Conexiones cross-course

### 6.1 Hacia atrás — lectura activa de datos guardados

- **Lee `salud-institucional-perfil`** (Curso 5) → muestra perfil + precarga metas-tipo por dimensión baja.
- **Lee `brujula-personal`** (Curso 2) → muestra brújula + aplica como criterio de priorización en L5.
- **Recoge intuición de ámbitos prioritarios** (Curso 4 L6) → cruza con perfil de Curso 5 para contraste.
- **Compromiso inicial del Curso 1 L6** (mencionado opcionalmente) → si el adulto lo tenía guardado, puede integrarse como una meta más.

### 6.2 Hacia adelante

- **Lección 5 → Cursos 7-14 del Nivel 2:** sugiere cursos específicos según perfil del adulto.
- **Lección 6 → Curso 22 del Nivel 4 (Buenas Prácticas):** quienes salieron en grados 4-5 son invitados a documentar buena práctica.
- **PDF firmado:** queda como compromiso revisable a 3, 6 y 12 meses.

### 6.3 Cross-línea

- El **plan-builder** usa la misma mecánica que el Plan Personal de Desarrollo del Curso 5 de la Línea Política de Adultos. Quien hizo aquel reconoce el formato. Ambos planes pueden mostrarse juntos en el dashboard del adulto.

---

## 7. Tipos de sección utilizados

| Tipo | Lecciones donde aparece |
|---|---|
| `info-box` | L1, L2, L3, L4, L5, L6 (todas) |
| `paragraph` | Todas |
| `heading` (nivel 3) | L2, L3, L4, L5, L6 |
| `list` | L1, L2, L4 |
| `method-grid` | L3 (6 grids, una por dimensión, con 4 metas-tipo cada una = 24 metas-tipo en total) |
| `mission-box` | L1 |
| `blockquote` | L6 |
| **`profile-display`** | **L2 — muestra perfil leyendo `salud-institucional-perfil`** |
| **`brujula-display`** | **L2 — muestra brújula leyendo `brujula-personal`** |
| **`plan-builder`** | **L4 — componente especial con catálogo de 24 metas-tipo, preselección por perfil, hasta 5 metas adoptadas, persistencia en `plan-personal-di`** |
| **`brujula-action`** | **L5 — sugerencias contextuales según brújula elegida** |
| **`courses-suggestion`** | **L5 — sugiere cursos del Nivel 2 según perfil del Curso 5** |
| **`pdf-generator`** | **L6 — genera PDF firmable con perfil + brújula + metas + cursos sugeridos + espacio firma** |
| `reflection` | L2, L3, L4, L5, L6 (excepto L1 intro) |
| `quiz` | L2, L3, L4, L5, L6 (excepto L1 intro) |

**Componentes especiales requeridos:**

| Componente | ¿Ya soportado por el motor? | Notas para Claude Code |
|---|---|---|
| `profile-display` | Probablemente sí (similar a competencias en Política de Adultos) | Confirmar y reutilizar |
| `brujula-display` | Probablemente nuevo | Implementar como display simple de texto guardado |
| `plan-builder` | Probablemente sí (similar a Plan Personal de Política de Adultos) | Adaptar para leer perfil del Curso 5 y catálogo de metas-tipo |
| `brujula-action` | Nuevo | Lógica condicional según valor guardado |
| `courses-suggestion` | Nuevo | Lógica condicional según perfil |
| `pdf-generator` | Probablemente sí (los certificados ya se generan en PDF) | Adaptar template para incluir todas las secciones |

⚠️ Si algún componente requiere implementación nueva en el motor, esto puede ser el primer caso en el Nivel 1 que tocque `engine.js`. Claude Code lo evalúa al traducir a JSON.

---

## 8. Validación contra el marco metodológico

| Criterio | Cumplimiento |
|---|---|
| Curso entre 20 y 40 min | ✅ ~30 min |
| Lecciones de 3–8 min | ✅ rango 3–8 min |
| Cada lección termina independiente | ✅ |
| Lenguaje conversacional, tutea | ✅ |
| Citas oficiales plegables (`policy-quote`) | ➖ Este curso no incluye citas porque su naturaleza es aplicativa, no doctrinal. Las citas están en los Cursos 1-5. |
| Reflexión personal por lección | ✅ excepto intro |
| Mini-quiz 2 preguntas | ✅ |
| 4–6 logros + 1 final + logro especial de cierre Nivel 1 | ✅ 5 + 1 + 1 especial |
| L1 marcada `isIntro: true` sin quiz | ✅ |
| Conexión cross-course | ✅ con Cursos 1, 2, 4, 5 (lectura activa), 7-14 (Nivel 2 sugeridos), 22, y Línea Política de Adultos |
| Hook por curso, repetible | ✅ "El aprendizaje sin compromiso es solo entretenimiento." |

---

## 9. Riesgo señalado y antídoto aplicado

| Riesgo (según Recomendaciones-Cowork) | Antídoto aplicado |
|---|---|
| "Riesgo de quedarse en 'compromiso vacío'" | **24 metas-tipo** (4 por dimensión × 6 dimensiones) con plazo (3/6/12 meses), **recursos sugeridos** (qué leer, qué pedir, con quién hablar) y **señal de cumplimiento** obligatoria por meta. Plan-builder fuerza al adulto a definir el **primer paso esta semana** — no puede dejarlo abstracto. Máximo 5 metas para forzar foco. PDF firmable lleva el compromiso fuera de la pantalla. |

---

## 10. Próximos pasos

1. Revisar este diseño con el dueño del proyecto.
2. Claude Code traduce a JSON en `05-Generador-Cursos/borradores/mi-aporte-al-desarrollo-institucional.json` — **atención especial a los 6 componentes interactivos**.
3. Si algún componente requiere implementación en `engine.js`, documentar y construir.
4. `node build-course.js mi-aporte-al-desarrollo-institucional`.
5. Generar preview PDF y probar el plan-builder completo.
6. Actualizar `02-Plataforma-Web/cursos.json`.
7. Commit + push.
8. **Cierre del Nivel 1 — pilotar el Nivel 1 completo (6 cursos) con 5-10 adultos antes de pasar al Nivel 2.**

---

_Documento de diseño del Curso 6, versión inicial — 18 de mayo de 2026. Diseñado por Cowork siguiendo el patrón del Curso 1 y las pautas del documento `Recomendaciones-Cowork-Diseno-Cursos.md`. Este es el curso de cierre del Nivel 1; convierte el aprendizaje teórico de los Cursos 1-5 en compromiso firmado y plan ejecutable. Catálogo de 24 metas-tipo con plazos y recursos, plan-builder que lee datos del Curso 5 y Curso 2, PDF firmable como entregable final._
