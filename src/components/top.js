import React from "react";
import Footer from "./footer";
import { connect } from "react-redux";
import "../css/Top.css";

function Top(props) {
  return (
    <div className="main">
      <div>
        <h1>"{props.graphName}"</h1>
        {props.graphName === "dev" && (
          <div className="table-intro">
            The 'dev' graph is generated when the links-dev container starts. It
            randomly inserts 100 nodes with a random number of edges each in the
            range 3-5. This is used for local development.
          </div>
        )}
      </div>
      <table className="hoverable top-table">
        <caption className="table-caption">
          <a className="table-title" href="">
            Overall Info
          </a>
          - Overall information on the graph, including average number of in /
          out degrees across the graph, total number of nodes, and total number
          of edges.
        </caption>
        <thead>
          <tr>
            <th>Nodes</th>
            <th>Edges</th>
            <th>Average In-Degree</th>
            <th>Average Out-Degree</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label="Nodes">{props.overallGraphInfo.nNodes}</td>
            <td data-label="Edges">{props.overallGraphInfo.nEdges}</td>
            <td data-label="Average In-Degree">
              {props.overallGraphInfo.avgInDegree}
            </td>
            <td data-label="Average Out-Degree">
              {props.overallGraphInfo.avgOutDegree}
            </td>
          </tr>
        </tbody>
      </table>
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
            <th>Normalized Value</th>
          </tr>
        </thead>
        <tbody>
          {props.topInfo.pageRank.map((n, i) => (
            <tr key={i}>
              <td data-label="Rank">{i + 1}</td>
              <td data-label="Node">{props.topInfo.idCache[n.id]}</td>
              <td data-label="Normalized Value">{n.val}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

let mapStateToProps = state => ({
  topInfo: state.graph.topInfo,
  overallGraphInfo: state.graph.overallGraphInfo,
  graphName: state.appState.graphConfig.name
});
export default connect(mapStateToProps)(Top);
