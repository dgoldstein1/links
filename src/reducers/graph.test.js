import graph from "./graph";

import {
  SET_ROOT_NODE,
  ADD_NEIGHBORS_TO_GRAPH,
  SET_GRAPH_PATH
} from "../actions/graph";

describe("reducers", () => {
  describe("graph", () => {
    it("initializes with correct state", () => {
      expect(graph(undefined, { action: undefined })).toMatchSnapshot();
    });

    let initialState = {
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
    };

    describe("SET_GRAPH_PATH", () => {
      let testTable = [
        {
          name: "adds normal path",
          path: [
            {
              id: 1,
              label: "1"
            },
            {
              id: 2,
              label: "2"
            },
            {
              id: 3,
              label: "3"
            }
          ],
          initialState: undefined
        },
        {
          name: "clears graph if it's already there",
          path: [
            {
              id: 1,
              label: "1"
            }
          ],
          initialState: initialState
        }
      ];

      testTable.forEach(t => {
        it(t.name, () => {
          let action = {
            type: SET_GRAPH_PATH,
            ...t
          };
          expect(graph(t.initialState, action)).toMatchSnapshot();
        });
      });
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
          initialState: initialState,
          neighbors: [{ id: 2, value: "2" }]
        },
        {
          name: "merges new values with old",
          node: { id: 1, value: "1" },
          initialState: initialState,
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
