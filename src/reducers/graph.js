import * as ac from "../actions/graph";
import _ from "lodash";

const ROOT_NODE_SIZE = 10000;

const initialState = {
  rootNode: {},
  graph: {
    nodes: [],
    edges: []
  },
  loading: false,
  error: undefined,
  layout: "hierarchy"
};

const visitReducer = (state = initialState, action) => {
  switch (action.type) {
    case ac.SET_GRAPH_ERROR:
      return Object.assign({}, state, {
        error: action.error
      });
    case ac.SET_GRAPH_LAYOUT:
      return Object.assign({}, state, {
        layout: action.layout
      });
    case ac.SET_GRAPH_LOADING:
      return Object.assign({}, state, {
        loading: action.newValue
      });
    case ac.SET_ROOT_NODE:
      return Object.assign({}, state, {
        rootNode: _generateRoot(action.node.id, action.node.label)
      });
    case ac.ADD_NEIGHBORS_TO_GRAPH:
      // set initial position to source
      action.neighbors = action.neighbors.map(n => ({
        ...n,
        x: action.node.x,
        y: action.node.y,
        size: action.node.size / 2
      }));
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

export function _generateRoot(label, id) {
  return {
    label,
    id,
    x: 0,
    y: 0,
    size: ROOT_NODE_SIZE
  };
}

export default visitReducer;
