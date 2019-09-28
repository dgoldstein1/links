import React from "react";
import { updateView } from "../actions/appState";
import { store } from "../reducers";
// how long to wait on splash
const SPLASH_TIMEOUT = 10;
// view after splash page
const NEXT_VIEW = "explore";

class Splash extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      store.dispatch(updateView(NEXT_VIEW));
    }, SPLASH_TIMEOUT);
  }

  render() {
    return <div>SPLASH PAGE</div>;
  }
}

export default Splash;
