const { Type } = require("../../db");
const axios = require('axios');
async function cargaTypes(){
    try {
        let typesInDB = await Type.findAll();        
        if (!typesInDB.length) {
            poksToView = await axios.get("https://pokeapi.co/api/v2/type/")
            typesInDB = await Type.bulkCreate(poksToView.data.results)
            console.log("Escribiendo types en database")           
            return typesInDB
        }
        return typesInDB
    } catch (error) {
        return ("No se cargaron los types en DB")
    }
}

module.exports = { cargaTypes };