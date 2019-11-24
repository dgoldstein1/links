/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import { Sigma, EdgeShapes, RelativeSize } from "react-sigma";
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
import "../css/Graph.css";

const DEBOUNCE_HOVER = 10;

var onHoverDebounced = _.debounce(e => {
  setSelectedNode(e.data.node, false);
}, DEBOUNCE_HOVER);

class Graph extends React.Component {
  constructor() {
    super();
    this._getGraphFromLayout = this._getGraphFromLayout.bind(this);
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
      <div className="contentContainer graidentBackground">
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
        <div className="hiddenScroll">
          {!this.props.loading && !this.props.error && (
            <div className="sigmaContainer">
              <Sigma
                onClickNode={e =>
                  fetchAndStoreNeighbors(e.data.node, () => {}, true)
                }
                onOverNode={onHoverDebounced}
                renderer="canvas"
                graph={this.props.graph}
                settings={{
                  labelThreshold: 0,
                  defaultLabelSize: 50 / this.props.graph.nodes.length + 18,
                  drawEdges: true,
                  drawLabels: this.props.graph.nodes.length < 500,
                  clone: false
                }}
                style={{ height: window.innerHeight - 250 + "px" }}
              >
                {this._getGraphFromLayout()}
                <EdgeShapes default="tapered" />
              </Sigma>
            </div>
          )}
          {this.props.selectedNode.node && <SelectedNodeCard />}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => state.graph;
export default connect(mapStateToProps)(Graph);
