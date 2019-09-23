/* eslint-disable import/first */
import React from "react";
import { connect } from "react-redux";
import { Header, Footer } from "mini.css-react";
import Graph from "./graph";
// css
import "../css/MainView.css";

class MainView extends React.Component {
  render() {
    return (
      <>
        <Header sticky>
          <a href="#" className="logo">
            Logo
          </a>
          <button>About</button>
          <button>Contact</button>
          <button>Report Bug</button>
        </Header>
        <div className="container">
          <div className="main-content">
            {this.props.appState.loading && (
              <div className="spinner secondary" />
            )}
            {this.props.appState.fatalError && !this.props.appState.loading && (
              <div className="row">
                <div className="col-sm-12">
                  <div className="card error fluid">
                    <h1>Could not load app</h1>
                    {this.props.appState.fatalError}
                  </div>
                </div>
              </div>
            )}
            {!this.props.appState.fatalError &&
              !this.props.appState.loading && <Graph />}
          </div>
        </div>
        <Footer sticky>
          ©2019 david goldstein |<a href="/VERSION"> version </a> |
          <a href="/LICENSE"> license </a>
        </Footer>
      </>
    );
  }
}

// connect to store
let mapStateToProps = state => state;
export default connect(mapStateToProps)(MainView);
