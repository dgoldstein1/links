import React from "react";
import { Header as H } from "mini.css-react";
import { connect } from "react-redux";
import { store } from "../reducers";
import { updateView } from "../actions/appState";
import { setGraphLayout, setStartPath, setTargetPath } from "../actions/graph";
import SearchBar from "./searchBar";
import "../css/MainView.css";
import titleImage from "../images/title.png";

function Header(p) {
  return (
    <H sticky className={"header twoSearchBars"}>
      <a href="/" className="floatLeft">
        <img alt="logo" src={titleImage} className="logo" />
      </a>

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

      <button
        onClick={() =>
          setStartPath({ id: p.rootNode.id, label: p.rootNode.label })
        }
      >
        <span className="icon-search" />
        search
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
  layout: state.graph.layout,
  rootNode: state.graph.rootNode,
  targetNode: state.graph.targetNode
});
export default connect(mapStateToProps)(Header);
