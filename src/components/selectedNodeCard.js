import React from "react";
import PropTypes from "prop-types";
import "../css/SelectedNode.css";

function SelectedNodeCard(p) {
  return (
    <div className="selectedCardContainer">
      <div className="row">
        <div className="col-sm">
          <div className={"card fluid " + p.type}>
            <h1>TEST</h1>
            <p>TEST1</p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Donboscocambodia0001.JPG/440px-Donboscocambodia0001.JPG"
              className="section media"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

SelectedNodeCard.propTypes = {};

export default SelectedNodeCard;
