import { store } from "../reducers/index";
// api
import * as kv from "../api/twowaykv";
import * as graph from "../api/biggraph";

export const SET_SELECTED_NODE = "SET_SELECTED_NODE";
export function setSelectedNode(node) {
  return {
    type: SET_SELECTED_NODE,
    node,
  };
}

export const ADD_NEIGHBORS_TO_GRAPH = "ADD_NEIGHBORS_TO_GRAPH"
export function addNeigborsToGraph(node, neighbors) {
  return {
    type : ADD_NEIGHBORS_TO_GRAPH,
    node,
    neighbors,
  }
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
        // success! transform data
        node = {id : node.value, label : node.key}
        nIds.data.entries = nIds.data.entries || []
        let neighbors = nIds.data.entries.forEach(n => ({id : n.value, label : n.key}))
        // set in store
        store.dispatch(setSelectedNode(node))
        store.dispatch(addNeigborsToGraph(node, neighbors))
        return callback()

      });
    });
  });
}
