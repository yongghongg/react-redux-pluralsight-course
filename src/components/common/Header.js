import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  const activeStyle = { color: "#F15B2A" };

  return (
    <div>
      <NavLink
        exact
        to="/"
        activeStyle={activeStyle}
        style={{ textDecoration: "none" }}
      >
        Home
      </NavLink>
      {" | "}
      <NavLink
        to="/courses"
        activeStyle={activeStyle}
        style={{ textDecoration: "none" }}
      >
        Courses
      </NavLink>
      {" | "}
      <NavLink
        to="/about"
        activeStyle={activeStyle}
        style={{ textDecoration: "none" }}
      >
        About
      </NavLink>
    </div>
  );
}
