/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import { Sigma, RandomizeNodePositions, RelativeSize } from "react-sigma";
import ForceLink from "react-sigma/lib/ForceLink";
import { fetchAndStoreNeighbors } from "../actions/graph";

class Graph extends React.Component {
  constructor() {
    super();
    this._onNodeClick = this._onNodeClick.bind(this);
  }

  _onNodeClick(e) {
    // add neighbors
    fetchAndStoreNeighbors(e.data.node, err => {
      console.log(e);
    });
  }

  render() {
    return (
      <Sigma
        onClickNode={this._onNodeClick}
        renderer="canvas"
        renderer="canvas"
        graph={this.props.graph.graph}
        settings={{ drawEdges: true, clone: false }}
        style={{ height: "800px" }}
      >
        <ForceLink
          background
          easing="cubicInOut"
          randomize="locally"
          strongGravityMode={true}
        />
      </Sigma>
    );
  }
}

// connect to store
let mapStateToProps = state => state;
export default connect(mapStateToProps)(Graph);
