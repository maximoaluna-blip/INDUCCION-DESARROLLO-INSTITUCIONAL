# Recomendaciones para Cowork — Diseño de los siguientes cursos

**Línea Desarrollo Institucional · Nivel 1**
**Versión:** 10 de mayo de 2026
**Basado en:** retrospectiva del Curso 1 (Bienvenida al Desarrollo Institucional) ya implementado y desplegado en piloto.

---

## 1. Propósito de este documento

Este documento es la guía operativa para que **Cowork** (Claude del chat/proyecto que diseña pedagógicamente los cursos) tenga claridad sobre qué entregar y qué no, al construir los Cursos 2–6 del Nivel 1 — y por extensión, los cursos del Nivel 2 en adelante de la Línea Desarrollo Institucional.

El supuesto es la división de roles ya acordada:

- **Cowork** diseña pedagógicamente: hook, lecciones, ejemplos, reflexiones, quizzes, ideas centrales, tono.
- **Claude Code** traduce a JSON, mapea a section types del motor, hace build/preview, despliega, ajusta.

---

## 2. Patrones del Curso 1 que funcionaron y vale la pena replicar

### 2.1 Hook de una frase, repetible

En el Curso 1, el hook fue:

> *"Desarrollo Institucional no es lo que hacen los de arriba mientras nosotros trabajamos con los chicos. Es lo que hacemos cada vez que cuidamos que el grupo dure, funcione y crezca con bien. Nadie se libra."*

**Recomendación:** cada curso necesita **un hook así** — una sola frase potente que se enuncie en la intro, se referencie a lo largo del curso, y cierre el último módulo. Es el ancla emocional del curso.

### 2.2 Anti-definición antes de la definición técnica

Citar textualmente la PNDI o el Estatuto Nacional en seco asusta y aleja. El truco que funcionó:

1. **Anti-definición:** *"Si abres la PNDI vas a leer X. Es exacto pero pesado."*
2. **Ejemplos cotidianos** del grupo scout que ilustran el concepto.
3. **Cita oficial textual** dentro de un `policy-quote` plegable (el lector decide si entra al detalle).
4. **Reformulación accesible:** *"En palabras simples, esto es…"*

**Recomendación:** mantener ese orden en todos los cursos. Las citas oficiales son insumo, no contenido principal.

### 2.3 Estructura interna de cada lección

Toda lección de contenido sigue esta receta:

| Bloque | Contenido | Quién lo escribe |
|---|---|---|
| 1 — Anclaje | Tiempo estimado + idea central en 1 frase | Cowork |
| 2 — Desarrollo | 200–400 palabras, prosa práctica con ejemplos | Cowork |
| 3 — Cita oficial (cuando aplica) | Texto literal del documento doctrinal | Cowork |
| 4 — Reformulación accesible | "En simple, esto significa..." | Cowork |
| 5 — Reflexión personal | Pregunta aterrizada al grupo o región del adulto | Cowork |
| 6 — Mini-quiz | 2 preguntas, 3 opciones cada una, distractores con la idea vieja | Cowork |
| 7 — Logro al completar | Frase de 2-4 palabras | Cowork |

Lo que viene después (tipo de sección visual, colores, IDs, layout) lo monta Claude Code. **No es responsabilidad de Cowork.**

### 2.4 Reflexiones que aterrizan en realidad concreta

Lo que funcionó: *"Mira tu grupo o región. Escribe DOS cosas que ya están haciendo bien en términos de DI y UNA cosa que sospechas que está floja. Sé específico — no 'mejorar finanzas' sino 'no tenemos libro contable al día'."*

Lo que no funciona: *"Reflexiona sobre el liderazgo en tu grupo."*

**Recomendación:** toda reflexión debe forzar al adulto a pensar en **un caso concreto** que conoce. Si la respuesta puede ser genérica, la pregunta está mal hecha.

### 2.5 Quiz que enseña, no que castiga

Las 2 preguntas de cada lección **no son evaluación** — son ancla del concepto. Cada distractor debería ser plausible: idealmente, **uno de los distractores debe ser la idea vieja que el curso está tratando de desarmar**.

Ejemplo del Curso 1:

> *"En el grupo nadie firma las actas porque 'ya alguien lo hará'. Después, nadie recuerda qué se decidió. ¿Qué mito están viviendo?"*
> a) Mito 1 — eso es trabajo de los comisionados
> b) **Mito 4 — eso ya lo hace alguien más ✅**
> c) Mito 5 — para eso hay que ser experto

**Recomendación:** diseñar las preguntas pensando *"¿qué quiero que recuerden en 6 meses?"* — no *"¿qué leyeron en este párrafo?"*.

---

## 3. Qué NO necesita pensar Cowork

Para evitar fricción, estas decisiones las toma Claude Code:

- Tipos de sección del motor (`info-box`, `method-grid`, `timeline`, `policy-quote`, `photo-upload`, `self-assessment`, `plan-builder`, etc.).
- Colores, bordes, layout visual.
- Estructura JSON, esquema, IDs de logros, `unlockOnModule`.
- Mecánica de los `photo-upload` y los `plan-builder` (Cowork solo dice "aquí va una foto del grupo saludable ideal" o "aquí va un plan-builder con 3 metas").
- Encabezados de quiz, etiquetas de botones, copy de UI.
- Conexiones técnicas cross-course (qué clave de localStorage lee qué).

**Cowork escribe libre.** Markdown, prosa corrida, outline, viñetas — lo que sea más cómodo. Claude Code traduce.

---

## 4. Riesgos y recomendaciones por curso del Nivel 1

### 4.1 Mapa rápido

| Curso | Riesgo principal | Antídoto que se le pide a Cowork |
|---|---|---|
| **2 — PNDI Marco y Principios** | Sonar a clase de derecho. | Cada uno de los 4 fundamentos y 7 principios con **un ejemplo del grupo scout**, no una definición. Citas textuales solo en `policy-quote` plegable. |
| **3 — Niveles y Estructura** | Reuso del cuento "Todo el mundo, Alguien, Cualquiera y Nadie" — ya está en el Mito 4 del Curso 1. | **Otro hook narrativo** (caso real, anécdota de Flor de Lis II, ejemplo de un grupo concreto). El cuento puede mencionarse pero no debe ser el ancla del curso. |
| **4 — Los 8 Ámbitos** | Es el más denso. Riesgo de "manual de oficina". | **Un mini-caso por ámbito** (8 micro-historias breves, una por sub-tema). Claude Code las monta como `method-grid` o `timeline`. Sin casos, este curso se vuelve enciclopédico. |
| **5 — Salud Institucional + Autodiagnóstico** | Es el más técnico del Nivel 1. | Cowork debe diseñar **las 6 dimensiones con 3–5 grados cada una**, con criterios observables. Plantilla: *"Grado 1: no existe / Grado 3: ocurre pero sin método / Grado 5: sistemático y documentado"*. Claude Code lo monta como `self-assessment`. |
| **6 — Mi Aporte al DI** | Riesgo de quedarse en "compromiso vacío". | **3–5 metas-tipo por dimensión** del Curso 5, con **recursos sugeridos** (qué leer, qué pedir, con quién hablar). Claude Code lo monta como `plan-builder` que precarga el perfil del Curso 5. |

### 4.2 Curso 2 — PNDI Marco y Principios — detalle

- **4 fundamentos:** Democracia · Entorno y Vigencia · Servicio y Apoyo (Integralidad) · Orientación a Resultados e Impacto.
- **7 principios:** Normatividad · Colectividad y Consenso · Dinamismo y Flexibilidad · Aspiracional y Transformacional · Coherencia · Prospectiva · Participación Juvenil.
- **3 tipos de sujetos:** Grupos · Regiones · Nación, organizados en 3 tipos de organismos (gobierno, operación, control).

**Pidan a Cowork:** un ejemplo concreto por cada uno de los 4 fundamentos y los 7 principios. No definir el principio en abstracto — narrar un grupo (real o plausible) donde se cumple, y otro donde se viola.

### 4.3 Curso 3 — Niveles y Estructura — detalle

- **5 niveles OMMS:** Mundial · Interamericano · Nacional · Regional · Local.
- **3 órganos por nivel:** gobierno · operación · control.
- **Diferencias importantes:**
  - **Nivel regional:** el órgano de control es la **Revisoría Fiscal** (Revisor Fiscal + Suplente), no una Comisión de Vigilancia.
  - **Nivel nacional:** sí existen Comisión Nacional de Vigilancia y Control + Corte de Honor Nacional.
  - **Nivel grupo:** "buenas prácticas de control internas" (libro de actas, libro contable, soportes), no un órgano formal.

**Pidan a Cowork:** un mapa visual de esta matriz 5×3 con un ejemplo concreto por celda (qué hace cada órgano en cada nivel) y, en cada nivel, **un caso de error institucional típico** y **cómo se previene**.

### 4.4 Curso 4 — Los 8 Ámbitos — detalle

Los 8 ámbitos PNDI 2017 son: Gobernanza · Administración · Recursos Económicos · Comunicaciones e Interinstitucionales · Relaciones Internacionales · Crecimiento y Sistema de Información · Gestión del Riesgo · Control y Reconocimiento.

**Pidan a Cowork:** una micro-historia por ámbito (3–4 frases máximo), de un grupo real (con detalles cambiados) donde ese ámbito se ve operando bien o falla notoriamente. **8 historias, no 8 definiciones.**

### 4.5 Curso 5 — Salud Institucional — detalle

Las 6 dimensiones: Propósito · Gobernanza · Gestión · Relaciones · Crecimiento · Cumplimiento (ya enunciadas en la L4 del Curso 1).

**Pidan a Cowork** la rúbrica de cada dimensión:

```
Dimensión X — [nombre]
Pregunta clave: "¿cómo está mi grupo en X?"

Grado 1 — [criterio observable: no existe]
Grado 2 — [criterio observable: ocurre informalmente]
Grado 3 — [criterio observable: ocurre con método pero sin documentar]
Grado 4 — [criterio observable: documentado y revisado]
Grado 5 — [criterio observable: sistemático, mejorado y replicado]
```

Cada grado debe ser **observable** (alguien externo podría verificarlo) y **escalable** (un grupo va naturalmente del 1 al 5).

### 4.6 Curso 6 — Mi Aporte al DI — detalle

Es el cierre del Nivel 1. Debe leer el perfil resultado del Curso 5 y precargarlo en un `plan-builder`.

**Pidan a Cowork** que diseñe, para cada una de las 6 dimensiones de salud:

1. **3–5 metas-tipo** que un adulto podría adoptar si esa dimensión salió baja (ej.: *"En 3 meses, mi grupo tendrá un libro de actas firmado al cierre de cada reunión"*).
2. **Recursos sugeridos** para cada meta (qué leer del repositorio ASC, qué pedirle a la región, con quién en el consejo hablar primero).
3. **Plazos típicos** (3 / 6 / 12 meses) según complejidad.

Claude Code lo monta como `plan-builder` que el adulto puede personalizar.

---

## 5. Hilos cross-course que deben quedar amarrados

Cada curso del Nivel 1 cierra con un anuncio del siguiente (1–2 frases). En particular:

- **Última lección del Curso 4** debe decir: *"En el Curso 5 vas a evaluar tu grupo o región con estas 6 dimensiones."*
- **Última lección del Curso 5** debe decir: *"En el Curso 6 vas a convertir tu perfil en un plan personal listo para firmar y compartir con tu consejo."*
- **Última lección del Curso 6** debe sugerir **2–3 cursos del Nivel 2** según las dimensiones donde el adulto salió más bajo. Por ejemplo: si "Gestión" salió baja → sugerir Curso 10 (Finanzas Sanas); si "Crecimiento" salió bajo → Curso 13.

---

## 6. Cómo entregarme el contenido

Cuando un curso esté completo en Cowork, **tráelo todo de una vez** (las 6 lecciones, intro, reflexiones, quizzes, achievements y descripción del certificado). No por lecciones sueltas.

Beneficios:

- Voy una sola vez por mapeo a section types.
- Hago un solo preview PDF.
- Mejor coherencia de tono entre lecciones.
- Si hay ajustes globales (longitud, lenguaje), los aplico una vez.

**Formato libre.** Puede ser markdown, prosa corrida, outline, lista de bullets. Yo organizo.

Si falta algo (por ejemplo, una pregunta de quiz para una lección, una reflexión), lo señalo y te propongo opciones para validación.

---

## 7. Glosario rápido para Cowork

| Término del proyecto | Qué significa |
|---|---|
| **Línea** | Una de las 4 líneas formativas del portal: Política de Adultos, Programa de Jóvenes, **Desarrollo Institucional**, Políticas Transversales. |
| **Nivel** | Cada línea tiene 4 niveles. En DI: Fundamentación (1), Profundización por ámbito (2), Especialización por cargo (3), Transversales (4). |
| **Curso** | Una unidad formativa de 20–35 min, 5–7 lecciones cortas. |
| **Lección** | Bloque de 3–8 minutos con una idea central, reflexión y mini-quiz. |
| **Hito pedagógico** | El "aha moment" que la lección busca producir en el adulto. |
| **Hook** | La frase clave que abre y cierra el curso. |
| **Plan-builder** | Componente interactivo donde el adulto arma su plan personal. |
| **Self-assessment** | Autodiagnóstico interactivo con dimensiones y grados. |
| **Policy-quote** | Cita textual de un documento oficial, plegable por defecto. |
| **Photo-upload** | Espacio para subir un dibujo o imagen del adulto (se guarda en su navegador). |
| **Achievement** | Logro que se desbloquea al completar una lección o un curso. |
| **Cross-course** | Conexión técnica entre cursos (el resultado de uno alimenta al siguiente). |

---

## 8. Resumen ejecutivo en 5 puntos

1. **Hook por curso.** Una frase. Repetible.
2. **Ejemplos antes que definiciones.** Cita oficial plegable, no enfrente.
3. **Reflexiones aterrizadas.** Forzar a pensar en un caso concreto.
4. **Quizzes que enseñan.** Distractores con la idea vieja.
5. **Entregar el curso completo, no por pedazos.** Yo lo traduzco una sola vez.

---

_Documento de coordinación entre Cowork y Claude Code para el desarrollo de la Línea Desarrollo Institucional, derivado de la retrospectiva del Curso 1. Sujeto a iteración tras el piloto._
