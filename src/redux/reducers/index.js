import { combineReducers } from "redux";
import courses from "./courseReducer"; // import courseReducer as courses (since its a default export)
import authors from "./authorReducer";
import apiCallsInProgress from "./apiStatusReducer";

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
  apiCallsInProgress: apiCallsInProgress,
});

export default rootReducer;
