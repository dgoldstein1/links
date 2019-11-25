import { store } from "../reducers/index";
import { fetchAndStoreRandomStartNode } from "./graph";
import { postUserVisit } from "../api/analytics";

// initializes app on first load
export function InitAapp(callback = () => {}) {
  store.dispatch({ type: "SET_LOADING", loading: true });
  // send info to analytics backend
  postUserVisit();

  fetchAndStoreRandomStartNode(err => {
    if (err) store.dispatch({ type: "SET_GRAPH_ERROR", error: err });
    store.dispatch({ type: "SET_LOADING", loading: false });
    callback();
  });
}
