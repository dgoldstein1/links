import { makeRequest } from "./utils";
import { store } from "../reducers";
/**
 * @param {int} id
 * @return JSON {
    success: bool,
    data : []int
    error : string
  }
 **/
export function getNeighbors(id) {
  return makeRequest({
    method: "get",
    url: `${
      store.getState().appState.graphConfig.graphEndpoint
    }/neighbors?node=${id}&limit=${store.getState().graph.maxNeighbors}`,
    onErrorPrefix: "Could not get neighbors",
  });
}

/**
 * gets shortest path from one node to anotther
 * @param {node} start
 * @param {node} end
 * @param {number} max number of paths to fetch
 * @param {bool} should all nodes be unique?
 * @return {promise} {success, error, data}
 **/
export function shortestPath(start, end) {
  return makeRequest({
    method: "get",
    url: `${
      store.getState().appState.graphConfig.graphEndpoint
    }/shortestPath?start=${start.id}&end=${end.id}&n=${
      store.getState().graph.maxShortestPaths
    }&directed=${store.getState().graph.directedShortestPath}`,
    onErrorPrefix: `Could not get path from "${start.label}" to "${end.label}"`,
  });
}

export function centrality(nodes = []) {
  return makeRequest({
    method: "post",
    url: `${store.getState().appState.graphConfig.graphEndpoint}/centrality`,
    body: nodes,
  });
}

export function overallGraphData() {
  return makeRequest({
    method: "get",
    url: `${store.getState().appState.graphConfig.graphEndpoint}/info`,
  }).then((r) => {
    return makeRequest({
      method: "get",
      url: `${store.getState().appState.graphConfig.graphEndpoint}/top`,
    }).then((d) => {
      return Promise.resolve({
        success: r.success && d.success,
        top: d.data,
        info: r.data,
      });
    });
  });
}
