/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import Graph from "./graph";
import ErrorCard from "../components/errorCard";
import Header from "../components/header";
// css
import "../css/MainView.css";

class MainView extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          {this.props.loading && <div className="spinner secondary centered" />}
          {this.props.fatalError && !this.props.loading && (
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
          {!this.props.fatalError && !this.props.loading && (
            <div>
              <Header />
              <Graph />
            </div>
          )}
        </div>
      </div>
    );
  }
}

let mapStateToProps = state => ({ ...state.appState });
export default connect(mapStateToProps)(MainView);
