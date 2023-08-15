/**
 * @jest-environment jsdom
*/
import fs from 'fs';
import css from 'css';
import { renderView } from '../../src/data.js';
const html = fs.readFileSync('./src/index.html', 'utf-8');
document.body.innerHTML = html;

const stylesPath = document.querySelector('link[rel="stylesheet"]').getAttribute('href');
const style = fs.readFileSync('./src/' + stylesPath, 'utf-8');
const { rules } = css.parse(style).stylesheet;

const BOX_MODEL_ATTRIBUTES = ['width', 'height', 'margin', 'padding', 'border', 'box-sizing', 'background'];
const FLEXBOX_ATTRIBUTES = ['flex-wrap', 'flex-direction', 'justify-content', 'align-items'];

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
    num: '006',
    type: [
      "fire",
      "flying"
    ],
  },
  {
    name: "charmeleon",
    img: "https://www.serebii.net/pokemongo/pokemon/005.png",
    num: '005',
    type: [
      "fire"
    ],
  },
];
document.querySelector('#root').innerHTML = renderView(fakeData);

describe('CSS', () => {
  const ul = document.querySelector('#root ul');
  const cardsLi = ul.querySelectorAll('li');
  const ulClasses = Array.from(ul.classList.values());

  describe('Uso de selectores de CSS', () => {
    it('li elementos tienen class', () => {
      cardsLi.forEach(item=>{
        expect(item.getAttribute('class')).toBe('card');
      });
    });

    it('Uso de flexbox en la clase del ul', () => {
      const allRulesAttributes = ulClasses.reduce((allRules, ulClass) => {
        const rules = getRulesForSelector(`.${ulClass}`);
        const ulRulesAttributes = rules[0].declarations.map((declaration) => declaration.property);
        return allRules.concat(ulRulesAttributes);
      }, []);
      expect(
        allRulesAttributes.some(
          (attribute) => FLEXBOX_ATTRIBUTES.some(
            flexboxAttribute => attribute.startsWith(flexboxAttribute)
          )
        )
      ).toBe(true);
    });

    it('Se usan selectores CSS de tipo para <header>', () => {
      const headerRules = getRulesForSelector('header');
      expect(headerRules.length).toBeGreaterThan(0);
    });

    it('Se usan selectores CSS de tipo para <footer>', () => {
      const footerRules = getRulesForSelector('footer');
      expect(footerRules.length).toBeGreaterThan(0);
    });

    it('Se usan selectores CSS de tipo para <select>', () => {
      const selectRules = getRulesForSelector('select');
      expect(selectRules.length).toBeGreaterThan(0);
    });
  });

  describe('Modelo de caja (box model)', () => {  
    it('Se usan atributos de modelo de caja en clase CSS para <li>', () => {
      let allRulesAttributes = [];
      cardsLi.forEach((li) => {
        const liClasses = Array.from(li.classList.values());
        liClasses.forEach((liClass) => {
          const liRules = getRulesForSelector(`.${liClass}`);
          const ulRulesAttributes = liRules[0].declarations.map((declaration) => declaration.property);
          allRulesAttributes = allRulesAttributes.concat(ulRulesAttributes);
        });
      });
  
      //expect at least one ulRulesAttributes starts with at least one element of boxModelAttributes
      expect(
        allRulesAttributes.some(
          (attribute) => BOX_MODEL_ATTRIBUTES.some(
            boxModelAttribute => attribute.startsWith(boxModelAttribute)
          )
        )        
      ).toBe(true);
    });
  });
});

