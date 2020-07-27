import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import Splash from "./splash";

const mockStore = configureStore([]);

describe.skip("Splash", () => {
  const defaultState = {};
  describe("matches snapshots", () => {
    let testTable = [
      {
        name: "cluster",
        state: defaultState,
      },
    ];

    testTable.forEach((t) => {
      it(t.name, () => {
        let store = mockStore(t.state);
        let wrapper = renderer.create(
          <Provider store={store}>
            <Splash />
          </Provider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
