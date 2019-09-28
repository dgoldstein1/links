import React from "react";
import { Header as H } from "mini.css-react";
import { connect } from "react-redux";
import { store } from "../reducers";
import { updateView } from "../actions/appState";
import { setGraphLayout } from "../actions/graph";
import SearchBar from "./searchBar";
import "../css/MainView.css";

function Header(p) {
  let _getSearchBar = () => {
    if (p.view === "explore") {
      return <SearchBar className="mainBar" placeholder="search" />;
    }
    // p is path
    return (
      <>
        <SearchBar className="halfBar" placeholder="starting at.." />
        <SearchBar className="halfBar" placeholder="ending at.." />
      </>
    );
  };

  return (
    <H sticky className="header">
      <a href="/" className="floatLeft">
        Logo
      </a>
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
      <button
        className="floatRight"
        onClick={() => store.dispatch(updateView("settings"))}
      >
        <span className="icon-settings" />
      </button>
      <button
        className="floatRight"
        onClick={() => store.dispatch(updateView("about"))}
      >
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
