// appStateActions.js

// store
import { store } from '../reducers/index';

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

export const SET_FATAL_ERROR = 'SET_FATAL_ERROR'
export function setFatalError(e) {
  return {
    type: SET_FATAL_ERROR,
    fatalError : e,
  }
}

// initializes app on first load
export function InitAapp() {
  store.dispatch(setLoading(true))
  // fetch random node
  // fetch all neighbors of node
  // set in store
  store.dispatch(setLoading(false))
}
