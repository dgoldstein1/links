import { store } from "../reducers/index";
// api
import * as kv from "../api/twowaykv";
import * as graph from "../api/biggraph";
import * as wiki from "../api/wiki";
import { _generateRoot } from "../reducers/graph";

export const SET_ROOT_NODE = "SET_ROOT_NODE";
export function setRootNode(node) {
  return {
    type: SET_ROOT_NODE,
    node
  };
}

export const SET_MAX_NEIGHBORS = "SET_MAX_NEIGHBORS";
export function setMaxNeighbors(maxNeighbors) {
  return {
    type: SET_MAX_NEIGHBORS,
    maxNeighbors
  };
}

export const SET_SELECTED_NODE_INFO = "SET_SELECTED_NODE_INFO";
export function setSelectedNodeInfo(info) {
  return {
    type: SET_SELECTED_NODE_INFO,
    ...info
  };
}

export const SET_SELECTED_NODE = "SET_SELECTED_NODE";
export function setSelectedNode(node, animate = true) {
  let selectedNodeId;
  try {
    selectedNodeId = store.getState().graph.selectedNode.node.id;
  } catch {}
  if (node.id === selectedNodeId) return;
  fetchAndStoreSelectedNodeInfo(node, animate);
  store.dispatch({
    type: SET_SELECTED_NODE,
    node
  });
}

export const SET_TARGET_NODE = "SET_TARGET_NODE";
export function setTargetNode(node) {
  return {
    type: SET_TARGET_NODE,
    node
  };
}

export const ADD_NEIGHBORS_TO_GRAPH = "ADD_NEIGHBORS_TO_GRAPH";
export function addNeighborsToGraph(node, neighbors) {
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

export const SET_GRAPH_PATH = "SET_GRAPH_PATH";
export function setGraphPath(path) {
  return {
    type: SET_GRAPH_PATH,
    path
  };
}

export const GRAPH_ANIMATE_TIME = 1500;
export function _animateViews() {
  store.dispatch(setGraphLayout("hierarchy"));
  setTimeout(() => {
    store.dispatch(setGraphLayout("cluster"));
  }, GRAPH_ANIMATE_TIME);
}

/**
 * fetches and store selected node information from wikipedia
 * @param node {node}
 **/
export function fetchAndStoreSelectedNodeInfo(node, animate) {
  // set as loading
  store.dispatch(setSelectedNodeInfo({ loading: true }));
  if (animate) _animateViews();
  // fetch from api
  wiki.getDescription(node.label).then(r => {
    // set result in store
    store.dispatch(
      setSelectedNodeInfo({
        ...r,
        loading: false
      })
    );
  });
}

// fetches neighbors of node and adds them to graph
export function fetchAndStoreNeighbors(
  node,
  callback = err => {},
  ignoreEmpty = false
) {
  let finalCallback = e => {
    if (e) store.dispatch(setGraphError(e));
    store.dispatch(setGraphLoading(false));
    callback(e);
  };
  store.dispatch(setGraphLoading(true));
  graph.getNeighbors(node.id).then(gr => {
    if (!gr.success) return finalCallback(gr.error);
    // don't do anything if no neighbors
    if (gr.data.length === 0 && ignoreEmpty)
      return finalCallback("no neighbors found for node '" + node.label + "'");
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
      setSelectedNode(node);
      store.dispatch(addNeighborsToGraph(node, neighbors));
      return finalCallback();
    });
  });
}

// clears graph, finds neighbors, and sets new root
export function setNewRoot(node, callback = () => {}) {
  store.dispatch(setGraphLoading(true));
  store.dispatch(clearGraph());
  node = _generateRoot(node.label, node.id);
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

/**
 * fetches and stores new path in store
 * @param start {node}
 * @param end {node}
 **/
export function fetchAndStorePath(start, end) {
  // inner helper function
  let _errOut = e => {
    store.dispatch(setGraphError(e));
    store.dispatch(setGraphLoading(false));
  };
  setSelectedNode(start);
  store.dispatch(setGraphLoading(true));
  graph.shortestPath(start.id, end.id).then(r => {
    if (!r.success) return _errOut(r.error);
    // path found, get entries from values
    // only get entries in middle, already have beginning and end
    kv.entriesFromValues(r.data.slice(1, -1)).then(r => {
      if (!r.success) return _errOut(r.error);
      // transfrom response to nodes
      r.data.entries = r.data.entries || [];
      let nodePath = r.data.entries.map(e => ({ id: e.value, label: e.key }));
      // insert root and end into array for sanity
      nodePath = [start, ...nodePath, end];
      // clear graph and set new path
      store.dispatch(setGraphPath(nodePath));
      store.dispatch(setGraphLoading(false));
    });
  });
}

export function setStartPath(node) {
  // target node in store, find path
  if (store.getState().graph.targetNode.id) {
    return fetchAndStorePath(node, store.getState().graph.targetNode);
  }
  // else set new root
  setNewRoot(node);
}

export function setTargetPath(node) {
  store.dispatch(setTargetNode(node));
  if (store.getState().graph.rootNode.id) {
    fetchAndStorePath(store.getState().graph.rootNode, node);
  }
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
