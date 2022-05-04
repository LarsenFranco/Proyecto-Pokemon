import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearPokemon, getPokemonByID, setSpinnerStatus } from "../Actions";
import NavBar from "./NavBar";
import Spinner from "./Spinner";
import {
  container,
  right,
  left,
  boxTitle,
  boxStats,
  subBar,
  barComplete,
  stats,
  statsTwo,
  typesBox,types
} from "../Styles/PokDetail.module.css";

function PokDetail() {
  let { id } = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSpinnerStatus(true));
    dispatch(getPokemonByID(id));
    return () => {
      dispatch(clearPokemon());
    };
  }, [dispatch]);

  const pokemonStore = useSelector((initialState) => initialState);

  const pokemon = pokemonStore?.pokemon;

  pokemon && console.log(pokemon);

  const spiner = pokemonStore?.spinner;
  return (
    <>
      {pokemonStore && <NavBar types={pokemonStore.types} />}
      {!spiner && pokemon ? (
        <>
          <div className={container}>
            <div className={left}>
              <div className={boxTitle}>
                <h1>{pokemon.name}</h1>
               <div className={types}>
               {pokemon.Types.map((type) =>{
                 return (
                   <div key={type.id} className={typesBox}>
                     <p>{type.name}</p>
                   </div>
                 );
               })}
               </div>
          
              </div>

              <div className={boxStats}>
                <div className={stats}>
                  <div>Vida:</div>
                  <div className={barComplete}  >
                    <div
                      className={subBar}
                      style={{ height: `${pokemon.hp / 2}%` }}
                    ></div>
                    <h2>{pokemon.hp}</h2>
                  </div>
                </div>

                <div className={stats}>
                  <div>Ataque:</div>
                  <div className={barComplete}>
                    <div
                      className={subBar}
                      style={{ height: `${pokemon.attack / 2}%` }}
                    ></div>
                    <h2>{pokemon.attack}</h2>
                  </div>
                </div>

                <div className={stats}>
                  <div>Defensa:</div>
                  <div className={barComplete}>
                    <div
                      className={subBar}
                      style={{ height: `${pokemon.defense / 2}%` }}
                    ></div>
                    <h2>{pokemon.defense}</h2>
                  </div>
                </div>
              </div>
            </div>

            <div className={right}>
              <img src={pokemon.sprites} alt="" />
              <div>
                <div className={statsTwo}>PESO: {pokemon.weight}</div>
                <div className={statsTwo}>ALTURA {pokemon.height}</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default PokDetail;
