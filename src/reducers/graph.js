import * as ac from "../actions/graph";
import _ from "lodash"

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
      // add on to current graph
      let edges = []
      action.neighbors.forEach(n => {
        edges.push({
          id: `${action.node.id}->-->--${n.id}`,
          source: action.node.id,
          target: n.id,
        })
      });
      // merge into current
      return Object.assign({}, state, {
        graph : {
          nodes : _.merge(state.graph.nodes, action.neighbors),
          edges : _.merge(state.graph.edges, edges)
        }
      });
    default:
      return state;
  }
};

export default visitReducer;
