// Migracion de la clave del catalogo de buenas practicas (ADR-034 Fase 1 B2).
//
// El catalogo lo escribe buenas-practicas-en-tu-grupo (Curso 5) y lo lee
// mi-aporte-al-desarrollo-institucional (Curso 6) a traves de getCatalogData. Hasta
// el 14-sep-2026 se guardaba bajo el catalogId a secas; ahora lleva apellido de
// linea porque las lineas comparten localStorage. Un estudiante con el catalogo ya
// guardado no puede perderlo: getCatalogData lo lee una vez y lo copia.
//
// Agnostica: descubre por el catalogo del build el primer curso que use un
// catalogo (practices-catalog) y prueba la funcion del motor directamente.
const { test, expect } = require('@playwright/test');
const { stubBackend } = require('./_backend');
const { CURSOS } = require('./cursos');

const CATALOGO = { 'ambito-1': { state: 'ok', description: 'Practica sembrada por la prueba E2E', attributes: ['a1'] } };

test('@solo-escritorio e2e: un catalogo guardado con la clave vieja migra solo', async ({ page }) => {
  await stubBackend(page);

  // Cualquier curso de la linea sirve: getCatalogData es del motor de linea y va en todos.
  let target = null;
  for (const curso of CURSOS) {
    await page.goto(curso.file, { waitUntil: 'domcontentloaded' });
    const tiene = await page.evaluate(() => typeof getCatalogData === 'function');
    if (tiene) { target = curso; break; }
  }
  test.skip(!target, 'ningun curso de la linea define getCatalogData');

  const ID = 'catalogo-buenas-practicas-grupo';
  await page.evaluate(({ ID, CATALOGO }) => {
    localStorage.removeItem('desarrollo-institucional:' + ID);
    localStorage.setItem(ID, JSON.stringify(CATALOGO));
  }, { ID, CATALOGO });

  // Lee por la funcion del motor: debe devolver el catalogo viejo y copiarlo a la clave nueva.
  const leido = await page.evaluate((ID) => getCatalogData(ID), ID);
  expect(leido).toEqual(CATALOGO);
  const nuevo = await page.evaluate((ID) => localStorage.getItem('desarrollo-institucional:' + ID), ID);
  expect(nuevo, 'catalogo copiado a la clave con apellido de linea').not.toBeNull();
  expect(JSON.parse(nuevo)).toEqual(CATALOGO);

  // Y una escritura nueva ya va SOLO a la clave con apellido.
  await page.evaluate((ID) => {
    localStorage.removeItem(ID);
    practicesCatalogs[ID] = { 'ambito-2': { state: 'ok', description: 'nuevo', attributes: [] } };
    savePracticesCatalog(ID);
  }, ID);
  expect(await page.evaluate((ID) => localStorage.getItem(ID), ID)).toBeNull();
  expect(JSON.parse(await page.evaluate((ID) => localStorage.getItem('desarrollo-institucional:' + ID), ID))).toHaveProperty('ambito-2');
});
