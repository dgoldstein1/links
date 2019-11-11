import React from "react";
import Footer from "./footer";
import { store } from "../reducers";
import { setMaxNeighbors } from "../actions/graph";
import { connect } from "react-redux";

function Settings(state) {
  return (
    <div>
      <h1>Settings</h1>
      <form>
        <fieldset>
          <legend>Graph</legend>
          <label for="neighbor-limit">Max Neighbors Per Node</label>
          <input
            id="neighbor-limit"
            type="number"
            min="1"
            max="250"
            value={state.maxNeighbors}
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
  maxNeighbors: state.graph.maxNeighbors
});
export default connect(mapStateToProps)(Settings);
