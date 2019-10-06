import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../css/SelectedNode.css";

const MAX_CHAR_DESCRIPTION = "200";
const WIKIPEDIA_ENDPOINT = "https://en.wikipedia.org/wiki/";

function SelectedNodeCard(sNode) {
  let _renderDescription = () => {
    if (sNode.description.length > MAX_CHAR_DESCRIPTION)
      return (
        <p>
          {sNode.description.substr(0, MAX_CHAR_DESCRIPTION) + "... "}
          <a href={WIKIPEDIA_ENDPOINT + sNode.node.label}>(more)</a>
        </p>
      );
    // else
    return (
      <p>
        {sNode.description + ". "}
        {!sNode.loading && (
          <a href={WIKIPEDIA_ENDPOINT + sNode.node.label}>(more)</a>
        )}
      </p>
    );
  };

  return (
    <div className="centered">
      <div className="row">
        <div className="col-sm">
          <div className={"card fluid"}>
            {sNode.loading && <div className="spinner secondary" />}
            <div>
              <h1>{sNode.node.label}</h1>
              {_renderDescription()}
              {sNode.img && (
                <img
                  src={sNode.img.source}
                  className="section media"
                  style={sNode.img}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

SelectedNodeCard.defaultProps = {
  description: ""
};

let mapStateToProps = state => state.graph.selectedNode;
export default connect(mapStateToProps)(SelectedNodeCard);
