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

export const getArrayUnique = (arrayData, property) => {
  const arrayWithDoubles = arrayData.map(element => element[property]).flat();
  return arrayWithDoubles.reduce((acc,item)=>{
    if(acc.indexOf(item) === -1){
      acc.push(item);
    }
    return acc;
  },[]);
}

// TODO: revisamos si colocamos el render view se queda aqui o si colocamos render view en un windows.
// addeventlistener DOMContentLoaded en el main.js.
export const renderView = (arrayData) => {
  const lis = arrayData.map(element => `<li class= "card">
                                          <img src=${element.img}>
                                          <p>Name: ${element.name}</p>
                                          <p>Num: ${element.num}</p>
                                          <p>Type: ${element.type.join(', ')}</p>
                                        </li>`);
  return  `<div><ul class='wrap'>${lis.join('')}<ul></div>`;
}

export const renderTypes = (arrayData) =>{
  const firstOption = `<option selected disabled>Selecciona el tipo</option>`;
  const options = getArrayUnique(arrayData, 'type').map( type => `<option>${type}</option>`);
  return firstOption + options.join('');
}