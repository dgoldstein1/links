import React from "react";
import { connect } from "react-redux";
import "../css/SelectedNode.css";

const MAX_CHAR_DESCRIPTION = 200;
const WIKIPEDIA_ENDPOINT = "https://en.wikipedia.org/wiki/";

function SelectedNodeCard(graph) {
  let sNode = graph.selectedNode;
  let _renderDescription = () => {
    if (!sNode.description) return "";
    if (sNode.description.length > MAX_CHAR_DESCRIPTION)
      return (
        <p>
          {sNode.description.substr(0, MAX_CHAR_DESCRIPTION) + "... "}
          <a href={WIKIPEDIA_ENDPOINT + sNode.node.label}>(more)</a>
        </p>
      );
    // else
    return (
      <p>{sNode.description.length === 0 ? sNode.error : sNode.description}</p>
    );
  };
  return (
    <div className="selectedCardContainer">
      {!graph.error && (
        <div className="row">
          <div className="col-sm">
            <div className={"card fluid"}>
              {sNode.loading && <div className="spinner secondary" />}
              <div>
                <h1>
                  <a href={WIKIPEDIA_ENDPOINT + sNode.node.label}>
                    {sNode.node.label}
                  </a>
                </h1>
                {_renderDescription()}
                {sNode.img && (
                  <img
                    alt="node img"
                    src={sNode.img.source}
                    className="section media"
                    style={sNode.img}
                  />
                )}
                {sNode.centrality && Object.keys(sNode.centrality).length > 1 && (
                  <div className="inner-table">
                    <table>
                      <thead>
                        <tr>
                          <th>
                            <a href="https://reference.wolfram.com/language/ref/ClosenessCentrality.html">
                              closness
                            </a>
                          </th>
                          <th>
                            <a href="https://reference.wolfram.com/language/ref/DegreeCentrality.html">
                              degree centrality
                            </a>
                          </th>
                          <th>
                            <a href="http://mathworld.wolfram.com/GraphEccentricity.html">
                              eccentricity
                            </a>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td data-label="closeness">
                            {sNode.centrality.closeness}
                          </td>
                          <td data-label="degree">{sNode.centrality.degree}</td>
                          <td data-label="eccentricity">
                            {sNode.centrality.eccentricity}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

SelectedNodeCard.defaultProps = {
  description: "",
  error: ""
};

let mapStateToProps = state => state.graph;
export default connect(mapStateToProps)(SelectedNodeCard);
