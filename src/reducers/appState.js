const initialState = {
  language: "english",
  loading: true, // the app is / isn't loading
  view: "splash", // one of "path", "splash", "about", "settings"
  config: {
    supportedGraphs: [],
    loadedGraphs: {},
  },
  graphConfig: {},
  topLoading: false,
};

const visitReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TOP_LOADING":
      return Object.assign({}, state, {
        topLoading: action.loading,
      });

    case "SET_CONFIG":
      return Object.assign({}, state, {
        config: action.config,
      });

    case "SET_GRAPH_IS_AVAILABLE":
      return Object.assign({}, state, {
        config: {
          ...state.config,
          loadedGraphs: {
            ...state.config.loadedGraphs,
            [action.g.name]: action.isAvailable,
          },
        },
      });

    case "SET_CHOSEN_GRAPH_CONFIG":
      return Object.assign({}, state, {
        graphConfig: action.g,
      });

    case "SET_LANGUAGE":
      return Object.assign({}, state, {
        language: action.language,
      });
    // set when the app is loading
    case "SET_LOADING":
      return Object.assign({}, state, {
        loading: action.loading === undefined ? false : action.loading,
      });
    // update where the user is currently looking
    case "UPDATE_VIEW":
      return Object.assign({}, state, {
        view: action.view,
      });
    default:
      return state;
  }
};

export default visitReducer;
