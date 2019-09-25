import React from "react";
import PropTypes from "prop-types";
import { Header as H } from "mini.css-react";
import { connect } from "react-redux";
import "../css/MainView.css";

function Header(p) {
  return (
    <H sticky className="header">
      <a>Logo</a>
      {p.view === "explore" && <input type="text" placeholder="search" />}
      <button>Mode</button>
      <button>Layout</button>
      <button>
        <span className="icon-settings" />
      </button>
      <button>
        <span className="icon-info" />
      </button>
    </H>
  );
}

Header.propTypes = {};

let mapStateToProps = state => ({
  view: state.appState.view,
  layout: state.graph.layout
});
export default connect(mapStateToProps)(Header);
