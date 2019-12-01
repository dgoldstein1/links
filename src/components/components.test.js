import React from "react";
import About from "./about";
import ErrorCard from "./errorCard";
import LoadingSpinner from "./loadingSpinner";
import SearchBar from "./searchBar";
import renderer from "react-test-renderer";

describe("components", () => {
  let _matchesSnapshot = (C, props = {}) => {
    const tree = renderer.create(<C {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  };

  let testTable = [
    {
      name: "About",
      component: About,
      props: {}
    },
    {
      name: "error Card (error)",
      component: ErrorCard,
      props: {
        error: "test error",
        action: "close",
        onAction: () => {},
        type: "error"
      }
    },
    {
      name: "error Card (warning)",
      component: ErrorCard,
      props: {
        error: "test error",
        action: "reload",
        onAction: () => {},
        type: "warning"
      }
    },
    {
      name: "Loading Spinner",
      component: LoadingSpinner,
      props: {
        animationTime: 10,
        graph: { nodes: [], edges: [] },
        height: "150px",
        width: "150px",
        loading: true
      }
    },
    {
      name: "Loading Spinner (loading=false)",
      component: LoadingSpinner,
      props: {
        animationTime: 10,
        graph: { nodes: [], edges: [] },
        height: "150px",
        width: "150px",
        loading: false
      }
    }
  ];

  testTable.forEach(t => {
    it(t.name, () => {
      _matchesSnapshot(t.component, t.props);
    });
  });
});
