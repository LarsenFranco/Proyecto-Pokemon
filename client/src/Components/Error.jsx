import React, { useEffect } from "react";
import pikachuSad from "../images/pikachu-sad.png";
import { useNavigate } from "react-router-dom";
import { clearPokemon } from "../Actions";
import { useDispatch } from "react-redux";
import Style from "../Styles/Error.module.css";
export default function Error(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(clearPokemon());
      navigate("/home");
    }, 3000);
  }, [dispatch]);

  return (
    <div className={Style.container}>
      <div className={Style.errorBox}>
        <div className={Style.errorTitle}>
          <h1>{props.err.msg}</h1>
        </div>
        <div className={Style.errorImage}>
          <img src={pikachuSad} alt="" />
        </div>
      </div>
    </div>
  );
}
