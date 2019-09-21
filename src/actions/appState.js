import { store } from "../reducers/index";
// api
import * as kv from "../api/twowaykv";
import * as graph from "../api/biggraph";
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

// fetches and stores random starting node and neighbors
// callback called with string error
export function fetchAndStoreRandomStartNode(callback) {
  // fetch random node
  kv.random(1).then(r => {
    if (!r.success) return callback(r.error);
    // fetch neighbors of node
    let node = r.data[0];
    graph.getNeighbors(node.value).then(gr => {
      if (!gr.success) return callback(gr.error);
      // neighbor ids => values
      kv.entriesFromValues(gr.data).then(nIds => {
        if (nIds.error) return callback(nIds.error);
        console.log(node, nIds.data.entries);
      });
    });
  });
}

// initializes app on first load
export function InitAapp() {
  store.dispatch(setLoading(true));
  fetchAndStoreRandomStartNode(err => {
    if (err) store.dispatch(setFatalError(err));
    store.dispatch(setLoading(false));
  });
}
