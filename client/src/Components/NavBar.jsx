import React, { useState, useEffect } from "react";
import {
  sortPokemons_alph_asc,
  sortPokemons_alph_desc,
  sortPokemons_attack_desc,
  sortPokemons_attack_asc,
  getPokemonByName,
  clearPokemon,
  getPokemonsFromDB,
  getPokemonsFromAPI,
  filterByType,
  setSpinnerStatus
} from "../Actions"; 
import { useDispatch, useSelector }  from "react-redux";
import Selects from "./Selects";
import Style from "../Styles/NavBar.module.css";
import icono from "../images/buttonHomeSVG.svg";
import { Link, useNavigate } from "react-router-dom";
import lupa from '../images/324654.png'
import add from '../images/add.svg'
function NavBar(props) {
  const types = props.types;
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false)
  const pokemonStore = useSelector((initialState) => initialState);
  let typesNames = types.map((type) => type.name.toUpperCase())
  const spinner = pokemonStore?.spinner;
  const error = pokemonStore?.hasOwnProperty('error')
  useEffect(() => {
    if(spinner || error){
      setVisible(false);
    }else{
      setVisible(true)
    }

  },[spinner, error])


  let [search, setSearch] = useState("");

  const dispatch = useDispatch();

  function filterByDB(type) {
    if (type === "Base de datos") {
      return dispatch(getPokemonsFromDB());
    }
    if (type === "API") {
      return dispatch(getPokemonsFromAPI());
    }
  }

  function filtrarType(type){
    type = type.toLowerCase();
   return dispatch(filterByType(type));
  }

  function ordenAlf(type) {
    if (type === "Ascendiente") {
      return dispatch(sortPokemons_alph_asc());
    }
    if (type === "Descendiente") {
      return dispatch(sortPokemons_alph_desc());
    }
    return dispatch(clearPokemon());
  }

  function ordenAttack(type) {
    if (type === "Ascendiente") {
      return dispatch(sortPokemons_attack_asc());
    }
    if (type === "Descendiente") {
      return dispatch(sortPokemons_attack_desc());
    }
    dispatch(clearPokemon());
    return;
  }

  function handleChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if(/^[a-zA-Z ]*$/.test(search) && search.length>1){
      dispatch(setSpinnerStatus(true));
      dispatch(getPokemonByName(search));
      setSearch("")
      return
    }else{
      setSearch("");
    }
    setSearch("");
    return;
  }

  function goHome () {
    dispatch(clearPokemon());
    navigate("/home")
    return
  }


  return (
    <div className={Style.container}   style={ visible ? null : {display: "none"} } >           
        <button onClick={goHome} className={Style.buttonHome}>
          <img src={icono} alt="Home button" />
        </button>  
        
        
        {/* <div className={Style.subContainer} > */}

        <Selects
        options={["Ascendiente", "Descendiente"]}
        action={ordenAlf}
        title={"Ordenar alfabéticamente"}
      />
      <Selects
        options={["Ascendiente", "Descendiente"]}
        action={ordenAttack}
        title={"Ordenar por fuerza"}
      />
       
      <Link to="/newpokemon">
        <img src={add} alt="Añadir nuevo" />
      </Link>
     
      <Selects
        options={["API", "Base de datos"]}
        action={filterByDB}
        title={"Origen de Pokemons"}
      />
      {
        typesNames && 
          <Selects
          options={typesNames}
          action={filtrarType}
          title={"Tipos"}
          />
      }
     
         
    
  
    
      <form onSubmit={handleSubmit}>
        <div className={Style.searchBox}>
        <button className={Style.btnSearch}>
          <img src={lupa} alt="Buscar" />
        </button>
        <input
        className={Style.inputSearch}
          autoComplete="off"
          onChange={handleChange}
          value={search}
          placeholder="Buscar por nombre"
        />
        </div>       
      </form>
    </div>
     
  );
}

export default NavBar;
