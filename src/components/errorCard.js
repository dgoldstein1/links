import React from "react";
import PropTypes from "prop-types";
import "../css/ErrorCard.css";

function ErrorCard(p) {
  return (
    <div className="errorCardContainer">
      <div className="row">
        <div className="col-sm">
          <div className={"card fluid " + p.type}>
            <h1>{p.type}</h1>
            <p>{p.error}</p>
            <label htlmfor="drawer-control" className="drawer-close" />
            <br />
            <button onClick={p.onAction}>{p.action}</button>
            <button>
              <a href="https://github.com/dgoldstein1/links/issues/new">
                report bug
              </a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

ErrorCard.propTypes = {
  error: PropTypes.string.isRequired,
  action: PropTypes.oneOf(["close", "reload"]).isRequired,
  onAction: PropTypes.func.isRequired,
  type: PropTypes.oneOf(["warning", "error"]).isRequired,
};

export default ErrorCard;
