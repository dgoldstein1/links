import React from "react";
import { updateView } from "../actions/appState";
import { store } from "../reducers";
import LoadingSpinner from "../components/loadingSpinner";
// how long to wait on splash
const SPLASH_TIMEOUT = 10000000;
// view after splash page
const NEXT_VIEW = "path";

class Splash extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      store.dispatch(updateView(NEXT_VIEW));
    }, SPLASH_TIMEOUT);
  }

  render() {
    return (
      <div>
        SPLASH
        <LoadingSpinner />
      </div>
    );
  }
}

export default Splash;
