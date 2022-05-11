import { actionTypes } from "../Actions/index";

const initialState = {
    allPokemons: [],
    pokemons: [],
    filters: [],
    types: [],
    spinner: true
}
function order(arr, prop) {
    let result = arr.sort(function (a, b) {
        if (a[prop] < b[prop]) { return -1; }
        if (a[prop] > b[prop]) { return 1; }
        return 0;
    });
    return result
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case actionTypes.GET_POKEMON_NAME:
            if (action.payload !== "error") return { ...state, pokemon: action.payload, spinner: false }
            return { ...state, error: { msg: "No se encontró al pokemon buscado" } };

        case actionTypes.GET_POKEMON_ID:
            if (action.payload !== "error") state = { ...state, pokemon: action.payload, spinner: false }
            return state;

        case actionTypes.GET_POKEMONS:
            if (action.payload !== "error")
                return {
                    ...state,
                    allPokemons: action.payload,
                    pokemons: action.payload
                    , spinner: false
                }
            else {              
                return { ...state, error: { msg: "No se encontraron pokemones", fail:true  } };
            }
        case actionTypes.GET_TYPES:
            return { ...state, types: action.payload }

        case actionTypes.GET_POKEMONS_DB:
            let resultDB = state.allPokemons.filter((po) => /[a-zA-Z]/.test(po.id))
            if (resultDB.length > 0) {
                return { ...state, pokemons: resultDB, spinner: false }
            } else {                           
                return { ...state,  error: { msg: "No se encontraron pokemones", fail:true  }, spinner: false };
            }


        case actionTypes.GET_POKEMONS_API:
            let resultapi = state.allPokemons.filter((po) => !(/[a-zA-Z]/.test(po.id)))
            return { ...state, pokemons: resultapi, spinner: false }

        case actionTypes.SORT_POKEMONS_ALPH_ASC:
            let resultOrd = order([...state.allPokemons], "name")
            return { ...state, pokemons: resultOrd, spinner: false }


        case actionTypes.SORT_POKEMONS_ALPH_DESC:
            let resultOrd_desc = order([...state.allPokemons], "name").reverse()
            return { ...state, pokemons: resultOrd_desc, spinner: false }


        case actionTypes.SORT_POKEMONS_ATTACK_ASC:
            let resultOrd2 = order([...state.allPokemons], "attack")
            return { ...state, pokemons: resultOrd2, spinner: false }


        case actionTypes.SORT_POKEMONS_ATTACK_DESC:
            let resultOrd3 = order([...state.allPokemons], "attack").reverse()
            return { ...state, pokemons: resultOrd3, spinner: false }


        case actionTypes.CLEAR_POKEMON:
            delete state.pokemon
            delete state.error
            return {
                ...state,
                pokemons: state.allPokemons
                , spinner: false
            };

        case actionTypes.FILTER_POK_TYPES:
            if(action.payload === "title"){
                return { ...state, spinner: false }
            }
            let result = [...state.allPokemons].filter((po) => {
                return po.Types.filter((t) => t.name === action.payload).length > 0
            })
            
            if(result.length > 0 ){
                return { ...state, pokemons: result, spinner: false }
            }else{
                return { ...state,  error: { msg: `No se encontraron pokemones de tipo ${action.payload}`, fail:true }, spinner: false };
            }

        case actionTypes.POST_POKEMON:
            if(action.payload !== "error") {
                return { ...state,  error: { msg: `Pokemon creado exitosamente`, fail:false }, spinner: false }; //,  error: { msg: `Pokemon creado correctamente`, fail:false}, spinner: false 
        }
            return { ...state,  error: { msg: `No se pudo crear el pokemon`, fail:true }, spinner: false};

        case actionTypes.SPINNER_STATUS:
            return { ...state, spinner: action.payload }

        default:
            break;
    }



}


export default rootReducer;