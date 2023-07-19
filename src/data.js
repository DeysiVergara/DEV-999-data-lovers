export const typePokemon = (arrayPokemon) => {
  const arrayType= arrayPokemon.map(element => element.type).flat();
  const arrayUniques = [];
  arrayType.forEach(type => {
    if(!arrayUniques.includes(type)){
      arrayUniques.push(type)
    }
  })
  return arrayUniques
}

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

export const average = (arrayPokemon, property) => {
  let suma = 0;
  arrayPokemon.forEach(element => {
    suma += Number(element.stats[property]);
  });
  return parseFloat((suma/arrayPokemon.length).toFixed(2))
}
