import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Header from "./header";

const mockStore = configureStore([]);

describe("Header", () => {
  const defaultState = {
    graph: {
      layout: "cluster",
      rootNode: {
        id: 1,
        label: "root node"
      },
      targetNode: {
        id: 2,
        label: "target node"
      }
    }
  };
  describe("matches snapshots", () => {
    let testTable = [
      {
        name: "cluster",
        state: defaultState
      },
      {
        name: "hierachy",
        state: {
          ...defaultState,
          graph: {
            ...defaultState.graph,
            layout: "hierarchy"
          }
        }
      }
    ];

    testTable.forEach(t => {
      it(t.name, () => {
        let store = mockStore(t.state);
        let wrapper = renderer.create(
          <Provider store={store}>
            <Header />
          </Provider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
  describe("toggles layout", () => {
    let store = mockStore(defaultState);
    let wrapper = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    // emulate click on button
    let t;
    renderer.act(() => {
      t = wrapper.root
        .findByProps({ id: "layout-toggle-button" })
        .props.onClick();
    });
    expect(t).not.toBeUndefined();
    expect(t).toMatchSnapshot();
  });
  describe("sets settings view", () => {
    let store = mockStore(defaultState);
    let wrapper = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    // emulate click on button
    let t;
    renderer.act(() => {
      t = wrapper.root
        .findByProps({ id: "settings-icon-button" })
        .props.onClick();
    });
    expect(t).not.toBeUndefined();
    expect(t).toMatchSnapshot();
  });
  describe("sets help view", () => {
    let store = mockStore(defaultState);
    let wrapper = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    // emulate click on button
    let t;
    renderer.act(() => {
      t = wrapper.root.findByProps({ id: "help-icon-button" }).props.onClick();
    });
    expect(t).not.toBeUndefined();
    expect(t).toMatchSnapshot();
  });
  describe("sets start path", () => {
    let store = mockStore(defaultState);
    let wrapper = renderer.create(
      <Provider store={store}>
        <Header />
      </Provider>
    );
    // emulate click on button
    renderer.act(() => {
      wrapper.root.findByProps({ id: "search-button" }).props.onClick();
    });
  });
});
