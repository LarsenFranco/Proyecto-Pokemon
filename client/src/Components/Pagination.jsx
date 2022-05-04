import React from "react";
import { btns, botonera, active } from "../Styles/Pagination.module.css";
const Pagination = ({ postsPerPage, totalPokemons, paginate,currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokemons / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={botonera}>
      {pageNumbers.map((number) => (
        <button className={currentPage == number ? `${btns} ${active}` : btns} key={number} onClick={() => paginate(number)}>
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
