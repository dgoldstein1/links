import React, { useState } from "react";
import "../css/LoadingSpinner.css";
import ForceLink from "react-sigma/lib/ForceLink";
import { Sigma, EdgeShapes, RelativeSize } from "react-sigma";

function LoadingSpinner() {
  const [graph, setGraph] = useState({ nodes: [], edges: [] });

  return (
    <Sigma
      renderer="canvas"
      graph={graph}
      settings={{
        flex: 1,
        labelThreshold: 0,
        drawEdges: true,
        drawLabels: false,
        clone: false
      }}
      style={{ height: "1000px" }}
    >
      <ForceLink
        slowDown={1}
        background
        easing="cubicInOut"
        randomize="globally"
        strongGravityMode={true}
        gravity={0}
      />
      <RelativeSize initialSize={35} />
      <EdgeShapes default="tapered" />
    </Sigma>
  );
}

export default LoadingSpinner;
