import { store } from "../reducers/index";
import { fetchAndStoreRandomStartNode } from "./graph";
import { postUserVisit } from "../api/analytics";

// updates which view the app is in
export const UPDATE_VIEW = "UPDATE_VIEW";
export function updateView(view) {
  return {
    type: UPDATE_VIEW,
    view: view
  };
}
export const SET_LOADING = "SET_LOADING";
export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading: loading
  };
}
export const SET_FATAL_ERROR = "SET_FATAL_ERROR";
export function setFatalError(e) {
  return {
    type: SET_FATAL_ERROR,
    fatalError: e
  };
}

export const SET_LANGUAGE = "SET_LANGUAGE";
export function setLanguage(language) {
  return {
    type: SET_LANGUAGE,
    language
  };
}

// initializes app on first load
export function InitAapp(callback = () => {}) {
  store.dispatch(setLoading(true));
  // send info to analytics backend
  postUserVisit();

  fetchAndStoreRandomStartNode(err => {
    if (err) store.dispatch(setFatalError(err));
    store.dispatch(setLoading(false));
    callback();
  });
}
