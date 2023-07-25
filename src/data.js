export const getArrayUnique = (arrayData, property) => {
  const arrayWithDoubles = arrayData.map(element => element[property]).flat();
  const arrayUniques = [];
  arrayWithDoubles.forEach(type => {
    if(!arrayUniques.includes(type)){
      arrayUniques.push(type)
    }
  })
  return arrayUniques
}

export const filterData = (arrayData, property, condition) => {
  return arrayData.filter(elem => elem[property].includes(condition.toLowerCase()));
};

export const sortData = (arrayData, property, condition) => {
  const copyArray = arrayData.slice();
  if(condition === 'asc') {
    copyArray.sort((a,b) => a[property].localeCompare(b[property]))
  }else {
    copyArray.sort((b,a) => a[property].localeCompare(b[property]))
  }
  return copyArray;
};

export const averageStats = (arrayData, property) => {
  let suma = 0;
  arrayData.forEach(element => {
    suma += Number(element.stats[property]);
  });
  return parseFloat((suma/arrayData.length).toFixed(2))
}
