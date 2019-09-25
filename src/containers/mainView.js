/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import { Header, Footer } from "mini.css-react";
import Graph from "./graph";
import ErrorCard from "../components/errorCard";
// css
import "../css/MainView.css";

class MainView extends React.Component {
  render() {
    return (
      <div>
        <Header sticky className="centered">
          <button>About</button>
          <button>Contact</button>
          <button>Report Bug</button>
        </Header>
        <div className="container">
          {this.props.loading && <div className="spinner secondary" />}
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

          {!this.props.fatalError && !this.props.loading && <Graph />}
        </div>
        <Footer sticky className="centered">
          ©2019 david goldstein |<a href="/VERSION"> version </a> |
          <a href="/LICENSE"> license </a>
        </Footer>
      </div>
    );
  }
}

// connect to store
let mapStateToProps = state => ({ ...state.appState });
export default connect(mapStateToProps)(MainView);
