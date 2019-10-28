import React from "react";
import { updateView } from "../actions/appState";
import { store } from "../reducers";
import LoadingSpinner from "../components/loadingSpinner";
import { InitAapp } from "../actions/appState";
import "../css/Splash.css";
// how long to wait on splash
const SPLASH_TIMEOUT = 2000;
const LOADING_ANIMATE_TIME = 2000;
// view after splash page
const NEXT_VIEW = "path";
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
/**
 * creates random array of nodes and randomly connects them
 * @return {{nodes : []string, edges : []string}}
 **/
function _createRandomGraph() {
  let nodes = [],
    edges = [];
  // create nodes array
  let nNodes = getRandomInt(8) + 1;
  for (let i = 0; i < nNodes; i++) {
    nodes.push({
      id: i,
      label: i
    });
  }
  // draw at least two nodes and edges
  nodes.push({
    id: 100
  });
  nodes.push({
    id: 101
  });
  nodes.push({
    id: 102
  });
  nodes.push({
    id: 103
  });
  edges.push({
    source: 100,
    target: 101,
    id: "100 to 101"
  });
  edges.push({
    source: 100,
    target: 103,
    id: "100 to 103"
  });
  edges.push({
    source: 103,
    target: 102,
    id: "103 to 102"
  });
  // randomly connect them
  nodes.forEach(n => {
    nodes.forEach(nJ => {
      // randomly connect if is different node
      if (n.id !== nJ.id && getRandomInt(2) === 1) {
        edges.push({
          id: `${n.id} to ${nJ.id}`,
          source: n.id,
          target: nJ.id
        });
      }
    });
  });

  return { nodes, edges };
}

class Splash extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      graph: _createRandomGraph()
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ loading: true });
      this.setState({ loading: false });
    }, LOADING_ANIMATE_TIME);
    // initi app, change view with clalback
    InitAapp(() => {
      setTimeout(() => {
        store.dispatch(updateView(NEXT_VIEW));
      }, SPLASH_TIMEOUT);
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1 className="App-title">Links</h1>
          <p className="App-intro">Make Connections!</p>
        </div>
        <LoadingSpinner
          graph={this.state.graph}
          height={"400px"}
          loading={this.state.loading}
          width={"400px"}
          animationsTime={1200}
        />
        <footer>
          © 2019 David Goldstein |{" "}
          <a href="http://davidcharlesgoldstein.com?ref=links-ui">
            Personal Website
          </a>{" "}
          | <a href="/LICENSE">License</a> | <a href="/VERSION">Version</a>
        </footer>
      </div>
    );
  }
}

export default Splash;
