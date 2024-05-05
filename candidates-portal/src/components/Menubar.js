import React from "react";
import { NavLink } from "react-router-dom";
import "./Menubar.css";

const Menubar = () => {
  return (
    <div className="menu-item">
      <div className="save-icon">
        <NavLink to={"/"}>
          <h3>Job Portal</h3>
        </NavLink>
      </div>
      <div className="save-icon">
        <span>
          <i className="fa-solid fa-filter"></i>
        </span>
        <span>Saved Item</span>
      </div>
    </div>
  );
};

export default Menubar;
