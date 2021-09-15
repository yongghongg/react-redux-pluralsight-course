import * as types from "./actionTypes";
import * as courseApi from "../../api/courseApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function createCourse(course) {
  return {
    type: types.CREATE_COURSE,
    course: course,
  };
}

export function loadCoursesSuccess(courses) {
  return {
    type: types.LOAD_COURSES_SUCCESS,
    courses: courses,
  };
}

export function updateCourseSuccess(course) {
  return {
    type: types.UPDATE_COURSE_SUCCESS,
    course: course, // the name of the property here is extremely important!!! [mistakes: course -> courses]
  };
}

export function createCourseSuccess(course) {
  return {
    type: types.CREATE_COURSE_SUCCESS,
    course: course,
  };
}
export function deleteCourseOptimistic(course) {
  return {
    type: types.DELETE_COURSE_OPTIMISTIC,
    course: course,
  };
}

export function loadCourses() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return courseApi
      .getCourses()
      .then((c) => {
        dispatch(loadCoursesSuccess(c));
      })
      .catch((e) => {
        dispatch(apiCallError(e));
        throw e;
      });
  };
}

export function saveCourse(course) {
  //eslint-disable-next-line no-unused-vars
  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return courseApi
      .saveCourse(course)
      .then((savedCourse) => {
        course.id
          ? dispatch(updateCourseSuccess(savedCourse))
          : dispatch(createCourseSuccess(savedCourse));
      })
      .catch((e) => {
        dispatch(apiCallError(e));
        throw e;
      });
  };
}

export function deleteCourse(course) {
  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
