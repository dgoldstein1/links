import { store } from "../reducers/index";
import { fetchAndStoreRandomStartNode, setGraphError } from "./graph";
import { postUserVisit } from "../api/analytics";

// initializes app on first load
export function InitAapp(callback = () => {}) {
  store.dispatch({ type: "SET_LOADING", loading: true });
  // send info to analytics backend
  postUserVisit();

  fetchAndStoreRandomStartNode(err => {
    if (err) store.dispatch(setGraphError(err));
    store.dispatch({ type: "SET_LOADING", loading: false });
    callback();
  });
}
