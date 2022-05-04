import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Style from "../Styles/Create.module.css";
import pokemons1 from "../images/pokemons1.png";
import pokemons2 from "../images/pokemons2.png";
import { validator } from "../Utils/ValidateForms";
import { useNavigate } from "react-router-dom";
import { isObjEmpty } from "../Utils/isObjEmpty.js";
import { randomCreate } from "../Utils/randomCreate.js";
import { postNewPokemon, setSpinnerStatus } from "../Actions";
import back from '../images/back.svg'
function CreatePok() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pokInitial = {
    types: [],
    name: "",
    hp: 0,
    attack: 0,
    defense: 0,
    speed: 0,
    height: 0,
    weight: 0,
    sprites: undefined,
  };

  const [newPokemon, setNewPokemon] = useState(pokInitial);
  const [error, setError] = useState({});
  const [submit, setSubmit] = useState(false);
  const types = useSelector((state) => state.types);

  const imageValidate = (URL) => {
    const regex = new RegExp(/(https?:\/\/.*\.(?:png|jpg|gif))/);
    if (regex.test(URL)) return URL;
    if (!regex.test(URL)) return undefined;
  };

  const handleInput = (e) => {
    setError(validator({ ...newPokemon, [e.target.name]: e.target.value }));
    setNewPokemon((previous) => {
      return { ...previous, [e.target.name]: e.target.value.trim() };
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    setNewPokemon((prevState) => {
      return { ...prevState, sprites: imageValidate(newPokemon.sprites) };
    });
    dispatch(postNewPokemon(newPokemon));
    dispatch(setSpinnerStatus(true));
    setNewPokemon(pokInitial);
    navigate("/home");
    return { mensaje: "creado" };
  }

  const handleCheck = (e) => {
    if (e.target.checked) {
      setNewPokemon((prevState) => {
        return {
          ...prevState,
          types: [...prevState.types, e.target.value],
        };
      });
    }
    if (!e.target.checked) {
      newPokemon.types.splice(newPokemon.types.indexOf(e.target.value), 1);
      setNewPokemon((prevState) => {
        return { ...prevState };
      });
    }
  };

  useEffect(() => {
    if (
      newPokemon.name.length > 0 &&
      newPokemon.types.length < 3 &&
      newPokemon.types.length > 0 &&
      isObjEmpty(error)
    ) {
      setSubmit(true);
    } else {
      setSubmit(false);
    }
  }, [error, newPokemon, submit]);

  return (
    <div className={Style.container}>
      <button onClick={()=>{navigate('/home')} } className={Style.btnClose}>
        <img src={back} alt="" />
      </button>
      <div className={Style.imagenes}>
        <img className={Style.poks1} src={pokemons1} alt="Pokemons saludando" />
        <button className={Style.randomBtn} onClick={() => setNewPokemon(randomCreate())}>
          <img
            className={Style.poks2}
            src={pokemons2}
            alt="Otros pokemons saludando"
          />
        </button>
      </div>
      <form className={Style.formulario} onSubmit={handleSubmit}>
        <div className={Style.header}>
          <div className={Style.name}>
            <input
              placeholder={"Nombre"}
              className={Style.input}
              onChange={handleInput}
              type="text"
              id="name"
              name="name"
              autoComplete="on"
              value={newPokemon.name}
            />
            {error.name && <p>{error.name}</p>}
          </div>
          <div className={Style.image}>
            <input
              placeholder="Imagen"
              className={Style.input}
              onChange={handleInput}
              type="text"
              id="sprites"
              name="sprites"
              autoComplete="off"
              value={newPokemon.sprites}
            />
          </div>
        </div>

        <div className={Style.body}>
          {/* //! ESTADÍSTICAS */}
          <div className={Style.stats}>
            <div className={Style.ranges}>
              <p>Altura: </p>
              <input
                className={Style.rangeBar}
                onChange={handleInput}
                type="range"
                min={0}
                max={200}
                id="height"
                name="height"
                autoComplete="off"
                value={newPokemon.height}
              />
              <p>{newPokemon.height}</p>
            </div>

            <div className={Style.ranges}>
              <p>Peso: </p>
              <input
                className={Style.rangeBar}
                onChange={handleInput}
                type="range"
                min={0}
                max={200}
                id="weight"
                name="weight"
                autoComplete="off"
                value={newPokemon.weight}
              />
              <p>{newPokemon.weight}</p>
            </div>

            <div className={Style.ranges}>
              <p>Vida: </p>
              <input
                className={Style.rangeBar}
                onChange={handleInput}
                type="range"
                min={0}
                max={200}
                id="hp"
                name="hp"
                autoComplete="off"
                value={newPokemon.hp}
              />
              <p>{newPokemon.hp}</p>
            </div>

            <div className={Style.ranges}>
              <p>Defensa: </p>
              <input
                className={Style.rangeBar}
                onChange={handleInput}
                type="range"
                min={0}
                max={200}
                id="defense"
                name="defense"
                autoComplete="off"
                value={newPokemon.defense}
              />
              <p>{newPokemon.defense}</p>
            </div>

            <div className={Style.ranges}>
              <p>Ataque: </p>
              <input
                className={Style.rangeBar}
                onChange={handleInput}
                type="range"
                min={0}
                max={200}
                id="attack"
                name="attack"
                autoComplete="off"
                value={newPokemon.attack}
              />
              <p>{newPokemon.attack}</p>
            </div>

            <div className={Style.ranges}>
              <p>Velocidad: </p>
              <input
                className={Style.rangeBar}
                onChange={handleInput}
                type="range"
                min={0}
                max={200}
                id="speed"
                name="speed"
                autoComplete="off"
                value={newPokemon.speed}
              />
              <p>{newPokemon.speed}</p>
            </div>
          </div>
          <div className={Style.types}>
            {types ? (
              types.map((t) => {
                return (
                  <div className={Style.checkboxDiv} key={t.id}>
                    <input
                      className={Style.check}
                      type="checkbox"
                      name="types"
                      value={t.id}
                      onChange={handleCheck}
                    />
                    <label>{t.name}</label>
                  </div>
                );
              })
            ) : (
              <h1>Cargando tipos</h1>
            )}
          </div>
        </div>

        {submit && <button className={Style.submit}>Enviar</button>}
      </form>
    </div>
  );
}

export default CreatePok;
