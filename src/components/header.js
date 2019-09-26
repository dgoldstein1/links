import React from "react";
import PropTypes from "prop-types";
import { Header as H } from "mini.css-react";
import { connect } from "react-redux";
import { store } from "../reducers";
import { updateView } from "../actions/appState";
import { setGraphLayout } from "../actions/graph";
import "../css/MainView.css";

function Header(p) {
  let _getSearchBar = () => {
    if (p.view === "explore") {
      return <input className="mainBar" type="text" placeholder="search" />;
    }
    // p is path
    return (
      <>
        <input className="halfBar" type="text" placeholder="starting from.." />
        <input className="halfBar" type="text" placeholder="ending at.." />
      </>
    );
  };

  return (
    <H sticky className="header">
      <a className="floatLeft">Logo</a>
      {_getSearchBar()}
      <button
        onClick={() => {
          store.dispatch(updateView(p.view === "explore" ? "path" : "explore"));
        }}
      >
        {p.view === "explore" ? "path" : "explore"}
      </button>
      <button
        onClick={() => {
          store.dispatch(
            setGraphLayout(p.layout === "cluster" ? "hierarchy" : "cluster")
          );
        }}
      >
        {p.layout === "cluster" ? "hierarchy" : "cluster"}
      </button>
      <button className="floatRight">
        <span className="icon-settings" />
      </button>
      <button className="floatRight">
        <span className="icon-help" />
      </button>
    </H>
  );
}

let mapStateToProps = state => ({
  view: state.appState.view,
  layout: state.graph.layout
});
export default connect(mapStateToProps)(Header);
