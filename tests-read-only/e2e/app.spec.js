// @ts-check
import { test, expect } from '@playwright/test';

test.describe('Pagina interraciones', () => {

  const sortOptions = { asc: 'asc', desc: 'desc'};
  const liSelector = '#root > ul > li';

  const getItempropValues = async (page, property) => {
    const liElements = await page.$$(liSelector);
    const values = await Promise.all(liElements.map(async li => {
      const value = await li.$eval(`[itemprop=${property}]`, (el) => el.textContent);
      return value;
    }));
    return values;
  };

  const getDataIds = (elements) => Promise.all(elements.map(async (el) => await el.getAttribute('data-id')));  

  test.describe('sort', () => {

    let selectSort, orderProperty;
  
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/');
      selectSort = await page.locator('#select-sort');
      orderProperty = await selectSort.getAttribute('name');
    });

    test('de ascendente "asc" a descendente "desc"', async ({ page }) => {
      await selectSort.selectOption(sortOptions.asc); 
      const sortedValuesAsc = await getItempropValues(page, orderProperty);

      await selectSort.selectOption(sortOptions.desc);
      const sortedValuesDesc = await getItempropValues(page, orderProperty);

      expect(sortedValuesDesc).toEqual(sortedValuesAsc.reverse());
    });

    test('de descendente "desc" a ascendente "asc"', async ({ page }) => {
      await selectSort.selectOption(sortOptions.desc); // value desc
      const sortedValuesDesc = await getItempropValues(page, orderProperty);

      await selectSort.selectOption(sortOptions.asc);
      const sortedValuesAsc = await getItempropValues(page, orderProperty);

      expect(sortedValuesAsc).toEqual(sortedValuesDesc.reverse());
    });
  });

  test.describe('filter', () => {

    let selectFilter, filterProperty;

    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/');
      selectFilter = await page.$('#select-filter');
      filterProperty = await selectFilter.getAttribute('name');
    });

    test(`cuando elige un filter a otro los resultados se cambian`, async ({ page }) => {
      await selectFilter.selectOption({ index: 1 });
      const originalLis = await page.$$(liSelector);
      const originalIds = await getDataIds(originalLis);

      await selectFilter.selectOption({ index: 2 });
      const currentLis = await page.$$(liSelector);
      const currentIds = await getDataIds(currentLis)
      expect(originalIds).not.toEqual(currentIds);
    });
  });

  test.describe('sort + filter', () => {

    let selectSort, sortProperty, selectFilter, filterProperty;

    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000/');

      selectFilter = await page.$('#select-filter');
      filterProperty = await selectFilter.getAttribute('name');

      selectSort = await page.locator('#select-sort');
      sortProperty = await selectSort.getAttribute('name');
    });

    test('cuando elige un filtro y un sort, los resultados son afectado de ambos', async ({ page }) => {
      await selectFilter.selectOption({ index: 1 });

      // sacamos los valores de propiedad en el orden que ocurre en la pagina
      // sin sort
      const valuesNoSorted = await getItempropValues(page, sortProperty);  

      await selectSort.selectOption(sortOptions.asc);
      const valuesSortedAsc = await getItempropValues(page, sortProperty);
  
      await selectSort.selectOption(sortOptions.desc);
      const valuesSortedDesc = await getItempropValues(page, sortProperty);

      expect(valuesSortedAsc).toEqual([...valuesNoSorted].sort());
      expect(valuesSortedDesc).toEqual([...valuesNoSorted].sort().reverse());
    });

    test('el button "button-reset" limpia los filtros y sort, volvemos a los resultados original', async ({ page }) => {
      await page.goto('http://localhost:3000/');
      const originalLis = await page.$$(liSelector);
      const select = await page.$('#select-filter');
      await select.selectOption({ index: 1 });
      const liElements = await page.$$(liSelector);
      expect(liElements.length).not.toEqual(originalLis.length); // probar si no hay mismo cantidad elementos

      const buttonReset = await page.$('#button-reset');
      await buttonReset.click();
      const clearLiElements = await page.$$(liSelector);
      expect(clearLiElements.length).toEqual(originalLis.length);
    });
  });
});
