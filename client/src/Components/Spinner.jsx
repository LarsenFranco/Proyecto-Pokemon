import React from "react";
import Style from "../Styles/Spinner.module.css";

function Spinner() {
  return (
    <div className={Style.center}>
      <div className={Style.pokeball}>
        <div className={Style.pokebutton}></div>
      </div>
    </div>
  );
}

export default Spinner;
