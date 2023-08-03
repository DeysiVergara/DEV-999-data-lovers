/**
 * @jest-environment jsdom
*/
import fs from 'fs';
import css from 'css';
const html = fs.readFileSync('./src/index.html', 'utf-8');
document.body.innerHTML = html;
import { renderView } from '../../src/data.js';

const stylesPath = document.querySelector('link[rel="stylesheet"]').getAttribute('href');
const style = fs.readFileSync('./src/' + stylesPath, 'utf-8');
const { rules } = css.parse(style).stylesheet;

const BOX_MODEL_ATTRIBUTES = ['width', 'height', 'margin', 'padding', 'border', 'box-sizing', 'background'];

const getRulesForSelector = (selector) => {
  return rules.filter(
    (rule) =>
      rule.type === 'rule' &&
      rule.selectors.some((s) => s.trim().includes(selector))
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


describe('CSS', () => {

  const select = document.querySelector('select');
  const selectClasses = Array.from(select.classList.values());

  describe('Uso de selectores de CSS', () => {
    it('Class .card en el li', () => {
      const newData = renderView(fakeData);
      const root = document.querySelector('#root');
      root.innerHTML = newData;
      const card = document.querySelector('.card');
      const classLi = card.getAttribute('class');
      const liRules = getRulesForSelector(`.${classLi}`);
      expect(liRules.length).toBeGreaterThan(0);
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


    it('Se usan selectores CSS de ID para <select>', () => {
      const select = document.querySelector('select');
      const name = select.getAttribute('name');
      const selectRules = getRulesForSelector(`[name=${name}]`);
      expect(selectRules.length).toBeGreaterThan(0);
    });
  });


});
