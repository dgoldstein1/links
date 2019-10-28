import React from "react";
import { Header as H } from "mini.css-react";
import { connect } from "react-redux";
import { store } from "../reducers";
import { updateView } from "../actions/appState";
import {
  setGraphLayout,
  setNewRoot,
  setStartPath,
  setTargetPath
} from "../actions/graph";
import SearchBar from "./searchBar";
import "../css/MainView.css";
import logo from "../images/logo.png";

function Header(p) {
  let _getSearchBar = () => {
    if (p.view === "explore") {
      return (
        <SearchBar
          placeholder="search.."
          onSelect={setNewRoot}
          value={p.rootNode}
        />
      );
    }
    // p is path
    return (
      <>
        <SearchBar
          placeholder="starting at.."
          onSelect={setStartPath}
          value={p.rootNode}
        />
        <SearchBar
          placeholder="ending at.."
          onSelect={setTargetPath}
          value={p.targetNode}
        />
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
      <img alt="logo" src={logo} style={{ width: "70px" }} />
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
