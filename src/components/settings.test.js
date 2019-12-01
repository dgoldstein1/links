import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Settings from "./settings";

const mockStore = configureStore([]);

describe("Settings", () => {
  const defaultState = {
    graph: {
      maxNeighbors: 15
    },
    appState: {
      language: "english"
    }
  };
  describe("matches snapshots", () => {
    let testTable = [
      {
        name: "success",
        state: defaultState
      }
    ];

    testTable.forEach(t => {
      it(t.name, () => {
        let store = mockStore(t.state);
        let wrapper = renderer.create(
          <Provider store={store}>
            <Settings />
          </Provider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
  describe("calls onChange for language", () => {
    let store = mockStore(defaultState);
    let wrapper = renderer.create(
      <Provider store={store}>
        <Settings />
      </Provider>
    );
    // emulate click on button
    let t;
    renderer.act(() => {
      let event = {
        target: {
          value: "english"
        }
      };
      t = wrapper.root
        .findByProps({ id: "language-select" })
        .props.onChange(event);
    });
    expect(t).toMatchSnapshot();
  });
  describe("calls onChange for set max neighbors", () => {
    let store = mockStore(defaultState);
    let wrapper = renderer.create(
      <Provider store={store}>
        <Settings />
      </Provider>
    );
    // emulate click on button
    let t;
    renderer.act(() => {
      let event = {
        target: {
          value: 234234
        }
      };
      t = wrapper.root
        .findByProps({ id: "neighbor-limit" })
        .props.onChange(event);
    });
    expect(t).toMatchSnapshot();
  });
});
