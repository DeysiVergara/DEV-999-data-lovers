import { filterData, sortData, computeStats } from './dataFunctions.js';
import { renderItems, renderFilterOptions } from './viewFunctions.js';
import data from './data/pokemon/pokemon.js'; // requirement that the data should be named data.js

const root = document.getElementById('root')
const searchInput = document.querySelector('input[type="search"]');
const selectSort = document.querySelector('#select-sort');
const selectFilter = document.querySelector('#select-filter');
const resetButton = document.querySelector('#button-reset');
const estadistics = document.querySelector('#button-stats');

let pokemonList;

const setPokemonList = (arrayData) => {
  pokemonList = arrayData;
  root.innerHTML = renderItems(pokemonList);
}

const getSortedArray = (arrayData) => {
  if (selectSort.querySelector('option[selected]').disabled) {
    return arrayData;
  }
  return sortData(arrayData, selectSort.name, selectSort.value);
}

searchInput.addEventListener('keyup', (e) => {
  // search todo el pokemon
  const arrayFiltered = filterData(data.pokemon, selectFilter.name, e.target.value);
  const arraySorted = getSortedArray(arrayFiltered);
  setPokemonList(arraySorted);
});

searchInput.addEventListener('search', (e) => {
  if (e.target.value === '') {
    setPokemonList(data.pokemon);
  }
});

selectSort.addEventListener('change', (e) => {
  const arrayOrdered = sortData(pokemonList, selectSort.name, e.target.value);
  setPokemonList(arrayOrdered);
})

selectFilter.addEventListener('change', (e) => {
  const arrayFiltered = filterData(data.pokemon, selectFilter.name, e.target.value);
  const arraySorted = getSortedArray(arrayFiltered);
  setPokemonList(arraySorted);
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

resetButton.addEventListener('click', () => {
  document.querySelector('form').reset();
  setPokemonList(data.pokemon);
});

setPokemonList(data.pokemon);
selectFilter.innerHTML = renderFilterOptions(data.pokemon);
