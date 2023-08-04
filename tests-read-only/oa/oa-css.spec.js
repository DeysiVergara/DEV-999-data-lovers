const fs = require('fs');
const { JSDOM } = require('jsdom');
const css = require('css');

const html = fs.readFileSync('./src/index.html', 'utf-8');
const page = new JSDOM(html);
const { window } = page;
const { document } = window;

const stylesPath = document.querySelector('link[rel="stylesheet"]').getAttribute('href');
const style = fs.readFileSync('./src/' + stylesPath, 'utf-8');
const { rules } = css.parse(style).stylesheet;

const BOX_MODEL_ATTRIBUTES = ['width', 'height', 'margin', 'padding', 'border', 'box-sizing', 'background'];

const getRulesForSelector = (selector) => {
  return rules.filter(
    (rule) =>
      rule.type === 'rule' &&
      rule.selectors.some((s) => s.trim() === selector)
  );
}

describe('CSS', () => {

  const select = document.querySelector('select');
  const selectClasses = Array.from(select.classList.values());

  // const lis = Array.from(ul.querySelectorAll('li'));

  describe('Uso de selectores de CSS', () => {

    it('Se usan selectores CSS de tipo para <header>', () => {
      const headerRules = getRulesForSelector('header');
      expect(headerRules.length).toBeGreaterThan(0);
    });

    it('Se usan selectores CSS de tipo para <footer>', () => {
      const footerRules = getRulesForSelector('footer');
      expect(footerRules.length).toBeGreaterThan(0);
    });


    it('Se usan selectores CSS de ID para <select>', () => {
      const select = document.querySelector('select');
      const id = select.getAttribute('id');
      const selectRules = getRulesForSelector(`#${id}`);
      expect(selectRules.length).toBeGreaterThan(0);
    });
  });


});
