/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import { Sigma, RandomizeNodePositions, RelativeSize } from "react-sigma";
import ForceLink from "react-sigma/lib/ForceLink";

class Graph extends React.Component {
  render() {
    return (
      <Sigma
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
