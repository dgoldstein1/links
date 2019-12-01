import React from "react";
import { Provider } from "react-redux";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import SelectedNodeCard from "./selectedNodeCard";

const mockStore = configureStore([]);

describe("selectedNodeCard", () => {
  describe("matches snapshots", () => {
    let testTable = [
      {
        name: "success",
        state: {
          graph: {
            selectedNode: {
              description: "Test description",
              loading: false,
              node: {
                label: "test"
              }
            }
          }
        }
      },
      {
        name: "no description",
        state: {
          graph: {
            selectedNode: {
              description: undefined,
              loading: false,
              node: {
                label: "test"
              }
            }
          }
        }
      },
      {
        name: "description bigger than word limit",
        state: {
          graph: {
            selectedNode: {
              description:
                "this is a test description longer than the word limit this is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limitthis is a test description longer than the word limit",
              loading: false,
              node: {
                label: "test"
              }
            }
          }
        }
      }
    ];

    testTable.forEach(t => {
      it(t.name, () => {
        let store = mockStore(t.state);
        let wrapper = renderer.create(
          <Provider store={store}>
            <SelectedNodeCard />
          </Provider>
        );
        expect(wrapper).toMatchSnapshot();
      });
    });
  });
});
