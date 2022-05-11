import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPokemons,
  getTypes,
  clearPokemon,
  setSpinnerStatus,
} from "../Actions";
import PokCard from "./PokCard";
import NavBar from "./NavBar";
import { grid, item, container } from "../Styles/Home.module.css";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import Error from "./Error";
function Home() {
  const dispatch = useDispatch();
  const pokemonStore = useSelector((initialState) => initialState);
  const postsPerPage = 12;
  let [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(setSpinnerStatus(true));
    dispatch(getTypes());
    dispatch(getPokemons());
    return () => {
      dispatch(clearPokemon());
    };
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [pokemonStore]);

  const indexLastPage = currentPage * postsPerPage;
  const indexFirstPage = indexLastPage - postsPerPage;
  const currentPokes = pokemonStore?.pokemons.slice(
    indexFirstPage,
    indexLastPage
  );

  const spinner = pokemonStore?.spinner;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      {pokemonStore ? <NavBar types={pokemonStore.types} /> : null}
      {pokemonStore && pokemonStore.error ? (
        <Error err={pokemonStore.error} />
      ) : !spinner ? (
        <div className={container}>
          {pokemonStore ? (
            pokemonStore.pokemon ? (
              <PokCard props={pokemonStore.pokemon} />
            ) : (
              <>
                <Pagination
                  currentPage={currentPage}
                  postsPerPage={postsPerPage}
                  totalPokemons={pokemonStore.allPokemons.length}
                  paginate={paginate}
                />
                <div className={grid}>
                  {currentPokes?.map((po) => (
                    <div key={po.id} className={item}>
                      <PokCard props={po} />
                    </div>
                  ))}
                </div>
              </>
            )
          ) : null}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Home;
