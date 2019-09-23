/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import Sigma from "react-sigma/lib/Sigma";
import NOverlap from "react-sigma/lib/NOverlap";
import RandomizeNodePositions from "react-sigma/lib/RandomizeNodePositions";
import RelativeSize from "react-sigma/lib/RelativeSize";
import ForceAtlas2 from "react-sigma/lib/ForceAtlas2";
import EdgeShapes from "react-sigma/lib/EdgeShapes";
import NodeShapes from "react-sigma/lib/NodeShapes";
import ForceLink from "react-sigma/lib/ForceLink";

const nodes = [
  { id: 0, label: "Fonte 1", x: 1, y: 1, size: 10 },
  { id: 1, label: "Fonte 2", x: 1, y: 10, size: 10 },
  { id: 2, label: "Barra", x: 10, y: 5, size: 10 },
  { id: 3, label: "Carga 1", x: 20, y: 1, size: 10 },
  { id: 4, label: "Carga 2", x: 20, y: 10, size: 10 }
];

const edges = [
  { id: 1, source: 0, target: 2, label: "a" },
  { id: 2, source: 1, target: 2, label: "b" },
  { id: 100, source: 2, target: 3, label: "c" },
  { id: 101, source: 2, target: 4, label: "d" }
];

class Graph extends React.Component {
  render() {
    return <Sigma graph={{ nodes, edges }} settings={{ drawEdges: true }} />;
  }
}

// connect to store
let mapStateToProps = state => state;
export default connect(mapStateToProps)(Graph);
