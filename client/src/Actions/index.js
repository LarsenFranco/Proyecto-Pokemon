import axios from "axios";

export const actionTypes = {
  GET_POKEMONS: "GET_POKEMONS",
  GET_POKEMONS_DB: "GET_POKEMONS_DB",
  GET_POKEMONS_API: "GET_POKEMONS_API",
  GET_POKEMON_NAME: "GET_POKEMON_NAME",
  GET_POKEMON_ID: "GET_POKEMON_ID",
  SORT_POKEMONS_ALPH_ASC:"SORT_POKEMONS_ALPH_ASC",
  SORT_POKEMONS_ALPH_DESC:"SORT_POKEMONS_ALPH_DESC",
  SORT_POKEMONS_ATTACK_ASC:"SORT_POKEMONS_ATTACK_ASC",
  SORT_POKEMONS_ATTACK_DESC:"SORT_POKEMONS_ATTACK_DESC",
  CLEAR_POKEMON : "CLEAR_POKEMON",
  GET_TYPES: "GET_TYPES",
  POST_POKEMON: "POST_POKEMON",
  FILTER_POK_TYPES: "FILTER_POK_TYPES",
  SPINNER_STATUS : "SPINNER_STATUS",
};

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001'

export function getTypes(){

  return async function (dispatch) {
    try {
      const resp = await axios.get(`${API_URL}/types`);
      return dispatch({
        type: actionTypes.GET_TYPES,
        payload: resp.data
      });
    } catch (error) {
      return dispatch({
        type: actionTypes.GET_TYPES,
        payload: "error"
      });
    }
  }



}
export function getPokemons() {
  console.log(API_URL)
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${API_URL}/pokemons`);
      return dispatch({
        type: actionTypes.GET_POKEMONS,
        payload: resp.data
      });
    } catch (error) {
      return dispatch({
        type: actionTypes.GET_POKEMONS,
        payload: "error"
      });
    }
  }
}

export function getPokemonsFromDB() {
  return {
    type: actionTypes.GET_POKEMONS_DB,
  }
}
export function getPokemonsFromAPI() {
  return {
    type: actionTypes.GET_POKEMONS_API,
  }
}

export function getPokemonByName(name) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${API_URL}/pokemons?name=${name}`);
      console.log(resp)
      return dispatch({
        type: actionTypes.GET_POKEMON_NAME,
        payload: resp.data
      });
    } catch (error) {
      console.log(error)
      return dispatch({
        type: actionTypes.GET_POKEMON_NAME,
        payload: "error"
      });
    }
  }
}

export function getPokemonByID(idPok) {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`${API_URL}/pokemon/${idPok}`);
      return dispatch({
        type: actionTypes.GET_POKEMON_ID,
        payload: resp.data
      });
    } catch (error) {
      return dispatch({
        type: actionTypes.GET_POKEMON_ID,
        payload: "error"
      });
    }
  }
}

export function sortPokemons_alph_asc(){
  return {
    type: actionTypes.SORT_POKEMONS_ALPH_ASC,
  }
}

export function sortPokemons_alph_desc(){
  return {
    type: actionTypes.SORT_POKEMONS_ALPH_DESC,
  }
}

export function sortPokemons_attack_asc(){
  return {
    type: actionTypes.SORT_POKEMONS_ATTACK_ASC,
  }
}

export function sortPokemons_attack_desc(){
  return {
    type: actionTypes.SORT_POKEMONS_ATTACK_DESC,
  }
}


export function filterByType (type){
  return {
    type: actionTypes.FILTER_POK_TYPES,
    payload:type
  }
}

export function postNewPokemon(poke){
  return async function (dispatch) {
    try {
      const resp = await axios.post(`${API_URL}/pokemons`,poke);
     
      return dispatch({
        type: actionTypes.POST_POKEMON,
        payload: resp.data
      });
    } catch (error) {
      
      return dispatch({
        type: actionTypes.POST_POKEMON,
        payload: "error"
      });
    }
  }
}

export function clearPokemon(){
  return {
    type: actionTypes.CLEAR_POKEMON,
  }
}

export function setSpinnerStatus(bool){
  return {
    type: actionTypes.SPINNER_STATUS,
    payload: bool
  }
}