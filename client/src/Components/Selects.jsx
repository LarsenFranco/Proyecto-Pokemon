import React from "react";
import { selectBox, select } from "../Styles/Select.module.css";

function Selects(props) {
  return (
    <div className={selectBox}>
      <select
        name="sort"
        onChange={(e) => {
          props.action(e.target.value);
        }}
        className={select}
      >
        <option value="title">{props.title}</option>
        {
        props.options.map((option) =>(
          <option key={option} value={option}>{option}</option>
      ))
      }
      </select>
    </div>
  );
}

export default Selects;
