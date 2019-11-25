import React from "react";
import { updateView } from "../actions/appState";
import { store } from "../reducers";
import LoadingSpinner from "../components/loadingSpinner";
import { InitAapp } from "../actions/appState";
import Footer from "../components/footer";
// how long to wait on splash
const SPLASH_TIMEOUT = 5000;
const LOADING_ANIMATE_TIME = 2000;
// view after splash page
const NEXT_VIEW = "path";
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function _getNodesForRandomGraph() {
  let nodes = [];
  let nNodes = getRandomInt(8) + 1;
  for (let i = 0; i < nNodes; i++) {
    nodes.push({
      id: i,
      label: i
    });
  }
  // connect at least a few nodes in 10x range
  for (let i = 100; i < 105; i++) {
    nodes.push({
      id: i
    });
  }
  return nodes;
}

export function _getRandomEdges() {
  let edges = [];
  for (let i = 100; i < 103; i++) {
    edges.push({
      source: i,
      target: i + 1,
      id: `${i} to ${i + 1}`
    });
  }
  return edges;
}

/**
 * creates random array of nodes and randomly connects them
 * @return {{nodes : []string, edges : []string}}
 **/
export function _createRandomGraph() {
  let nodes = _getNodesForRandomGraph(),
    edges = _getRandomEdges();
  // create nodes array
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
      loading: false,
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
          width={"700px"}
          loading={this.state.loading}
          animationsTime={1000}
        />
        <Footer />
      </div>
    );
  }
}

export default Splash;
