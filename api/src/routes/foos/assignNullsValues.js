asignaValores = (data) => {   
    function random(max) {
          return Math.floor(Math.random() * max) + 1;
      }
    function assign (value,max){
      !max?max=100:max;
      value=random(max)
      return value
    }
    for (const property in data) {
         data[property]===undefined && property!=="sprites"
       ?data[property]=assign(data.property):null 
      }
    return data
  }





module.exports = { asignaValores };