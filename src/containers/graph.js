/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import {Sigma, RandomizeNodePositions, RelativeSize} from 'react-sigma';

let myGraph = {nodes:[{id:"n1", label:"Alice"}, {id:"n2", label:"Rabbit"}], edges:[{id:"e1",source:"n1",target:"n2",label:"SEES"}]};

class Graph extends React.Component {
  render() {
    return (
      <Sigma graph={this.props.graph.graph} settings={{drawEdges: true, clone: false}}>
  <RelativeSize initialSize={15}/>
  <RandomizeNodePositions/>
</Sigma>
    )
  }
}

// connect to store
let mapStateToProps = state => state;
export default connect(mapStateToProps)(Graph);
