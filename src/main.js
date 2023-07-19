import { filterPokemon, sortPokemon, average, typePokemon } from './data.js';
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
  root.innerHTML = `
                    <p>Este es el promedio de base attack ${average(data.pokemon, 'base-attack')}</p>
                    <p>Este es el promedio de base defense ${average(data.pokemon, 'base-defense')}</p>
                    <p>Este es el promedio de base stamina ${average(data.pokemon, 'base-stamina')}</p>
                    <p>Este es el promedio de max-cp ${average(data.pokemon, 'max-cp')}</p>
                    <p>Este es el promedio de max-cp ${average(data.pokemon, 'max-hp')}</p>
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
  typePokemon(data.pokemon).forEach( type => {
    opciones += `<option>${type}</option>`
  })
  selectType.innerHTML = opciones;
}

printTypes();
