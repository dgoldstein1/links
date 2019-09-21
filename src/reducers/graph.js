import * as ac from "../actions/graph";
import _ from "lodash";

const initialState = {
  selectedNode: {},
  graph: {
    nodes: [],
    edges: []
  }
};

const visitReducer = (state = initialState, action) => {
  switch (action.type) {
    case ac.SET_SELECTED_NODE:
      return Object.assign({}, state, {
        selectedNode: action.node
      });
    case ac.ADD_NEIGHBORS_TO_GRAPH:
      // get list of edges to add
      let edgesToAdd = [];
      action.neighbors.forEach(n => {
        edgesToAdd.push({
          id: `${action.node.id}->-->--${n.id}`,
          source: action.node.id,
          target: n.id
        });
      });
      // add in node to make sure it's in list of nodes
      action.neighbors.push(action.node);
      // return state
      return Object.assign({}, state, {
        graph: {
          nodes: _.unionBy(state.graph.nodes, action.neighbors, "id"),
          edges: _.unionBy(state.graph.edges, edgesToAdd, "id")
        }
      });
    default:
      return state;
  }
};

export default visitReducer;
