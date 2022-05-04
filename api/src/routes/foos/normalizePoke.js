const axios = require('axios');

async function normalize (pokemon) {
    let newTypes=[];
    // console.log("normalize dice"+pokemon.data.name)

    newTypes=pokemon.data.types.map((t)=>{
        return axios(t.type.url)
        .then((type)=>{
            return {
                id: type.data.id,
                name:type.data.name
            }
        })
    })
    try {
        newTypes  = await Promise.all(newTypes)        
    } catch (error) {
        return ("error  "+error)
    }   
    
    
    normalPokemon = {
        id: pokemon.data.id,
        name: pokemon.data.name,
        height: pokemon.data.height,
        weight: pokemon.data.weight,
        Types: newTypes,
        sprites: pokemon.data.sprites.other.dream_world.front_default,
        hp: pokemon.data.stats[0].base_stat,
        attack: pokemon.data.stats[1].base_stat,
        defense: pokemon.data.stats[2].base_stat
    }
    return (normalPokemon)
}

module.exports = { normalize };