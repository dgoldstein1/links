/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import { Sigma, EdgeShapes } from "react-sigma";
import Dagre from "react-sigma/lib/Dagre";
import ForceLink from "react-sigma/lib/ForceLink";
import { fetchAndStoreNeighbors, setGraphError } from "../actions/graph";
import ErrorCard from "../components/errorCard";
import { store } from "../reducers";

class Graph extends React.Component {
  constructor() {
    super();
    this._onNodeClick = this._onNodeClick.bind(this);
    this._getGraphFromLayout = this._getGraphFromLayout.bind(this);
  }

  _onNodeClick(e) {
    // add neighbors
    fetchAndStoreNeighbors(e.data.node);
  }

  _getGraphFromLayout() {
    if (this.props.layout === "hierarchy") {
      return <Dagre directed={true} easing={true} multigraph={true} />;
    }
    // default
    return (
      <ForceLink
        slowDown={1}
        background
        easing="cubicInOut"
        randomize="globally"
        strongGravityMode={true}
        gravity={0}
      />
    );
  }

  render() {
    return (
      <div>
        {this.props.loading && !this.props.error && (
          <div className="spinner secondary" />
        )}
        {!this.props.loading && this.props.error && (
          <ErrorCard
            error={this.props.error}
            action="close"
            onAction={() => store.dispatch(setGraphError(undefined))}
            type="warning"
          />
        )}
        {!this.props.loading && !this.props.error && (
          <div>
            <Sigma
              onClickNode={this._onNodeClick}
              renderer="canvas"
              graph={this.props.graph}
              settings={{
                flex: 1,
                labelThreshold: 0,
                drawEdges: true,
                drawEdgeLabels: true,
                clone: false
              }}
              style={{ height: "700px" }}
            >
              {this._getGraphFromLayout()}
              <EdgeShapes default="tapered" />
            </Sigma>
          </div>
        )}
      </div>
    );
  }
}

// connect to store
let mapStateToProps = state => ({ ...state.graph });
export default connect(mapStateToProps)(Graph);
