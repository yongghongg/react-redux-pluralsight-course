import React from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="jumbotron jumbotron-fluid">
      <h1>Pluralsight Administration</h1>
      <p>React, Redux and React Router Course</p>
      <Link to="about" className="btn btn-primary btn-lg">
        Learn More
      </Link>
    </div>
  );
}
