/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import {Header, Footer} from "mini.css-react"
// css
import "../css/MainView.css";

class MainView extends React.Component {
  render(props) {
    return (
      <>
        <Header sticky>
          <a href="#" className="logo">Logo</a>
          <button>About</button>
          <button>Contact</button>
          <button>Report Bug</button>
        </Header>
        <Footer sticky>
          ©2019 david goldstein |
          <a href="/VERSION"> version </a> |
          <a href="/LICENSE"> license </a>
        </Footer>
      </>
    );
  }
}

// connect to store
let mapStateToProps = state => state;
export default connect(mapStateToProps)(MainView);
