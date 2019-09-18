import {
  SET_LOADING,
  UPDATE_VIEW
 } from '../actions/appStateActions';

const initialState = {
  loading : true, // the app is / isn't loading
  view : "main" // the current view
};

const visitReducer = (state = initialState, action) => {
  switch (action.type) {
    // set when the app is loading
    case SET_LOADING:
      return Object.assign({}, state, {
        loading : action.loading === undefined ? false : action.loading
      })
  	// update where the user is currently looking
    case UPDATE_VIEW:
      return Object.assign({}, state, {
        view : action.view
      })
    default:
    	return state;
  }
};

export default visitReducer;
