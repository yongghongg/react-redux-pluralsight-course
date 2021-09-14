import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
function CoursesPage(props) {
  useEffect(() => {
    if (props.courses === undefined || props.courses.length === 0) {
      props.actions.loadCourses().catch((e) => {
        alert("Loading courses failed: " + e);
      });
    }

    if (props.authors === undefined || props.authors.length === 0) {
      props.actions.loadAuthors().catch((e) => {
        alert("Loading authors failed: " + e);
      });
    }
  }, []);

  // const [course, setCourse] = useState({ title: "" });

  // const handleChange = (event) => {
  //   const course = { ...course, title: event.target.value };
  //   setCourse(course);
  // };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   props.actions.createCourse(course);
  // };

  return (
    // <form onSubmit={handleSubmit}>
    <div>
      <h2>Courses</h2>
      <CourseList courses={props.courses} />
      {/* <h3>Add Course</h3> */}
      {/* <input type="text" onChange={handleChange} value={course.title} />
      <input type="submit" value="Save" /> */}
      {/* {props.courses.map((c) => (
        <div key={c.title}>{c.title}</div>
      ))} */}
      {/* // </form> */}
    </div>
  );
}

// this propTypes has a small letter p
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired, // dispatch is required to pass in as a prop
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
};

// determines what part of the state we expose to component
function mapStateToProps(state) {
  return {
    courses:
      state.authors.length === 0
        ? []
        : state.courses.map((c) => {
            // map through each course and add author name to each course
            return {
              ...c,
              authorName: state.authors.find((a) => a.id === c.authorId).name,
            };
          }),
    author: state.authors,
  };
}

// a cleaner way to pass dipatch function to props (instead of calling dispatch directly)
function mapDispatchToProps(dispatch) {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
    },
  };
}

// connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
