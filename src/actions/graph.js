import { store } from "../reducers/index";
// api
import * as kv from "../api/twowaykv";
import * as graph from "../api/biggraph";
import * as wiki from "../api/wiki";
import { _generateRoot } from "../reducers/graph";
import _ from "lodash";

export function setSelectedNode(node, animate = true) {
  let selectedNodeId;
  try {
    selectedNodeId = store.getState().graph.selectedNode.node.id;
  } catch {}
  if (node.id === selectedNodeId) return;
  fetchAndStoreSelectedNodeInfo(node, animate);
  store.dispatch({
    type: "SET_SELECTED_NODE",
    node
  });
}

export function setGraphLayout(newLayout) {
  if (store.getState().view !== "path")
    store.dispatch({ type: "UPDATE_VIEW", view: "path" });
  return {
    type: "SET_GRAPH_LAYOUT",
    layout: newLayout
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
  store.dispatch({ type: "SET_SELECTED_NODE_INFO", loading: true });
  if (animate) _animateViews();
  // fetch from api
  wiki.getDescription(node.label).then(r => {
    // get centrality info from graph
    graph.centrality([node.id]).then(centralityR => {
      // set result in store
      store.dispatch({
        type: "SET_SELECTED_NODE_INFO",
        ...r,
        centrality: centralityR.data[node.id],
        loading: false
      });
    });
  });
}

// fetches neighbors of node and adds them to graph
export function fetchAndStoreNeighbors(
  node,
  callback = err => {},
  ignoreEmpty = false
) {
  let finalCallback = e => {
    if (e) store.dispatch({ type: "SET_GRAPH_ERROR", error: e });
    store.dispatch({ type: "SET_GRAPH_LOADING", loading: false });
    callback(e);
  };
  store.dispatch({ type: "SET_GRAPH_LOADING", loading: true });
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
      store.dispatch({ type: "ADD_NEIGHBORS_TO_GRAPH", node, neighbors });
      return finalCallback();
    });
  });
}

// clears graph, finds neighbors, and sets new root
export function setNewRoot(node, callback = () => {}) {
  store.dispatch({ type: "SET_GRAPH_LOADING", loading: true });
  store.dispatch({ type: "CLEAR_GRAPH" });
  node = _generateRoot(node.label, node.id);
  fetchAndStoreNeighbors(node, err => {
    if (err) {
      store.dispatch({ type: "SET_GRAPH_ERROR", error: err });
    } else {
      store.dispatch({ type: "SET_ROOT_NODE", node });
    }
    store.dispatch({ type: "SET_GRAPH_LOADING", loading: false });
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
    store.dispatch({ type: "SET_GRAPH_ERROR", error: e });
    store.dispatch({ type: "SET_GRAPH_LOADING", loading: false });
  };
  setSelectedNode(start);
  store.dispatch({ type: "SET_GRAPH_LOADING", loading: true });
  graph.shortestPath(start, end).then(gr => {
    if (!gr.success) return _errOut(gr.error);
    // path found, get entries from values
    let keysToFetch = _.uniq(_.flatten(gr.data));
    // only get entries in middle, already have beginning and end
    kv.entriesFromValues(keysToFetch).then(kvr => {
      if (!kvr.success) return _errOut(kvr.error);
      // transfrom response to nodes
      store.dispatch({
        type: "SET_GRAPH_PATH",
        paths: gr.data,
        entries: kvr.data.entries || []
      });
      store.dispatch({ type: "SET_GRAPH_LOADING", loading: false });
    });
  });
}

export function setStartPath(node) {
  setNewRoot(node, err => {
    if (store.getState().graph.targetNode.id && !err) {
      fetchAndStorePath(node, store.getState().graph.targetNode);
    }
  });
}

export function setTargetPath(node) {
  store.dispatch({ type: "SET_TARGET_NODE", node });
  if (store.getState().graph.rootNode.id) {
    fetchAndStorePath(store.getState().graph.rootNode, node);
  }
}

const MAX_RETRIES = 25;
// fetches and stores random starting node and neighbors
// callback called with string error
export function fetchAndStoreRandomStartNode(finalCallback, retries = 0) {
  if (retries > MAX_RETRIES)
    return finalCallback(
      "Max retries exceeded finding acceptable starting node"
    );
  // get a bunch of random ids
  kv.random(1).then(kvResponse => {
    if (!kvResponse.success) return finalCallback(kvResponse.error);
    // else try and get node with neighbors
    graph.getNeighbors(kvResponse.data[0].value).then(gResponse => {
      if (gResponse.success && gResponse.data.length > 0) {
        // node found!
        let node = _generateRoot(
          kvResponse.data[0].key,
          kvResponse.data[0].value
        );
        store.dispatch({ type: "SET_ROOT_NODE", node });
        return fetchAndStoreNeighbors(node, finalCallback);
      }
      // otherwise bad node
      fetchAndStoreRandomStartNode(finalCallback, retries + 1);
    });
  });
}

// expands all nodes in the graph
export function expandAll() {
  store.dispatch({ type: "SET_GRAPH_LOADING", loading: true });
  // fetch all neighbors of current nodes
  let nodes = store.getState().graph.graph.nodes;
  let promises = nodes.map(n => graph.getNeighbors(n.id));
  return Promise.all(promises).then(values => {
    // create map of succesfull nodes
    let idsToNewNeighbors = {};
    let idsToFetch = [];
    nodes.forEach((n, i) => {
      if (values[i].success) {
        idsToNewNeighbors[n.id] = values[i].data;
        idsToFetch.push(...values[i].data);
      }
    });
    if (idsToFetch.length === 0) {
      return store.dispatch({ type: "SET_GRAPH_LOADING", loading: false });
    }
    // get values for all the ids we just fetched
    idsToFetch = _.uniq(idsToFetch);
    return kv.entriesFromValues(idsToFetch).then(r => {
      if (!r.success) {
        return store.dispatch({ type: "SET_GRAPH_LOADING", loading: false });
      }
      // create big cache of ids
      let idsToNodes = {};
      r.data.entries.forEach(
        e => (idsToNodes[e.value] = { id: e.value, label: e.key })
      );
      nodes.forEach(n => (idsToNodes[n.id] = n));
      // add each new set of neighbors
      // eslint-disable-next-line no-unused-vars
      for (let id in idsToNewNeighbors) {
        let neighbors = idsToNewNeighbors[id].map(n => idsToNodes[n]);
        store.dispatch({
          type: "ADD_NEIGHBORS_TO_GRAPH",
          node: idsToNodes[id],
          neighbors
        });
      }
      store.dispatch({ type: "SET_GRAPH_LOADING", loading: false });
    });
  });
}

export function fetchAndStoreTop() {
  if (store.getState().appState.topLoading) return;
  store.dispatch({ type: "SET_GRAPH_LOADING", loading: true });
  store.dispatch({ type: "SET_TOP_LOADING", loading: true });
  return graph.top().then(r => {
    if (r.success) {
      // make big cache of ids to store
      let ids = [];
      if (r.data.pageRank) r.data.pageRank.forEach(n => ids.push(n.id));
      ids = _.uniq(ids);
      return kv.entriesFromValues(ids).then(idResp => {
        let idCache = {};
        if (idResp.success) {
          idResp.data.entries.forEach(v => {
            idCache[v.value] = v.key;
          });
        }
        store.dispatch({ type: "SET_TOP_INFO", info: { ...r.data, idCache } });
        store.dispatch({ type: "UPDATE_VIEW", view: "top" });
        store.dispatch({ type: "SET_TOP_LOADING", loading: true });
      });
    }
  });
}
