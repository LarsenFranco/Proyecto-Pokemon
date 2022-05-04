export const  randomCreate = () => {
   
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    function getRandonName(cant) {
      let letrs = { con: ["p", "l", "m", "r"], voc: ["a", "e", "i", "o", "u"] };
      let name = "";

      function concat(largo) {
        for (let i = 0; i < largo; i++) {
          name += letrs.con[getRandomInt(0, 2)] + letrs.voc[getRandomInt(0, 4)];
        }
        return name;
      }

      return concat(cant);
    }

    let randomPok = {
      types: [],
      name: getRandonName(3),
      hp: getRandomInt(1, 200),
      attack: getRandomInt(1, 200),
      defense: getRandomInt(1, 200),
      speed: getRandomInt(1, 200),
      height: getRandomInt(1, 200),
      weight: getRandomInt(1, 200),
      sprites:
        "https://i.ibb.co/RCHTbyG/png-clipart-pokemon-pokemon.png",
    };
    
    return randomPok;
  }