import React from "react";
import PropTypes from "prop-types";
import "../css/MainView.css";

function Search(p) {
  return <input type="text" {...p} />;
}

Search.propTypes = {
  placeholder: PropTypes.string
};

export default Search;
