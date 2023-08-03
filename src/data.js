export const getArrayUnique = (arrayData, property) => {
  const arrayWithDoubles = arrayData.map(element => element[property]).flat();
  return arrayWithDoubles.reduce((acc,item)=>{
    if(acc.indexOf(item) === -1){
      acc.push(item);
    }
    return acc;
  },[]);
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

export const computeStats = (arrayData, property) => {
  const initialValue = 0;
  const sumWithInitial = arrayData.reduce(
    (accumulator, currentValue) => accumulator + Number(currentValue.stats[property]),
    initialValue
  );
  return parseFloat((sumWithInitial/arrayData.length).toFixed(2))
}

export const renderView = (arrayData) => {
  let html = `<div><ul class='wrap'>`;
  arrayData.map(element => {
    html += `<li class= "card">
              <img src=${element.img}>
              <p>${element.name}</p>
             </li>
            `
  });
  html += `<ul></div>`
  return html;
}