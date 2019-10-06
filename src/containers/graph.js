/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import { Sigma, EdgeShapes } from "react-sigma";
import Dagre from "react-sigma/lib/Dagre";
import ForceLink from "react-sigma/lib/ForceLink";
import {
  fetchAndStoreNeighbors,
  setGraphError,
  setSelectedNode
} from "../actions/graph";
import ErrorCard from "../components/errorCard";
import { store } from "../reducers";
import SelectedNodeCard from "../components/selectedNodeCard";
import _ from "lodash";

const DEBOUNCE_HOVER = 100;

var onHoverDebounced = _.debounce(e => {
  store.dispatch(setSelectedNode(e.data.node, false));
}, DEBOUNCE_HOVER);

class Graph extends React.Component {
  constructor() {
    super();
    this._onNodeClick = this._onNodeClick.bind(this);
    this._onNodeHover = this._onNodeHover.bind(this);
    this._getGraphFromLayout = this._getGraphFromLayout.bind(this);
  }

  _onNodeClick(e) {
    // add neighbors
    fetchAndStoreNeighbors(e.data.node);
  }

  _onNodeHover(e) {}

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
        <div>
          {this.props.selectedNode.node && <SelectedNodeCard />}
          {!this.props.loading && !this.props.error && (
            <Sigma
              onClickNode={this._onNodeClick}
              onOverNode={onHoverDebounced}
              renderer="canvas"
              graph={this.props.graph}
              settings={{
                flex: 1,
                labelThreshold: 0,
                drawEdges: true,
                drawEdgeLabels: true,
                clone: false
              }}
              style={{ height: "1000px" }}
            >
              {this._getGraphFromLayout()}
              <EdgeShapes default="tapered" />
            </Sigma>
          )}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => state.graph;
export default connect(mapStateToProps)(Graph);
