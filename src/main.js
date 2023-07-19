import { filterPokemon, sortPokemon, average } from './data.js';
import data from './data/pokemon/pokemon.js';
const root = document.getElementById('root')
const inputUser = document.querySelector('#input-user');
const selectOrder = document.querySelector('#select-order');
const selectType = document.querySelector('#select-type');
const estadistics = document.querySelector('#estadistics');


inputUser.addEventListener('keyup', (e) => {
  const arrayFiltered = filterPokemon(data.pokemon, 'name', e.target.value);
  printView(arrayFiltered);
})

selectOrder.addEventListener('change', (e) => {
  const arrayOrdered = sortPokemon(data.pokemon, 'name', e.target.value);
  printView(arrayOrdered);
})

selectType.addEventListener('change', (e) => {
  const arrayType = filterPokemon(data.pokemon, 'type', e.target.value);
  printView(arrayType);
})

estadistics.addEventListener('click', () => {
  root.innerHTML = `Este es el promedio de base Attack ${average(data.pokemon)}`;
})


const printView = (arrayPokemon) => {
  let html = `<div class='wrap'>`;
  arrayPokemon.forEach(element => {
    html += `<div>
              <img src=${element.img}>
              <p>${element.name}</p>
              </div>
            `
  });
  html += `</div>`
  root.innerHTML = html;
}
printView(data.pokemon);