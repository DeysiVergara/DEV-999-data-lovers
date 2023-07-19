export const filterPokemon = (arrayPokemon, property, condition) => {
  return arrayPokemon.filter(elem => elem[property].includes(condition.toLowerCase()));
};

export const sortPokemon = (arrayPokemon, property, condition) => {
  const newArrayPokemon = arrayPokemon.slice();
  if(condition === 'A-Z') {
    newArrayPokemon.sort((a,b) => a[property].localeCompare(b[property]))
  }else {
    newArrayPokemon.sort((b,a) => a[property].localeCompare(b[property]))
  }
  return newArrayPokemon;
};

export const average = (arrayPokemon) => {
  let suma = 0;
  arrayPokemon.forEach(element => {
    suma += Number(element.stats['base-attack']);
  });
  return parseFloat((suma/arrayPokemon.length).toFixed(2))
}
