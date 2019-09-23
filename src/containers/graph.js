/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import {
  Sigma,
  EdgeShapes,
  NodeShapes,
  LoadJSON,
  LoadGEXF,
  Filter,
  ForceAtlas2,
  RelativeSize,
  NOverlap,
  RandomizeNodePositions
} from "react-sigma";
import "sigma";

class Graph extends React.Component {
  render() {
    return (
      <>
        <Sigma renderer="canvas" graph={this.props.graph.graph}>
          <NOverlap
            nodeMargin={10}
            scaleNodes={4}
            duration={3000}
            speed={10}
            maxIterations={100}
            gridSize={20}
            easing="quadraticInOut"
          />
          <RelativeSize initialSize={15} />
        </Sigma>
      </>
    );
  }
}

// connect to store
let mapStateToProps = state => state;
export default connect(mapStateToProps)(Graph);
