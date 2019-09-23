import graph from "./graph";

import { SET_SELECTED_NODE, ADD_NEIGHBORS_TO_GRAPH } from "../actions/graph";

describe("reducers", () => {
  describe("graph", () => {
    it("initializes with correct state", () => {
      expect(graph(undefined, { action: undefined })).toMatchSnapshot();
    });

    describe("ADD_NEIGHBORS_TO_GRAPH", () => {
      let testTable = [
        {
          name: "adds new values",
          node: { id: 1, value: "1" },
          neighbors: [{ id: 2, value: "2" }],
          initialState: undefined
        },
        {
          name: "does not add duplicate edges or nodes",
          node: { id: 1, value: "1" },
          initialState: {
            graph: {
              edges: [
                {
                  id: "1->-->--2",
                  source: 1,
                  target: 2
                }
              ],
              nodes: [
                {
                  id: 2,
                  value: "2"
                }
              ]
            }
          },
          neighbors: [{ id: 2, value: "2" }]
        },
        {
          name: "merges new values with old",
          node: { id: 1, value: "1" },
          initialState: {
            graph: {
              edges: [
                {
                  id: "1->-->--2",
                  source: 1,
                  target: 2
                }
              ],
              nodes: [
                {
                  id: 2,
                  value: "2"
                }
              ]
            }
          },
          neighbors: [{ id: 2, value: "2" }, { id: 3, value: "3" }]
        }
      ];

      testTable.forEach(t => {
        it(t.name, () => {
          let action = {
            type: ADD_NEIGHBORS_TO_GRAPH,
            ...t
          };
          expect(graph(t.initialState, action)).toMatchSnapshot();
        });
      });
    });
  });
});