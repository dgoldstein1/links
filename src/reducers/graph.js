import * as ac from "../actions/graph";
import _ from "lodash";

const initialState = {
  rootNode: {}, // root node of graph (what is in search or 'start from')
  selectedNode: {
    // node currently in view
    loading: true,
    error: "",
    description: "",
    img: "",
    node: {}
  },
  targetNode: {}, // target node in path ('ending at..')
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
    case ac.CLEAR_GRAPH:
      return Object.assign({}, state, {
        graph: {
          nodes: [],
          edges: []
        }
      });
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
        rootNode: _generateRoot(action.node.label, action.node.id)
      });
    case ac.SET_SELECTED_NODE:
      return Object.assign({}, state, {
        selectedNode: {
          ...state.selectedNode,
          node: action.node
        }
      });
    case ac.SET_SELECTED_NODE_INFO:
      return Object.assign({}, state, {
        selectedNode: {
          ...state.selectedNode,
          description: action.description,
          img: action.img,
          loading: action.loading,
          error: action.error
        }
      });
    case ac.SET_TARGET_NODE:
      return Object.assign({}, state, {
        targetNode: action.node
      });

    case ac.SET_GRAPH_PATH:
      // set x and y for new nodes
      action.path = action.path.map((n, i) => ({
        ...n
      }));
      // create edges
      let edges = [];
      action.path.forEach((n, i) => {
        // don't add edge if we've reached the end
        if (i === action.path.length - 1) return;
        edges.push({
          id: `${n.id}->-->--${action.path[i + 1].id}`,
          source: n.id,
          target: action.path[i + 1].id,
          color: "gray"
        });
      });
      // return new state
      return Object.assign({}, state, {
        graph: {
          nodes: action.path,
          edges: edges
        }
      });
    case ac.ADD_NEIGHBORS_TO_GRAPH:
      // set initial position to source
      action.neighbors = action.neighbors.map(n => ({
        ...n,
        x: action.node.x,
        y: action.node.y
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
    y: 0
  };
}

export default visitReducer;
