import { filterData, sortData, getArrayUnique, computeStats, renderView } from './data.js';
import data from './data/pokemon/pokemon.js';
const root = document.getElementById('root')
const inputUser = document.querySelector('#input-user');
const selectOrder = document.querySelector('[name="select-order"]');
const selectType = document.querySelector('[name="select-type"]');
const estadistics = document.querySelector('#estadistics');


inputUser.addEventListener('keyup', (e) => {
  const arrayFiltered = filterData(data.pokemon, 'name', e.target.value);
  renderView(arrayFiltered);
})

selectOrder.addEventListener('change', (e) => {
  const arrayOrdered = sortData(data.pokemon, 'name', e.target.value);
  renderView(arrayOrdered);
})

selectType.addEventListener('change', (e) => {
  const arrayType = filterData(data.pokemon, 'type', e.target.value);
  renderView(arrayType);
})

estadistics.addEventListener('click', () => {
  root.innerHTML = `
                    <p>Este es el promedio de base attack ${computeStats(data.pokemon, 'base-attack')}</p>
                    <p>Este es el promedio de base defense ${computeStats(data.pokemon, 'base-defense')}</p>
                    <p>Este es el promedio de base stamina ${computeStats(data.pokemon, 'base-stamina')}</p>
                    <p>Este es el promedio de max-cp ${computeStats(data.pokemon, 'max-cp')}</p>
                    <p>Este es el promedio de max-cp ${computeStats(data.pokemon, 'max-hp')}</p>
                    `;
})

root.innerHTML = renderView(data.pokemon);

const renderTypes = () =>{
  let opciones = `<option selected disabled>Selecciona el tipo</option>`;
  getArrayUnique(data.pokemon, 'type').map( type => {
    opciones += `<option>${type}</option>`
  })
  selectType.innerHTML = opciones;
}

renderTypes();
