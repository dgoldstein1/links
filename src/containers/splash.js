import React from "react";
import { updateView } from "../actions/appState";
import { store } from "../reducers";
import LoadingSpinner from "../components/loadingSpinner";
// how long to wait on splash
const SPLASH_TIMEOUT = 10000000;
const LOADING_ANIMATE_TIME = 5000;
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
  let nNodes = getRandomInt(3) + 1;
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
  edges.push({
    source: 100,
    target: 101,
    id: "100 to 101"
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
      graph: _createRandomGraph()
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.setState({ graph: { nodes: [], edges: [] } });
      this.setState({ graph: _createRandomGraph() });
    }, LOADING_ANIMATE_TIME);
    setTimeout(() => {
      store.dispatch(updateView(NEXT_VIEW));
    }, SPLASH_TIMEOUT);
  }

  render() {
    console.log(this.state.graph);
    return (
      <div>
        SPLASH
        <LoadingSpinner graph={this.state.graph} />
      </div>
    );
  }
}

export default Splash;
