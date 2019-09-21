/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
// css
import "../css/MainView.css";

class MainView extends React.Component {
  render(props) {
    return <div>GOT HERE</div>;
  }
}

// connect to store
let mapStateToProps = state => state;
export default connect(mapStateToProps)(MainView);
