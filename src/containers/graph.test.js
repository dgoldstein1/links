import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Graph from "./graph";

const mockStore = configureStore([]);

describe("Graph", () => {
  const defaultState = {
    graph: {
      graph: {
        nodes: [],
      },
      layout: "cluster",
      selectedNode: {
        node: {
          label: "test",
          id: 1,
        },
      },
    },
  };
  describe("matches snapshots", () => {
    let testTable = [
      {
        name: "cluster",
        state: defaultState,
      },
      {
        name: "loading",
        state: {
          ...defaultState,
          graph: {
            loading: true,
            ...defaultState.graph,
          },
        },
      },
      {
        name: "error",
        state: {
          ...defaultState,
          graph: {
            error: "an error",
            ...defaultState.graph,
          },
        },
      },
      {
        name: "hierarchy",
        state: {
          ...defaultState,
          graph: {
            ...defaultState.graph,
            layout: "hierarchy",
          },
        },
      },
    ];

    testTable.forEach((t) => {
      it(t.name, () => {
        let store = mockStore(t.state);
        let wrapper = renderer.create(
          <Provider store={store}>
            <Graph />
          </Provider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
  describe("sets graph error to undefined on click", () => {
    let store = mockStore({
      ...defaultState,
      graph: {
        error: "an error",
        ...defaultState.graph,
      },
    });
    let wrapper = renderer.create(
      <Provider store={store}>
        <Graph />
      </Provider>
    );
    // emulate click on button
    let t;
    renderer.act(() => {
      t = wrapper.root.findByProps({ id: "graph-error-card" }).props.onAction();
    });
    expect(t).not.toBeUndefined();
    expect(t).toMatchSnapshot();
  });
  describe("on node click", () => {
    let store = mockStore(defaultState);
    let wrapper = renderer.create(
      <Provider store={store}>
        <Graph />
      </Provider>
    );
    // emulate click on button
    renderer.act(() => {
      let e = {
        data: {
          node: {
            id: 123,
            label: "test",
          },
        },
      };
      wrapper.root.findByProps({ id: "sigma-graph" }).props.onClickNode(e);
    });
  });
});
