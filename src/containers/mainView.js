/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import Graph from "./graph";
import Header from "../components/header";
import Splash from "./splash";
import About from "../components/about";
import Settings from "../components/settings";
import Top from "../components/top";
// css
import "../css/MainView.css";

class MainView extends React.Component {
  render() {
    return (
      <div id="mainView">
        {this.props.view === "splash" && <Splash />}
        {!this.props.loading && this.props.view !== "splash" && (
          <div>
            <Header />
            {this.props.view === "about" && <About />}
            {this.props.view === "settings" && <Settings />}
            {this.props.view === "path" && <Graph />}
            {this.props.view === "top" && <Top />}
          </div>
        )}
      </div>
    );
  }
}

let mapStateToProps = state => ({ ...state.appState });
export default connect(mapStateToProps)(MainView);
