/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
// css

class Graph extends React.Component {
  render(props) {
    return <>GRAPH CONTAINER</>;
  }
}

// connect to store
let mapStateToProps = state => state;
export default connect(mapStateToProps)(Graph);
