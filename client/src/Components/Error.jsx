import React, { useEffect } from "react";
import pikachuSad from "../images/pikachu-sad.png";
import pikachuHappy from "../images/happyPokemon.png";
import { useNavigate } from "react-router-dom";
import { clearPokemon } from "../Actions";
import { useDispatch } from "react-redux";
import Style from "../Styles/Error.module.css";

export default function Error(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let imagen = pikachuSad;
  let  estilo={backgroundColor: 'rgba(255, 0, 0, 0.314)'}
  if(!props.err.fail){
    imagen=pikachuHappy
    estilo={backgroundColor: 'rgba(0, 255, 38, 0.314)'}
  }
  useEffect(() => {
    setTimeout(() => {
      dispatch(clearPokemon());
      navigate("/home");
    }, 3000);
  }, [dispatch]);





  return (
    <div className={Style.container} style={estilo}>
      <div className={Style.errorBox}>
        <div className={Style.errorTitle}>
          <h1>{props.err.msg}</h1>
        </div>
        <div className={Style.errorImage}>
          <img src={imagen} alt="" />
        </div>
      </div>
    </div>
  );
}
