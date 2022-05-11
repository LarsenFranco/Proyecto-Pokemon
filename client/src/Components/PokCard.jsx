import React from "react";
import {
  box,
  types,
  imagen,
  info,
  typesBox,
  top,
  bot,
  visible,
} from "../Styles/Card.module.css";
import { Link } from "react-router-dom";
function PokCard(props) {
  let pok = props.props;
  let idShort=pok.id
 
  function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  if(/[a-zA-Z]/.test(pok.id)){
    console.log(pok.id)
    idShort= idShort.slice(0, 4)
  }  

  return (
    <div className={box}>
      <Link to={`/pokemon/${pok.id}`}>
        <div className={visible}>
          <div className={top}>
            <h1>{capitalize(pok.name)}</h1>
            <h3>{idShort}</h3>
          </div>

          <div className={bot}>
            <img className={imagen} src={pok.sprites} alt="" />
          </div>
        </div>

        <div className={info}>
          <div className={types}>
            {pok.Types.map((t) => {
              return (
                <div className={typesBox} key={t.id}>
                  <p>{capitalize(t.name)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default PokCard;
