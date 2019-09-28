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
      return <SearchBar placeholder="search.." value={p.rootNode.label} />;
    }
    // p is path
    return (
      <>
        <SearchBar placeholder="starting at.." value={p.rootNode.label} />
        <SearchBar placeholder="ending at.." value={p.targetNode.label} />
      </>
    );
  };

  return (
    <H
      sticky
      className={
        "header " + (p.view === "explore" ? "oneSearchBar" : "twoSearchBars")
      }
    >
      <a href="/" className="floatLeft">
        Logo
      </a>
      <span className="icon-search" />
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
  layout: state.graph.layout,
  rootNode: state.graph.rootNode,
  targetNode: state.graph.targetNode
});
export default connect(mapStateToProps)(Header);
