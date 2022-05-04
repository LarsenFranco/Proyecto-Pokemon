
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios = require('axios');
var cors = require('cors');
const { Pokemon, Type } = require("../db");
const router = Router();
const { asignaValores } = require("./foos/assignNullsValues");
const { normalize } = require("./foos/normalizePoke");

const API_ROUTES = {
    API_ALL: 'https://pokeapi.co/api/v2/pokemon',
    API_ALL2: 'https://pokeapi.co/api/v2/pokemon?offset=20&limit=20',
    API_ID: `https://pokeapi.co/api/v2/pokemon/`,   //recibe ID o NAME
    API_NAME: `https://pokeapi.co/api/v2/pokemon/`,  //recibe ID o NAME
    API_TYPE: `https://pokeapi.co/api/v2/type/`    //recibe ID o NAME
}

router.get('/', (req, res) => {
    res.redirect('/pokemons');
})

//! Type
router.get('/types', async (req, res) => {

    try {
        const typesInDB = await Type.findAll()
        return res.status(200).json(typesInDB)
    } catch (error) {
        return res.status(404).send("No se pudo leer la DB")
    }

})

//!Post new Pokemon
router.post('/pokemons', async (req, res) => {
    let { name, hp, attack, defense, weight, speed, height, sprites, types } = req.body;

    if (!name) return res.status(404).send("Name is required");

    name = name.trim().toLowerCase();

    if (!types) {
        types = [1]
    };

     if (sprites === undefined || sprites.length < 8) { sprites = "https://i.postimg.cc/SRwC733h/pokese-al4-PNG.png" }

    let pokSeteado = asignaValores({ name, hp, attack, defense, weight, speed, height, sprites, types })

    try {
        const newPokemon = await Pokemon.create(pokSeteado)
        await newPokemon.addType(types);

        return res.status(201).json(newPokemon)
    } catch (error) {
        return res.status(404).send(`ERORR: ${error}`)
    }
})

//! NAME y ALL
router.get('/pokemons', async (req, res) => {
    let { name } = req.query;
    let allPokemons = [];
    let poksFromAPI = [];
    let poksFromDB = [];
    let poksFromDBNORMAL;
    let poksFromAPINORMAL = [];
    let { API_ALL, API_NAME, API_ALL2 } = API_ROUTES
    let URLApi = API_ALL;

    if (!name) {
       
        try {
            poksFromDB = await Pokemon.findAll({
                include: {
                    model: Type,
                    attributes: ["name", "id"],
                    through: { attributes: [] },
                }
            })
            poksFromDBNORMAL = poksFromDB?.map((po) => po.dataValues)
        } catch (error) {
           res.status(404).send({error: "error en DB"})
        }

        //! Solicitamos pokemones desde la API
        try {
            let bothResults = await Promise.all([
                axios.get(API_ALL),
                axios.get(API_ALL2),
            ]);
            let data1 = bothResults[0].data.results
            let data2 = bothResults[1].data.results
            poksFromAPI = data1.concat(data2) //[----]
            let pokemonsApiURL = poksFromAPI?.map((po) => {
                return axios.get(po.url)
                    .then((po) => {
                        let objeto = normalize(po)
                        return (objeto)
                    })
            })

            poksFromAPINORMAL = await Promise.all(pokemonsApiURL);
            allPokemons = poksFromAPINORMAL.concat(poksFromDBNORMAL) 
            return res.status(200).json(allPokemons)
        } catch (error) {
            console.log("error en API")
            console.log(error)
            res.status(404).send(error)
        }
    }
    else {

        name = name.toLowerCase().trim();

        URLApi = API_NAME + name;

        try {

            poksFromAPI = await axios.get(URLApi)

            if (poksFromAPI) {
                poksFromAPINORMAL = await normalize(poksFromAPI)
            }


            return res.status(200).json(poksFromAPINORMAL);
        } catch (error) {

        }
        try {

            poksFromDBNORMAL = await Pokemon.findOne({
                where: { name: name },
                include: {
                    model: Type,
                    attributes: ["name", "id"],
                    through: { attributes: [] },
                }
            })

            if (poksFromDBNORMAL.name) {
                return res.json(poksFromDBNORMAL);
            } else {
                return res.status(404).send(`Pokemon ${name} no encontrado`)
            }

        } catch (error) {
            return res.status(404).send(`Pokemon ${name} no encontrado`)
        }

    }
}

)

//! BUSQUEDA POR ID
router.get('/pokemon/:id', async (req, res) => {
    let { API_ID } = API_ROUTES
    let { id } = req.params;

    if (/[a-zA-Z]/.test(id)) {

        try {
            let pokInDB = await Pokemon.findOne({
                where: { id: id },
                include: {
                    model: Type,
                    attributes: ["name", "id"],
                    through: { attributes: [] },
                }
            })

            if (pokInDB !== null) {
                return res.json(pokInDB)
            }

            return res.status(404).json("No se encontró " + id)

        } catch (error) {
            return res.status(404).json("ERROR LEYENDO DATABASE")
        }


    } else {
        try {
            let pokInApi = await axios(API_ID + id)

            if (pokInApi) {
                poksFromAPINORMAL = await normalize(pokInApi)
                return res.json(poksFromAPINORMAL)
            }

        } catch (error) {
            return res.status(404).json("No se encontró en la API " + id)
        }
    }

})


module.exports = router;

