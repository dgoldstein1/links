import { store } from "../reducers/index";
import { fetchAndStoreRandomStartNode } from "./graph";
import { postUserVisit } from "../api/analytics";
import { makeRequest } from "../api/utils";

// initializes app on first load
export function InitAapp(callback = () => {}) {
  store.dispatch({ type: "SET_LOADING", loading: true });
  // send info to analytics backend
  postUserVisit();
  // fetch config
  makeRequest({
    method: "get",
    url: "/config.json",
  }).then((r) => {
    if (!r.success) {
      store.dispatch({
        type: "SET_GRAPH_ERROR",
        error: "Could not load app configuration file",
      });
    } else {
      store.dispatch({ type: "SET_CONFIG", config: r.data });
      // ping each data source to see if alive
      r.data.supportedGraphs.forEach((g) => {
        makeRequest({
          method: "get",
          url: g.kvEndpoint,
        }).then((r) => {
          store.dispatch({
            type: "SET_GRAPH_IS_AVAILABLE",
            g,
            isAvailable: r.success,
          });
        });
      });
    }
    callback();
  });
}

export function ChooseGraphType(g) {
  store.dispatch({ type: "SET_LOADING", loading: true });
  store.dispatch({ type: "SET_CHOSEN_GRAPH_CONFIG", g });

  fetchAndStoreRandomStartNode((err) => {
    if (err) store.dispatch({ type: "SET_GRAPH_ERROR", error: err });
    store.dispatch({ type: "SET_LOADING", loading: false });
  });
}
