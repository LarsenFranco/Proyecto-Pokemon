import React from 'react'
import { Link } from "react-router-dom";
import Styles from "../Styles/Landing.module.css"
import image from "../images/pikachu-gif4.gif"


function Landing() {
  // const dispatch = useDispatch();
  return (
    <div className={Styles.container}>
        <h1 className={Styles.title}>Proyecto Individual</h1>
        <div className={Styles.containerButton}>
          <Link to={"/home"}>
                <img src={image} alt="" />
          </Link>
        </div>
    </div>
  )
}

export default Landing