import React from "react";
import Footer from "./footer";
import { connect } from "react-redux";
import "../css/MainView.css";

function Top(props) {
  return (
    <div>
      <h1>Structural information for top ranking nodes</h1>
      <table>
        <caption>
          <a href="https://reference.wolfram.com/language/ref/BetweennessCentrality.html">
            Betweeness
          </a>
        </caption>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Node</th>
            <th>Normalized Value</th>
          </tr>
        </thead>
        <tbody>
          {props.topInfo.betweenessNodes.map((n, i) => (
            <tr>
              <td data-label="Rank">{i + 1}</td>
              <td data-label="Node">{props.topInfo.idCache[n.id]}</td>
              <td data-label="Normalized-Value">{n.val}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <table>
        <caption>
          <a href="https://reference.wolfram.com/language/ref/PageRankCentrality.html">
            Page Rank
          </a>
        </caption>
        <tbody>
          {props.topInfo.pageRank.map((n, i) => (
            <tr>
              <td data-label="Rank">{i + 1}</td>
              <td data-label="Node">{props.topInfo.idCache[n.id]}</td>
              <td data-label="Normalized-Value">{n.val}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <table>
        <caption>
          <a href="https://reference.wolfram.com/language/ref/BetweennessCentrality.html">
            Betweeness [Edges]
          </a>
        </caption>
        <thead>
          <tr>
            <th>Rank</th>
            <th>Start Node</th>
            <th>End Node</th>
            <th>Normalized Value</th>
          </tr>
        </thead>
        <tbody>
          {props.topInfo.betweenessEdges.map((n, i) => (
            <tr>
              <td data-label="Rank">{i + 1}</td>
              <td data-label="Start Node">
                {props.topInfo.idCache[n.startId]}
              </td>
              <td data-label="End Node">{props.topInfo.idCache[n.endId]}</td>
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
