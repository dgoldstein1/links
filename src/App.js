// react + redux
import React, { Component } from "react";
import { Provider } from "react-redux";
import { store } from "./reducers/index";

// containers
import MainView from "./containers/mainView";

// actions
import { InitAapp } from "./actions/appState";

class App extends Component {
  componentDidMount() {
    InitAapp();
  }

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <MainView />
        </Provider>
      </div>
    );
  }
}

export default App;
