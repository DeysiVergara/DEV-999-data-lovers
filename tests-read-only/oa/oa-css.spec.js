const fs = require('fs');
const css = require('css');
const html = fs.readFileSync('./src/index.html', 'utf-8');

const { document } = window;
document.innerHTML = html;
// const renderView = require('../../src/main.js');
//const stylesPath = document.querySelector('link[rel="stylesheet"]').getAttribute('href');
const style = fs.readFileSync('./src/' + 'style.css', 'utf-8');
const { rules } = css.parse(style).stylesheet;

const BOX_MODEL_ATTRIBUTES = ['width', 'height', 'margin', 'padding', 'border', 'box-sizing', 'background'];

const getRulesForSelector = (selector) => {
  return rules.filter(
    (rule) =>
      rule.type === 'rule' &&
      rule.selectors.some((s) => s.trim() === selector)
  );
}

const fakeData = [
  {
    name: "charizard",
    img: "https://www.serebii.net/pokemongo/pokemon/006.png",
  },
  {
    name: "charmeleon",
    img: "https://www.serebii.net/pokemongo/pokemon/005.png",
  },
];

// jest.mock('../../src/main.js');

describe('CSS', () => {
  // console.log(document);

  // const select = document.querySelectorAll('select');
  // const selectClasses = Array.from(select.classList.values());

  // const lis = Array.from(ul.querySelectorAll('li'));

  describe('Uso de selectores de CSS', () => {
    it('Se busca', () => {
      const { renderView } = require('../../src/main.js');
      renderView(fakeData);
      console.log(document);
      // expect(headerRules.length).toBeGreaterThan(0);
    });

    it('Se usan selectores CSS de tipo para <header>', () => {
      const headerRules = getRulesForSelector('header');
      expect(headerRules.length).toBeGreaterThan(0);
    });

    it('Se usan selectores CSS de tipo para <footer>', () => {
      const footerRules = getRulesForSelector('footer');
      expect(footerRules.length).toBeGreaterThan(0);
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
