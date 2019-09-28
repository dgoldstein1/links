import { SET_LOADING, UPDATE_VIEW, SET_FATAL_ERROR } from "../actions/appState";

const initialState = {
  loading: true, // the app is / isn't loading
  fatalError: undefined, // error which  causes app to not load
  view: "splash" // one of "explore", "path", "splash", "about", "settings"
};

const visitReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FATAL_ERROR:
      return Object.assign({}, state, {
        fatalError: action.fatalError
      });
    // set when the app is loading
    case SET_LOADING:
      return Object.assign({}, state, {
        loading: action.loading === undefined ? false : action.loading
      });
    // update where the user is currently looking
    case UPDATE_VIEW:
      return Object.assign({}, state, {
        view: action.view
      });
    default:
      return state;
  }
};

export default visitReducer;
