import { combineReducers } from "redux";
import courses from "./courseReducer"; // import courseReducer as courses (since its a default export)

const rootReducer = combineReducers({
  courses: courses,
});

export default rootReducer;
