import React from "react";
import Footer from "./footer";
import { connect } from "react-redux";
import "../css/Top.css";

function Top(props) {
  return (
    <div className="main">
      <h1>Structural information for top ranking nodes</h1>
      <br />
      <table className="hoverable top-table">
        <caption className="table-caption">
          <a
            className="table-title"
            href="https://en.wikipedia.org/wiki/PageRank"
          >
            Page Rank
          </a>
          - The probability distribution used to represent the likelihood that a
          person randomly clicking on links will arrive at any particular page.
          Nodes with higher scores have higher centrality and more likely to be
          reached by a random walk.
        </caption>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Node</th>
            <th>Normalized-Value</th>
          </tr>
        </thead>
        <tbody>
          {props.topInfo.pageRank.map((n, i) => (
            <tr key={i}>
              <td data-label="Rank">{i + 1}</td>
              <td data-label="Node">{props.topInfo.idCache[n.id]}</td>
              <td data-label="Normalized-Value">{n.val}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

let mapStateToProps = state => ({
  topInfo: state.graph.topInfo
});
export default connect(mapStateToProps)(Top);
