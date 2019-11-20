/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import Graph from "./graph";
import ErrorCard from "../components/errorCard";
import Header from "../components/header";
import Splash from "./splash";
import About from "../components/about";
import Settings from "../components/settings";
// css
import "../css/MainView.css";

class MainView extends React.Component {
  render() {
    return (
      <div id="mainView">
        {this.props.fatalError &&
          !this.props.loading &&
          this.props.view !== "splash" && (
            <div className="centered">
              <ErrorCard
                error={this.props.fatalError}
                action="reload"
                onAction={() => window.location.reload()}
                type="error"
              />
              <a href="https://github.com/dgoldstein1/links/issues/new">
                report bug
              </a>
            </div>
          )}
        {this.props.view === "splash" && <Splash />}
        {!this.props.fatalError &&
          !this.props.loading &&
          this.props.view !== "splash" && (
            <div>
              <Header />
              {this.props.view === "about" && <About />}
              {this.props.view === "settings" && <Settings />}
              {(this.props.view === "explore" ||
                this.props.view === "path") && <Graph />}
            </div>
          )}
      </div>
    );
  }
}

let mapStateToProps = state => ({ ...state.appState });
export default connect(mapStateToProps)(MainView);
