import { getArrayUnique } from './dataFunctions.js';

// TODO: necesitamos renderView para los tests entonces no podemos colocar el renderView en el main.js
// porque el codigo de main busca elementos que no existen en el test
// o si queremos quedar con renderView en el main necesitamos usar window DOMContentLoaded
// para los elementos y listeners

export const renderView = (arrayData) => {
  const lis = arrayData.map(element => `<li class="card" data-id="${element.num}" itemscope itemtype="https://schema.org/Thing">
    <img itemprop="image" src=${element.img}>
    <dl>
      <dt>Name:</dt><dd itemprop="name">${element.name}</dd>
      <dt>Number:</dt><dd itemprop="num">${element.num}</dd>
      <dt>Type:</dt><dd itemprop="type"> ${element.type.join(', ')}</dd>
    </dl>
  </li>`);
  return  `<ul class='wrap'>${lis.join('')}<ul>`;
}

export const renderFilterOptions = (arrayData) => {
  // no me gusta que el primer elemento sea selected y disabled
  // mejor tener como opcion "todos"
  const firstOption = `<option selected disabled>Selecciona el tipo</option>`;
  const options = getArrayUnique(arrayData, 'type').map( type => `<option value='${type}'>${type}</option>`);
  return firstOption + options.join('');
}
