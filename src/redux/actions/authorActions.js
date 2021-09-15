import * as types from "./actionTypes";
import * as authorApi from "../../api/authorApi";
import { beginApiCall, apiCallError } from "./apiStatusActions";

export function loadAuthorsSuccess(authors) {
  return {
    type: types.LOAD_AUTHORS_SUCCESS,
    authors: authors,
  };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((a) => {
        dispatch(loadAuthorsSuccess(a));
      })
      .catch((e) => {
        dispatch(apiCallError(e));
        throw e;
      });
  };
}
