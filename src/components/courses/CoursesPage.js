import React, { useState } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";

function CoursesPage(props) {
  const [course, setCourse] = useState({ title: "" });

  const handleChange = (event) => {
    const course = { ...course, title: event.target.value };
    setCourse(course);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.actions.createCourse(course);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Courses</h2>
      <h3>Add Course</h3>
      <input type="text" onChange={handleChange} value={course.title} />
      <input type="submit" value="Save" />
      {props.courses.map((c) => (
        <div key={c.title}>{c.title}</div>
      ))}
    </form>
  );
}

// this propTypes has a small letter p
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired, // dispatch is required to pass in as a prop
  courses: PropTypes.array.isRequired,
};

// determines what part of the state we expose to component
function mapStateToProps(state) {
  return {
    courses: state.courses,
  };
}

// a cleaner way to pass dipatch function to props (instead of calling dispatch directly)
function mapDispatchToProps(dispatch) {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),
    actions: bindActionCreators(courseActions, dispatch),
  };
}

// connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
