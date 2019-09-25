import React from "react";
import PropTypes from "prop-types";
import { Header as H } from "mini.css-react";

function Header(p) {
  return (
    <H sticky className="centered">
      <button>About</button>
      <button>Contact</button>
      <button>Report Bug</button>
    </H>
  );
}

Header.propTypes = {};

export default Header;
