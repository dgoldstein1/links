import * as ac from "../actions/appState";

const initialState = {
  language: "english",
  loading: true, // the app is / isn't loading
  view: "splash" // one of "path", "splash", "about", "settings"
};

const visitReducer = (state = initialState, action) => {
  switch (action.type) {
    case ac.SET_LANGUAGE:
      return Object.assign({}, state, {
        language: action.language
      });
    // set when the app is loading
    case ac.SET_LOADING:
      return Object.assign({}, state, {
        loading: action.loading === undefined ? false : action.loading
      });
    // update where the user is currently looking
    case ac.UPDATE_VIEW:
      return Object.assign({}, state, {
        view: action.view
      });
    default:
      return state;
  }
};

export default visitReducer;
