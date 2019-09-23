/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import {Header} from "mini.css-react"
// css
import "../css/MainView.css";

class MainView extends React.Component {
  render(props) {
    return (
        <Header sticky>
          <a logo href='#'>Logo</a>
          <a href='#'>Home</a>
        </Header>
    );
  }
}

// connect to store
let mapStateToProps = state => state;
export default connect(mapStateToProps)(MainView);
