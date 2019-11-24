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
      error: `Could not get neighbors :(  ${e.response.data.error}`
    }));
}

/**
 * gets shortest path from one node to anotther
 * @param {node} start
 * @param {node} end
 * @return {promise} {success, error, data}
 **/
export function shortestPath(start, end) {
  let url = encodeURI(
    `services/biggraph/shortestPath?start=${start.id}&end=${end.id}`
  );
  return axios
    .get(url)
    .then(r => ({
      success: true,
      data: r.data
    }))
    .catch(e => ({
      success: false,
      error: `Could not get path from "${start.label}" to "${end.label}": ${
        e.response.data.error
      }`
    }));
}
