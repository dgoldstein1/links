// appStateActions.js

/**
 * actions updating the curren app's state
 * created by David Goldstein on 2/8/2018
 **/

// updates which view the app is in
export const UPDATE_VIEW = 'UPDATE_VIEW';
export function updateView(view) {
  return {
    type: UPDATE_VIEW,
    view : view
  };
}

export const SET_LOADING = 'SET_LOADING';
export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading : loading
  };
}


// initializes app on first load
export function InitAapp() {
	// fetch things from API here
}
