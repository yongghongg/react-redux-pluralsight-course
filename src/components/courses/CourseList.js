import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function CourseList({ courses }) {
  return (
    <table>
      <thead>
        <tr>
          <th />
          <th>Title</th>
          <th>Author</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>
        {courses.map((c) => {
          return (
            <tr key={c.id}>
              <td>
                <a
                  className="btn btn-light"
                  href={"http://pluralsight.com/courses/" + c.slug}
                >
                  Watch
                </a>
              </td>
              <td>
                <Link to={"/course/" + c.slug}>{c.title}</Link>
              </td>
              <td>{c.authorName}</td>
              <td>{c.category}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array,
};
