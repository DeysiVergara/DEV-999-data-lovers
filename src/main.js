import { filterData, sortData, averageStats, getArrayUnique } from './data.js';
import data from './data/pokemon/pokemon.js';
const root = document.getElementById('root')
const inputUser = document.querySelector('#input-user');
const selectOrder = document.querySelector('#select-order');
const selectType = document.querySelector('#select-type');
const estadistics = document.querySelector('#estadistics');


inputUser.addEventListener('keyup', (e) => {
  const arrayFiltered = filterData(data.pokemon, 'name', e.target.value);
  printView(arrayFiltered);
})

selectOrder.addEventListener('change', (e) => {
  const arrayOrdered = sortData(data.pokemon, 'name', e.target.value);
  printView(arrayOrdered);
})

selectType.addEventListener('change', (e) => {
  const arrayType = filterData(data.pokemon, 'type', e.target.value);
  printView(arrayType);
})

estadistics.addEventListener('click', () => {
  root.innerHTML = `
                    <p>Este es el promedio de base attack ${averageStats(data.pokemon, 'base-attack')}</p>
                    <p>Este es el promedio de base defense ${averageStats(data.pokemon, 'base-defense')}</p>
                    <p>Este es el promedio de base stamina ${averageStats(data.pokemon, 'base-stamina')}</p>
                    <p>Este es el promedio de max-cp ${averageStats(data.pokemon, 'max-cp')}</p>
                    <p>Este es el promedio de max-cp ${averageStats(data.pokemon, 'max-hp')}</p>
                    `;
})


const printView = (arrayPokemon) => {
  let html = `<div class='wrap'>`;
  arrayPokemon.forEach(element => {
    html += `<div class= "pokemonBox">
              <img src=${element.img}>
              <p>${element.name}</p>
              </div>
            `
  });
  html += `</div>`
  root.innerHTML = html;
}
printView(data.pokemon);

const printTypes = () =>{
  let opciones = `<option selected disabled>Selecciona el tipo</option>`;
  getArrayUnique(data.pokemon, 'type').forEach( type => {
    opciones += `<option>${type}</option>`
  })
  selectType.innerHTML = opciones;
}

printTypes();
