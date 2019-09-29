import { store } from "../reducers/index";
// api
import * as kv from "../api/twowaykv";
import * as graph from "../api/biggraph";
import { _generateRoot } from "../reducers/graph";

export const SET_ROOT_NODE = "SET_ROOT_NODE";
export function setRootNode(node) {
  return {
    type: SET_ROOT_NODE,
    node
  };
}

export const SET_SELECTED_NODE = "SET_SELECTED_NODE";
export function setSelectedNode(node) {
  return {
    type: SET_SELECTED_NODE,
    node
  };
}

export const SET_TARGET_NODE = "SET_TARGET_NODE";
export function setTargetNode(node) {
  return {
    type: SET_TARGET_NODE,
    node
  };
}

export const ADD_NEIGHBORS_TO_GRAPH = "ADD_NEIGHBORS_TO_GRAPH";
export function addNeigborsToGraph(node, neighbors) {
  return {
    type: ADD_NEIGHBORS_TO_GRAPH,
    node,
    neighbors
  };
}

export const SET_GRAPH_LAYOUT = "SET_GRAPH_LAYOUT";
export function setGraphLayout(newLayout) {
  return {
    type: SET_GRAPH_LAYOUT,
    layout: newLayout
  };
}

export const CLEAR_GRAPH = "CLEAR_GRAPH";
export function clearGraph() {
  return { type: CLEAR_GRAPH };
}

export const SET_GRAPH_LOADING = "SET_GRAPH_LOADING";
export function setGraphLoading(val) {
  return {
    type: SET_GRAPH_LOADING,
    newValue: val
  };
}

export const SET_GRAPH_ERROR = "SET_GRAPH_ERROR";
export function setGraphError(error) {
  return {
    type: SET_GRAPH_ERROR,
    error
  };
}

// fetches neighbors of node and adds them to graph
export function fetchAndStoreNeighbors(node, callback = err => {}) {
  let finalCallback = e => {
    if (e) store.dispatch(setGraphError(e));
    store.dispatch(setGraphLoading(false));
    callback(e);
  };
  store.dispatch(setGraphLoading(true));
  graph.getNeighbors(node.id).then(gr => {
    if (!gr.success) return finalCallback(gr.error);
    // neighbor ids => values
    kv.entriesFromValues(gr.data).then(nIds => {
      if (nIds.error) return finalCallback(nIds.error);
      // success! transform data
      nIds.data.entries = nIds.data.entries || [];
      let neighbors = [];
      nIds.data.entries.forEach(n => {
        neighbors.push({
          id: n.value,
          label: n.key
        });
      });
      // set in store
      store.dispatch(setSelectedNode(node));
      store.dispatch(addNeigborsToGraph(node, neighbors));
      return finalCallback();
    });
  });
}

export function setNewRoot(node, callback = () => {}) {
  // clear current graph
  store.dispatch(setGraphLoading(true));
  store.dispatch(clearGraph());
  node = _generateRoot(node.key, node.value);
  fetchAndStoreNeighbors(node, err => {
    if (err) {
      store.dispatch(setGraphError(err));
    } else {
      store.dispatch(setRootNode(node));
    }
    store.dispatch(setGraphLoading(false));
    callback(err);
  });
}

export function setStartPath(node) {
  setNewRoot(node, err => {
    if (!err && store.getState().graph.targetNode !== undefined) {
      // dispatch action to find new path
    }
  });
}

// fetches and stores random starting node and neighbors
// callback called with string error
export function fetchAndStoreRandomStartNode(callback) {
  // fetch random node
  kv.random(1).then(r => {
    if (!r.success) return callback(r.error);
    // fetch neighbors of node
    let node = _generateRoot(r.data[0].key, r.data[0].value);
    store.dispatch(setRootNode(node));
    fetchAndStoreNeighbors(node, callback);
  });
}
