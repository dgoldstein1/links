import React from "react";
import "../css/LoadingSpinner.css";
import ForceLink from "react-sigma/lib/ForceLink";
import { Sigma, EdgeShapes, RelativeSize } from "react-sigma";
import Dagre from "react-sigma/lib/Dagre";
import PropTypes from "prop-types";
import "../css/Graph.css";

function LoadingSpinner(p) {
  function _getGraphFromLayout() {
    if (p.loading === true) {
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

  return (
    <div className="contentContainer">
      <Sigma
        renderer="canvas"
        graph={p.graph}
        settings={{
          flex: 1,
          labelThreshold: 0,
          drawEdges: true,
          clone: false,
          animationsTime: p.animationsTime
        }}
        style={{ height: p.height, width: window.innerWidth + "px" }}
      >
        {_getGraphFromLayout()}
        <RelativeSize initialSize={35} />
        <EdgeShapes default="tapered" />
      </Sigma>
    </div>
  );
}

LoadingSpinner.propTypes = {
  animationTime: PropTypes.number.isRequired,
  graph: PropTypes.object.isRequired,
  height: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  width: PropTypes.string.isRequired
};

export default LoadingSpinner;
