import React, { useState } from "react";
import "../css/LoadingSpinner.css";
import ForceLink from "react-sigma/lib/ForceLink";
import { Sigma, EdgeShapes, RelativeSize } from "react-sigma";

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
  return { nodes, edges };
}

function LoadingSpinner() {
  const [graph, setGraph] = useState(_createRandomGraph());
  console.log("rendering");
  setTimeout(() => {
    setGraph({ nodes: [], edges: [] });
    setGraph(_createRandomGraph());
  }, 5000);

  console.log(graph);

  return (
    <>
      {graph.nodes === [] && <div>TEST</div>}
      {graph.nodes.length > 0 && (
        <Sigma
          renderer="canvas"
          graph={graph}
          settings={{
            flex: 1,
            labelThreshold: 0,
            drawEdges: true,
            // drawLabels: false,
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
      )}
    </>
  );
}

export default LoadingSpinner;
