import { combineReducers } from "redux";
import courses from "./courseReducer"; // import courseReducer as courses (since its a default export)
import authors from "./authorReducer";

const rootReducer = combineReducers({
  courses: courses,
  authors: authors,
});

export default rootReducer;
