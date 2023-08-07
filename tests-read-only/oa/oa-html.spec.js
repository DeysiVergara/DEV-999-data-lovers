/**
 * @jest-environment jsdom
*/
import fs from 'fs';

const html = fs.readFileSync('./src/index.html', 'utf-8');
document.body.innerHTML = html;
import { renderView } from '../../src/data.js';

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

describe('Uso de HTML semántico', () => {

  describe('<header>', () => {
    const h2 = document.querySelector('h2');
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

    it('<header> no tiene atributo "name"', () => {
      expect(header.getAttribute('name')).toBeNull();
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

    it('<h1> no tiene atributo "name"', () => {
      expect(h1.getAttribute('name')).toBeNull();
    });

    it('<header> es padre de un <h2>', () => {
      expect(h2).not.toBeNull();
    });
  });

  describe('<select>', () => {
    const select = document.querySelectorAll('select');

    it('La aplicación usa un <select>', () => {
      expect(select).not.toBeNull();
    });

    Array.from(select).forEach((element) => {
      console.log(element);
      it('<select> tiene atributo "name"', () => {
        expect(element.getAttribute('name')).not.toBeNull();
      });

      it('<select> no tiene atributo "class"', () => {
        expect(element.getAttribute('class')).toBeNull();
      });

      it('<label> existe', () => {
        const previousFor = element.previousElementSibling.getAttribute('for');
        expect(previousFor).toBe(element.id);
      })
    });
  });

  describe('<ul>', () => {
    const documentRendered = renderView(fakeData);
    const root = document.querySelector('#root');
    root.innerHTML = documentRendered;
    const lis = document.querySelector('li');
    const uls = lis.querySelectorAll('ul');

    it('La aplicación usa un <li>', () => {
      expect(uls).not.toBeNull();
    });

    it('La aplicación usa un <li>', () => {
      expect(lis).not.toBeNull();
    });

    //   const lis = ul.querySelectorAll('li');

    //   it('La aplicación usa un <ul>', () => {
    //     expect(ul).not.toBeNull();
    //   });

    //   it('<ul> tiene atributo "class"', () => {      
    //     expect(ul.getAttribute('class')).not.toBeNull();
    //   });

    //   it('<ul> no tiene atributo "id"', () => {      
    //     expect(ul.getAttribute('id')).toBeNull();
    //   });

    //   it('<ul> no tiene atributo "name"', () => {
    //     expect(ul.getAttribute('name')).toBeNull();
    //   });

    //   it('<ul> tiene 6 hijos <li>', () => {      
    //     expect(lis.length).toBe(6);
    //   });    

    //   it('<li> tienen atributos "class"', () => { 
    //     lis.forEach((div) => {
    //       expect(div.getAttribute('class')).not.toBeNull();
    //     });
    //   });    

    //   it('<li> no tienen atributos "id"', () => { 
    //     lis.forEach((div) => {
    //       expect(div.getAttribute('id')).toBeNull();
    //     });
    //   });

    //   it('<li> no tienen atributos "name"', () => { 
    //     lis.forEach((div) => {
    //       expect(div.getAttribute('name')).toBeNull();
    //     });
    //   });
  });


  describe('<footer>', () => {

    const footer = document.querySelector('footer');

    const p = footer.querySelector('p');

    it('La aplicación usa un <footer>', () => {
      expect(footer).not.toBeNull();
    });

    it('<footer> no tiene atributo "id"', () => {
      expect(footer.getAttribute('id')).toBeNull();
    });

    it('<footer> no tiene atributo "class"', () => {
      expect(footer.getAttribute('class')).toBeNull();
    });

    it('<footer> no tiene atributo "name"', () => {
      expect(footer.getAttribute('name')).toBeNull();
    });

    it('<footer> es padre de un <p>', () => {
      expect(p).not.toBeNull();
    });

    it('<p> no tiene atributo "id"', () => {
      expect(p.getAttribute('id')).toBeNull();
    });

    it('<p> no tiene atributo "class"', () => {
      expect(p.getAttribute('class')).toBeNull();
    });

    it('<p> no tiene atributo "name"', () => {
      expect(p.getAttribute('name')).toBeNull();
    });
  });

});
