import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as courseActions from "../../redux/actions/courseActions";
import * as authorActions from "../../redux/actions/authorActions";
import PropTypes from "prop-types";
import CourseForm from "./CourseForm";
import { newCourse } from "../../../tools/mockData";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

function ManageCoursePage(props) {
  const [course, setCourse] = useState({ ...props.course });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (props.courses.length === 0) {
      props.loadCourses().catch((e) => {
        alert("Loading courses failed: " + e);
      });
    } else {
      // if we do have course available, copy the course passed in on props to state (anytime a new course is passed in!)
      setCourse({ ...props.course });
    }

    if (props.authors.length === 0) {
      props.loadAuthors().catch((e) => {
        alert("Loading authors failed: " + e);
      });
    }
  }, [props.course]);

  function handleChange(e) {
    const { name, value } = e.target; // destructuring here is necessary
    setCourse((prevCourse) => ({
      ...prevCourse,
      [name]: name === "authorId" ? parseInt(value, 10) : value, // if authorId is passed in, parse it into integer
    }));
  }

  function handleSave(e) {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    props
      .saveCourse(course)
      .then(() => {
        toast.success("Course Saved.");
        props.history.push("/courses");
      })
      .catch((e) => {
        setSaving(false);
        setErrors({ onSave: e.message });
      });
  }

  function formIsValid() {
    const { title, authorId, category } = course;
    const errors = {};

    if (!title) errors.title = "Title is required";
    if (!authorId) errors.author = "Author is required";
    if (!category) errors.category = "Category is required";

    setErrors(errors);
    // form is valid if the errors object has no property
    return Object.keys(errors).length === 0;
  }

  return props.authors.length === 0 || props.courses.length === 0 ? (
    <Spinner />
  ) : (
    <CourseForm
      course={course}
      errors={errors}
      authors={props.authors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

// this propTypes has a small letter p
ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  saveCourse: PropTypes.func.isRequired,
  loadCourses: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  courses: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

function getCourseBySlug(courses, slug) {
  return courses.find((c) => c.slug === slug) || null;
}

// determines what part of the state we expose to component
function mapStateToProps(state, ownProps) {
  const slug = ownProps.match.params.slug;
  const course =
    slug && state.courses.length > 0
      ? getCourseBySlug(state.courses, slug)
      : newCourse;
  return {
    course: course,
    courses: state.courses,
    authors: state.authors,
  };
}

// object form of mapDispatchToProps
const mapDispatchToProps = {
  loadCourses: courseActions.loadCourses,
  loadAuthors: authorActions.loadAuthors,
  saveCourse: courseActions.saveCourse,
};

// connect automatically passes dispatch in if we omit mapDispatchToProps here
export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);
