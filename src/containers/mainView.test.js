import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import MainView from "./mainView";

const mockStore = configureStore([]);

describe("MainView", () => {
  describe("matches snapshots", () => {
    let testTable = [
      // {
      //   name: "splash page, no loading",
      //   state: {
      //     appState: {
      //       view: "splash",
      //       loading: false
      //     }
      //   }
      // },
      // {
      //   name: "splash page, is loading",
      //   state: {
      //     appState: {
      //       view: "splash",
      //       loading: true
      //     }
      //   }
      // },
      {
        name: "about page",
        state: {
          appState: {
            view: "about",
            loading: false,
          },
          graph: {
            layout: "cluster",
          },
        },
      },
      {
        name: "settings page",
        state: {
          appState: {
            view: "settings",
            loading: false,
          },
          graph: {
            layout: "cluster",
          },
        },
      },
      {
        name: "path",
        state: {
          appState: {
            view: "settings",
            loading: false,
          },
          graph: {
            layout: "cluster",
          },
        },
      },
    ];

    testTable.forEach((t) => {
      it(t.name, () => {
        let store = mockStore(t.state);
        let wrapper = renderer.create(
          <Provider store={store}>
            <MainView />
          </Provider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
