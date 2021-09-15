import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import CourseList from "./CourseList";
import { Redirect } from "react-router";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function CoursesPage(props) {
  const [redirectToAddCourse, setRedirectToAddCourse] = useState(false);

  useEffect(() => {
    if (props.courses.length === 0) {
      props.actions.loadCourses().catch((e) => {
        alert("Loading courses failed: " + e);
      });
    }

    if (props.authors.length === 0) {
      props.actions.loadAuthors().catch((e) => {
        alert("Loading authors failed: " + e);
      });
    }
  }, []);

  // async/await style
  async function handleDeleteCourse(course) {
    toast.success("Course deleted");
    try {
      await props.actions.deleteCourse(course);
    } catch (error) {
      toast.error("Delete failed: " + error.message, { autoClose: false });
    }
  }

  // function handleDeleteCourse(course) {
  //   toast.success("Course deleted");
  //   props.actions.deleteCourse(course).catch((error) => {
  //     toast.error("Delete failed: " + error.message, { autoClose: false });
  //   });
  // }

  return (
    <div>
      {redirectToAddCourse && <Redirect to="/course" />}
      <h2>Courses</h2>
      {props.loading ? (
        <Spinner />
      ) : (
        <>
          <button
            className="btn btn-primary add-course"
            onClick={() => setRedirectToAddCourse(true)}
          >
            Add Course
          </button>

          <CourseList
            onDeleteClick={handleDeleteCourse}
            courses={props.courses}
          />
        </>
      )}
    </div>
  );
}

// this propTypes has a small letter p
CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired, // dispatch is required to pass in as a prop
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
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
              authorName:
                state.authors.find((a) => a.id === c.authorId).name || null,
            };
          }),
    authors: state.authors,
    loading: state.apiCallsInProgress > 0,
  };
}

// a cleaner way to pass dipatch function to props (instead of calling dispatch directly)
function mapDispatchToProps(dispatch) {
  return {
    // createCourse: (course) => dispatch(courseActions.createCourse(course)),
    actions: {
      loadCourses: bindActionCreators(courseActions.loadCourses, dispatch),
      loadAuthors: bindActionCreators(authorActions.loadAuthors, dispatch),
      deleteCourse: bindActionCreators(courseActions.deleteCourse, dispatch),
    },
  };
}

// connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);
