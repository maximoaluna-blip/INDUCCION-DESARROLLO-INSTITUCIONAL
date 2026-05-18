# Manual: Cómo Crear un Curso o Nivel

> Manual operativo de la **Línea Desarrollo Institucional** (Asociación Scouts de Colombia).
> Documenta el proceso completo desde el diseño de un curso hasta su despliegue en producción.

---

## Trigger

Cuando el usuario diga frases como:

- *"vamos a crear el curso N de DI"*
- *"creemos el curso 2 de la línea Desarrollo Institucional"*
- *"arranquemos el nivel 2 de DI"*
- *"construyamos el módulo X"*

…seguir el proceso aquí documentado.

> 🟦 **Patrón de referencia:** el **Curso 1 (Bienvenida al Desarrollo Institucional)** ya implementado y desplegado es el ejemplo canónico. Replicarlo con las adaptaciones que pida cada curso.

---

## Tabla de contenidos

1. [Estructura de la carpeta `05-Generador-Cursos/`](#1-estructura-de-la-carpeta-05-generador-cursos)
2. [Caso A — Crear UN curso nuevo](#2-caso-a--crear-un-curso-nuevo)
3. [Caso B — Crear un NIVEL completo](#3-caso-b--crear-un-nivel-completo)
4. [Casos especiales](#4-casos-especiales)
5. [Checklist final antes de publicar](#5-checklist-final-antes-de-publicar)
6. [Filosofía de diseño](#6-filosofía-de-diseño)
7. [Tabla de referencia rápida](#7-tabla-de-referencia-rápida)

---

## 1. Estructura de la carpeta `05-Generador-Cursos/`

```
05-Generador-Cursos/
├── build-course.js                       ← Constructor JSON → HTML
├── preview-course.js                     ← Generador de preview (mockup HTML)
├── verificar-backend.js                  ← Validador pre-deploy (ver BACKEND.md)
├── course-schema.json                    ← Esquema de validación
├── course-schema.example.json            ← Ejemplo completo de curso
│
├── templates/
│   ├── styles.css                        ← CSS compartido por todos los cursos
│   └── engine.js                         ← Motor JS (registro, quizzes, photo, etc.)
│
├── borradores/                           ← JSONs fuente de cada curso
│   └── <courseId>.json
│
├── input/         (gitignored)           ← PDFs/MDs fuente para cursos nuevos
└── previews/      (gitignored)           ← HTMLs/PDFs de preview
```

### Documentos de diseño paralelos

```
INDUCCION-DESARROLLO-INSTITUCIONAL/
├── 01-Diseno-Cursos/                     ← Diseños pedagógicos (markdown) de cada curso
│   └── Curso-NN-<nombre>.md
├── Plan-de-Formacion-Linea-Desarrollo-Institucional.md  ← Plan completo de la línea (24 cursos)
├── Recomendaciones-Cowork-Diseno-Cursos.md              ← Guía para Cowork
├── BACKEND.md                                            ← Documenta el backend (Apps Script)
└── CREAR-CURSO.md                                        ← Este archivo
```

---

## 2. Caso A — Crear UN curso nuevo

### Pasos (12)

#### Fase pedagógica (Cowork)

1. **Definir el curso** en `01-Diseno-Cursos/Curso-NN-<nombre>.md` (lo trae Cowork). Debe contener:
   - Ficha (courseId, título, audiencia, duración, posición en el nivel)
   - Objetivos pedagógicos
   - Hook (frase ancla)
   - Estructura de lecciones (5-7, de 3-7 min cada una)
   - Idea central + reflexión + quiz (2 preguntas) por lección
   - Logros (5 + 1 final)
   - Conexiones cross-course (con el curso anterior y el siguiente)
2. **Revisión y aprobación** del diseño antes de codificarlo.

#### Fase técnica (Claude Code)

3. **Crear el JSON fuente** en `05-Generador-Cursos/borradores/<courseId>.json` siguiendo `course-schema.json`. Replicar el patrón de `bienvenida-desarrollo-institucional.json`.
4. **Validar JSON:**
   ```bash
   python -c "import json; json.load(open('05-Generador-Cursos/borradores/<courseId>.json', encoding='utf-8')); print('OK')"
   ```
5. **Build HTML:**
   ```bash
   node 05-Generador-Cursos/build-course.js <courseId>
   ```
6. **Preview imprimible:**
   ```bash
   node 05-Generador-Cursos/preview-course.js <courseId>
   ```
7. **Generar PDF visual** con Chrome headless:
   ```bash
   "/c/Program Files/Google/Chrome/Application/chrome.exe" --headless --disable-gpu --no-sandbox \
     --print-to-pdf="<ruta>/preview-<courseId>.pdf" --no-pdf-header-footer \
     "file:///<ruta>/preview-<courseId>.html"
   ```
8. **Revisión visual** del PDF con el dueño del proyecto.
9. **Iterar** sobre los ajustes que pida.

#### Fase de publicación

10. **Actualizar `02-Plataforma-Web/cursos.json`** agregando la entrada del curso nuevo con `status: "active"`.
11. **Verificar backend:**
    ```bash
    node 05-Generador-Cursos/verificar-backend.js
    ```
12. **Commit + push:**
    ```bash
    git add . && git commit -m "Agregar Curso N: <título>" && git push
    ```

GitHub Pages redespliega automáticamente. ~1 min después el curso está vivo.

---

## 3. Caso B — Crear un NIVEL completo

Cuando se quieren publicar varios cursos del mismo nivel a la vez.

1. Confirmar que el **Plan de Formación de la Línea Desarrollo Institucional** define los cursos del nivel.
2. Para cada curso del nivel, ejecutar los pasos 1-9 del **Caso A**.
3. **Cuando todos los cursos del nivel estén listos**, actualizar `cursos.json` en un solo commit:
   - Marcar todos los del nivel como `status: "active"`.
   - Asegurar que el orden de `cursos.json` refleja el orden pedagógico del nivel.
4. **Verificar conexiones cross-course:** que cada curso del nivel referencie al siguiente correctamente y que los componentes que dependen de otros (ej. `plan-builder` que lee perfil del Curso 5) funcionen.
5. **Pilotear el nivel completo** con 5-10 adultos antes de cerrar la fase.

---

## 4. Casos especiales

### A. Curso que reusa un componente especializado (autodiagnóstico, plan-builder)

- Cualquier curso del Nivel 1 puede usar `self-assessment` o `plan-builder` (ya están soportados por el motor — no requiere tocar `engine.js`).
- Si el componente lee datos de otro curso, usar la clave global de localStorage acordada en el proyecto (ej. `competencyProfile` para el cross-course de competencias).

### B. Curso con video

- Subir los videos a `02-Plataforma-Web/<courseId>/videos/`.
- En el JSON, usar el tipo `video` con `data-src` para lazy loading.
- Solo el módulo activo del curso carga sus videos (lazy).

### C. Curso que reemplaza a otro

- No borrar el curso viejo del repo. Mover su entrada en `cursos.json` a `status: "archived"` o `"coming-soon"`.
- Mantener el HTML por compatibilidad con enlaces externos.

---

## 5. Checklist final antes de publicar

- [ ] JSON valida contra `course-schema.json`.
- [ ] Build de HTML sin errores ni warnings.
- [ ] Preview PDF revisado y aprobado visualmente.
- [ ] `cursos.json` actualizado con la entrada del curso.
- [ ] `verificar-backend.js` retorna 4/4 OK.
- [ ] Mini-quiz tiene mínimo 2 preguntas por lección (excepto intro).
- [ ] `policy-quote` apuntan a documentos vigentes (revisar PNDI, Estatuto Nacional 2025, Plan Estratégico 2023-2026).
- [ ] Conexiones cross-course con el curso anterior y siguiente verificadas.
- [ ] Logros: 4-6 + 1 final con `unlockOnModule: -1`.
- [ ] Certificado final tiene `courseName` y `description` específicos del curso.
- [ ] Commit con mensaje descriptivo.
- [ ] Push.
- [ ] HTTP 200 al URL público del curso (`curl -I https://maximoaluna-blip.github.io/INDUCCION-DESARROLLO-INSTITUCIONAL/02-Plataforma-Web/<courseId>.html`).

---

## 6. Filosofía de diseño

- **Lecciones cortas** (3-7 min) terminables independientemente.
- **Una idea central por lección**, enunciada al inicio en un `info-box`.
- **Lenguaje conversacional**, tutea, ejemplos del día a día del grupo scout.
- **Citas oficiales** dentro de `policy-quote` plegable (la cita rigurosa no debe asustar; el flujo principal usa lenguaje accesible).
- **Reflexión personal** escrita por lección (excepto intro).
- **Mini-quiz** de 2 preguntas por lección, distractores con la idea vieja que el curso desarma.
- **Cross-course visible:** cada curso anuncia el siguiente al final.
- **Compromiso aterrizado** en cada curso (no abstracto).
- **Citas doctrinales** verificadas contra documentos vigentes — para esta línea: **PNDI 2017, Estatuto Nacional 2025, Plan Estratégico 2023-2026, Plan Trienal Mundial 2021-2024, Plan Regional Interamericano 2022-2025**.

---

## 7. Tabla de referencia rápida

| Acción | Comando |
|---|---|
| Validar JSON | `python -c "import json; json.load(open('05-Generador-Cursos/borradores/<id>.json', encoding='utf-8'))"` |
| Build HTML | `node 05-Generador-Cursos/build-course.js <courseId>` |
| Preview imprimible | `node 05-Generador-Cursos/preview-course.js <courseId>` |
| PDF visual | Chrome headless con `--print-to-pdf` (ver paso 7 del Caso A) |
| Validar backend | `node 05-Generador-Cursos/verificar-backend.js` |
| Push del backend | Ver `BACKEND.md` (clasp push -f + crear deployment nuevo desde UI) |

---

## Referencias cruzadas

- [`BACKEND.md`](BACKEND.md) — Detalles del Apps Script, sheet, deployment.
- [`Plan-de-Formacion-Linea-Desarrollo-Institucional.md`](Plan-de-Formacion-Linea-Desarrollo-Institucional.md) — Los 24 cursos planeados (4 niveles).
- [`Recomendaciones-Cowork-Diseno-Cursos.md`](Recomendaciones-Cowork-Diseno-Cursos.md) — Patrones pedagógicos a seguir.
- `01-Diseno-Cursos/Curso-01-Bienvenida-al-Desarrollo-Institucional.md` — Ejemplo canónico de diseño pedagógico.

---

_Documento operativo de la Línea Desarrollo Institucional — Asociación Scouts de Colombia._
