import React from "react";
import Footer from "./footer";
import { store } from "../reducers";
import { setMaxNeighbors } from "../actions/graph";
import { setLanguage } from "../actions/appState";
import { connect } from "react-redux";

function Settings(props) {
  return (
    <div>
      <h1>Settings</h1>
      <form>
        <fieldset>
          <legend>General</legend>
          <label for="language-select">Language</label>
          <select
            id="language-select"
            value={props.language}
            onChange={e => store.dispatch(setLanguage(e.target.value))}
          >
            <option value="english">English</option>
          </select>
        </fieldset>
        <fieldset>
          <legend>Graph</legend>
          <label for="neighbor-limit">Maximum # neighbors / node</label>
          <input
            id="neighbor-limit"
            type="number"
            min="1"
            max="250"
            value={props.maxNeighbors}
            onChange={e =>
              store.dispatch(setMaxNeighbors(parseInt(e.target.value)))
            }
          />
        </fieldset>
      </form>

      <Footer />
    </div>
  );
}

let mapStateToProps = state => ({
  language: state.appState.language,
  maxNeighbors: state.graph.maxNeighbors
});
export default connect(mapStateToProps)(Settings);
