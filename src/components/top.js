import React from "react";
import Footer from "./footer";
import { connect } from "react-redux";
import "../css/MainView.css";

function Top(props) {
  return (
    <div>
      <h1>Structural information for top ranking nodes</h1>
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
      <Footer />
    </div>
  );
}

let mapStateToProps = state => ({
  topInfo: state.graph.topInfo
});
export default connect(mapStateToProps)(Top);
