import axios from "axios";
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
  let url = encodeURI(
    `/services/biggraph/neighbors?node=${id}&limit=${
      store.getState().graph.maxNeighbors
    }`
  );
  return axios
    .get(url)
    .then(r => ({
      success: true,
      data: r.data
    }))
    .catch(e => ({
      success: false,
      error: "Could not get neighbor of node " + id + ": " + e.message
    }));
}

export function shortestPath(startId, endId) {
  let url = encodeURI(
    `services/biggraph/shortestPath?start=${startId}&end=${endId}`
  );
  return axios
    .get(url)
    .then(r => ({
      success: true,
      data: r.data
    }))
    .catch(e => ({
      success: false,
      error:
        "could not get path from " + startId + " to " + endId + ": " + e.message
    }));
}
