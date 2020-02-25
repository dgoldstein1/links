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
  maxShortestPaths: 5,
  directedShortestPath: true,
  loading: false,
  error: undefined,
  layout: "hierarchy",
  maxNeighbors: 15,
  topInfo: {
    betweenessEdges: [],
    betweenessNodes: [],
    pageRank: []
  }
};

const graphReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CLEAR_GRAPH":
      return Object.assign({}, state, {
        graph: {
          nodes: [],
          edges: []
        }
      });
    case "SET_DIRECTED_SHORTEST_PATH":
      return Object.assign({}, state, {
        directedShortestPath: action.directedShortestPath
      });
    case "SET_MAX_NEIGHBORS":
      return Object.assign({}, state, {
        maxNeighbors: action.maxNeighbors
      });
    case "SET_GRAPH_ERROR":
      return Object.assign({}, state, {
        error: action.error
      });
    case "SET_GRAPH_LAYOUT":
      return Object.assign({}, state, {
        layout: action.layout
      });
    case "SET_GRAPH_LOADING":
      return Object.assign({}, state, {
        loading: action.loading
      });
    case "SET_ROOT_NODE":
      return Object.assign({}, state, {
        rootNode: _generateRoot(action.node.label, action.node.id)
      });
    case "SET_MAX_SHORTEST_PATHS":
      return Object.assign({}, state, {
        maxShortestPaths: action.maxShortestPaths
      });
    case "SET_ALL_PATHS_UNIQUE":
      return Object.assign({}, state, {
        pathsAreUnique: action.pathsAreUnique
      });

    case "SET_SELECTED_NODE":
      return Object.assign({}, state, {
        selectedNode: {
          ...state.selectedNode,
          node: action.node
        }
      });
    case "SET_SELECTED_NODE_INFO":
      return Object.assign({}, state, {
        selectedNode: {
          ...state.selectedNode,
          description: action.description,
          img: action.img,
          loading: action.loading,
          error: action.error,
          centrality: action.centrality
        }
      });
    case "SET_TARGET_NODE":
      return Object.assign({}, state, {
        targetNode: action.node
      });

    case "SET_GRAPH_PATH":
      // create array of all nodes from entries
      let nodes = action.entries.map(e => ({
        id: e.value,
        label: e.key,
        size: 1,
        color: "red"
      }));
      // create edges from each path in graph
      let edges = [];
      let entriesReverseMap = {};
      action.entries.forEach(e => (entriesReverseMap[e.value] = e.key));
      action.paths.forEach(p => {
        p.forEach((id, i) => {
          // dont add edge if we've reached the end
          if (i === p.length - 1) return;
          // lookup this entry and next entry
          edges.push({
            id: `${id}->-->--${p[i + 1]}`,
            source: id,
            target: p[i + 1],
            color: "red"
          });
        });
      });
      return Object.assign({}, state, {
        graph: { nodes, edges }
      });
    case "ADD_NEIGHBORS_TO_GRAPH":
      // set initial position to source
      action.neighbors = action.neighbors.map(n => ({
        ...n,
        size: 1
      }));
      // get list of edges to add
      let edgesToAdd = [];
      action.neighbors.forEach(n => {
        if (!n.id) console.log(n);
        edgesToAdd.push({
          id: `${action.node.id}->-->--${n.id}`,
          source: action.node.id,
          target: n.id,
          color: "black"
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
    size: 1
  };
}

export default graphReducer;
