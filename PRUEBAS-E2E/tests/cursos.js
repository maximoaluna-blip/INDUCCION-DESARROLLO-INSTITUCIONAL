// Catalogo de cursos del target bajo prueba.
// Por defecto lo provee el globalSetup (_setup-cursos.js), que descarga el
// cursos.json del ASC_BASE_URL y lo escribe en .cursos.json -> la suite es
// AGNOSTICA DE LINEA (Adultos, PJ, DI...).
// Si no hay generado (sin red en globalSetup), se usa el fallback de Desarrollo Institucional.
const fs = require('fs');
const path = require('path');

const GENERADO = path.join(__dirname, '.cursos.json');

// Fallback: espejo de INDUCCION-DESARROLLO-INSTITUCIONAL/02-Plataforma-Web/cursos.json (status: "active").
const FALLBACK = [
  { courseId: 'bienvenida-desarrollo-institucional', file: 'bienvenida-desarrollo-institucional.html', tituloIncluye: 'Bienvenida' },
  { courseId: 'pndi-marco-y-principios', file: 'pndi-marco-y-principios.html', tituloIncluye: 'PNDI' },
  { courseId: 'niveles-y-estructura-movimiento', file: 'niveles-y-estructura-movimiento.html', tituloIncluye: 'Niveles' },
  { courseId: 'los-8-ambitos-de-gestion', file: 'los-8-ambitos-de-gestion.html', tituloIncluye: 'mbitos' },
  { courseId: 'buenas-practicas-en-tu-grupo', file: 'buenas-practicas-en-tu-grupo.html', tituloIncluye: 'Pr' },
  { courseId: 'mi-aporte-al-desarrollo-institucional', file: 'mi-aporte-al-desarrollo-institucional.html', tituloIncluye: 'Aporte' },
];

let CURSOS = FALLBACK;
try {
  if (fs.existsSync(GENERADO)) {
    const cargados = JSON.parse(fs.readFileSync(GENERADO, 'utf8'));
    if (Array.isArray(cargados) && cargados.length) CURSOS = cargados;
  }
} catch (e) {
  // JSON corrupto o ilegible: usar fallback.
}

module.exports = { CURSOS };
