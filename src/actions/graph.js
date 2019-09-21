import { store } from "../reducers/index";
// api
import * as kv from "../api/twowaykv";
import * as graph from "../api/biggraph";

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
