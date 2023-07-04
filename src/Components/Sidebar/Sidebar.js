import React, { useState, useContext } from "react";
import { AiFillPlusCircle } from "react-icons/ai";

import { CartContext } from "../../App";
import "./Sidebar.css";

function Sidebar(props) {
  const { createDummy } = useContext(CartContext);
  const colors = ["#fe9b72", "#fec971", " #00d4fe", "#b693fd", "#e4ee91"];

  const [listOpen, setListOpen] = useState(false);
  return (
    <div className="sidebar">
      <AiFillPlusCircle
        alt="Add"
        onClick={() => setListOpen(!listOpen)}
        className="add-icon"
      />
      <ul className={`sidebar_list ${listOpen ? "sidebar_list_active" : ""}`}>
        {colors.map((item, index) => (
          <li
            key={index}
            className="sidebar_list_item"
            style={{ backgroundColor: item }}
            onClick={() => createDummy(item)}
          />
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
