// react + redux
import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./reducers/index";

// containers
import MainView from "./containers/mainView";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainView />
      </Provider>
    );
  }
}

export default App;
