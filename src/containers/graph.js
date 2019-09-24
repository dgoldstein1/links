/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import { Sigma, EdgeShapes, RandomizeNodePositions } from "react-sigma";
import ForceLink from "react-sigma/lib/ForceLink";
import { fetchAndStoreNeighbors } from "../actions/graph";
import ReactDOM from "react-dom";

class Graph extends React.Component {
  constructor() {
    super();
    this._onNodeClick = this._onNodeClick.bind(this);
  }

  _onNodeClick(e) {
    // add neighbors
    fetchAndStoreNeighbors(e.data.node);
  }

  render() {
    return (
      <>
        {this.props.graph.loading && <div className="spinner secondary" />}
        {!this.props.graph.loading && (
          <Sigma
            onClickNode={this._onNodeClick}
            renderer="canvas"
            renderer="canvas"
            graph={this.props.graph.graph}
            settings={{
              flex: 1,
              labelThreshold: 0,
              drawEdges: true,
              drawEdgeLabels: true,
              clone: false
            }}
            style={{ height: "800px" }}
          >
            <ForceLink
              background
              easing="cubicInOut"
              randomize="locally"
              strongGravityMode={true}
              gravity={0}
            />
            <EdgeShapes default="curvedArrow" />
          </Sigma>
        )}
      </>
    );
  }
}

// connect to store
let mapStateToProps = state => state;
export default connect(mapStateToProps)(Graph);
