/**
 * @jest-environment jsdom
*/
import fs from 'fs';
import { renderView } from '../../src/data.js';
const html = fs.readFileSync('./src/index.html', 'utf-8');
document.body.innerHTML = html;
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

describe('Uso de HTML semántico', () => {

  describe('<header>', () => {
    const header = document.querySelector('header');
    const h1 = header.querySelector('h1');

    it('La aplicación usa un <header>', () => {
      expect(header).not.toBeNull();
    });

    it('<header> no tiene atributo "id"', () => {
      expect(header.getAttribute('id')).toBeNull();
    });

    it('<header> no tiene atributo "class"', () => {
      expect(header.getAttribute('class')).toBeNull();
    });

    it('<header> es padre de un <h1>', () => {
      expect(h1).not.toBeNull();
    });

    it('<h1> no tiene atributo "id"', () => {
      expect(h1.getAttribute('id')).toBeNull();
    });

    it('<h1> no tiene atributo "class"', () => {
      expect(h1.getAttribute('class')).toBeNull();
    });
  });

  describe('<main> contiene un elemento <h2>', () => {
    const h2 = document.querySelector('main h2')

    it('Hay un h2 en el main es padre de un <h2>', () => {
      expect(h2).not.toBeNull();
    });
  });

  describe('<select>', () => {
    const select = document.querySelectorAll('select');

    it('La aplicación usa un <select>', () => {
      expect(select).not.toBeNull();
    });

    it('<select> tiene atributo "name"', () => {
      Array.from(select).forEach((element) => {
        expect(element.getAttribute('name')).not.toBeNull();
      })
    });

    it('<select> no tiene atributo "class"', () => {
      Array.from(select).forEach((element) => {
        expect(element.getAttribute('class')).toBeNull();
      })
    });

    it('<label> existe', () => {
      Array.from(select).forEach((element) => {
        const previousFor = element.previousElementSibling.getAttribute('for');
        expect(previousFor).toBe(element.id);
      })
    })

  });

  describe('<ul>', () => {
    const lis = document.querySelector('ul > li');

    it('La aplicacion usa un <ul> con <li> para los elementos de data', () => {
      expect(lis).not.toBeNull();
    });
  });

  describe('<footer>', () => {

    const footer = document.querySelector('footer');

    it('La aplicación usa un <footer>', () => {
      expect(footer).not.toBeNull();
    });

    it('<footer> no tiene atributo "id"', () => {
      expect(footer.getAttribute('id')).toBeNull();
    });

    it('<footer> no tiene atributo "class"', () => {
      expect(footer.getAttribute('class')).toBeNull();
    });
  });

});
