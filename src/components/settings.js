import React from "react";
import Footer from "./footer";
import { store } from "../reducers";
import { connect } from "react-redux";
import "../css/MainView.css";

function Settings(props) {
  return (
    <div className="about-and-settings">
      <h1>Settings</h1>
      <form>
        <fieldset>
          <legend>General</legend>
          <label for="language-select">Language</label>
          <select
            id="language-select"
            value={props.language}
            onChange={e =>
              store.dispatch({ type: "SET_LANGUAGE", language: e.target.value })
            }
          >
            <option value="english">English</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Graph</legend>
          <label for="neighbor-limit">
            Maximum number of neighbors per node
          </label>
          <input
            id="neighbor-limit"
            type="number"
            min="1"
            max="250"
            value={props.maxNeighbors}
            onChange={e =>
              store.dispatch({
                type: "SET_MAX_NEIGHBORS",
                maxNeighbors: parseInt(e.target.value)
              })
            }
          />
          <br />
          <label for="max-shortest-paths">
            Maximum number of shortest paths
          </label>
          <input
            id="max-shortest-paths"
            type="number"
            min="1"
            max="250"
            value={props.maxShortestPaths}
            onChange={e =>
              store.dispatch({
                type: "SET_MAX_SHORTEST_PATHS",
                maxShortestPaths: parseInt(e.target.value)
              })
            }
          />
        </fieldset>
        <button>
          <a href="https://github.com/dgoldstein1/links/issues/new">
            Report issue or bug
          </a>
        </button>
      </form>

      <Footer />
    </div>
  );
}

let mapStateToProps = state => ({
  language: state.appState.language,
  maxNeighbors: state.graph.maxNeighbors,
  maxShortestPaths: state.graph.maxShortestPaths,
  pathsAreUnique: state.graph.pathsAreUnique
});
export default connect(mapStateToProps)(Settings);
