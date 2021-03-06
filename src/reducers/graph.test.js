import graph from "./graph";
import { store } from "./index";

describe("reducers", () => {
  describe("basic reducers", () => {
    let testTable = [
      {
        type: "CLEAR_GRAPH",
        testcheckEqual: false,
      },
      {
        type: "SET_MAX_NEIGHBORS",
        maxNeighbors: 1000,
        testcheckEqual: true,
      },
      {
        type: "SET_GRAPH_ERROR",
        error: "test",
        testcheckEqual: true,
      },
      {
        type: "SET_GRAPH_LAYOUT",
        layout: "new layout",
        testcheckEqual: true,
      },
      {
        type: "SET_GRAPH_LOADING",
        loading: true,
        testcheckEqual: true,
      },
      {
        type: "SET_ROOT_NODE",
        testcheckEqual: true,
        node: {
          label: "test",
          id: 1,
        },
      },
      {
        type: "SET_SELECTED_NODE_INFO",
        node: { label: "new selected node info" },
      },
      {
        type: "SET_SELECTED_NODE",
        node: { label: "new selected node" },
      },
      {
        type: "SET_TARGET_NODE",
        node: { label: "new target node" },
      },
    ];
    // loop through and test each one
    testTable.forEach((t) => {
      it(t.type, () => {
        if (test.testcheckEqual) {
          console.log(t.type !== "CLEAR_GRAPH");
          expect(graph(undefined, t)).not.toEqual(
            graph(undefined, { type: "" })
          );
        }
        expect(graph(undefined, t)).toMatchSnapshot();
      });
    });
  });
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
            target: 2,
          },
        ],
        nodes: [
          {
            id: 2,
            value: "2",
          },
        ],
      },
    };

    describe("SET_GRAPH_PATH", () => {
      let testTable = [
        {
          name: "adds normal path",
          paths: [
            [744709700, 723299825, 677783103, 796940464],
            [744709700, 376056243, 517868288, 796940464],
            [744709700, 598316364, 266061808, 796940464],
          ],
          entries: [
            {
              key: "6",
              value: 744709700,
            },
            {
              key: "51",
              value: 723299825,
            },
            {
              key: "61",
              value: 677783103,
            },
            {
              key: "32",
              value: 796940464,
            },
            {
              key: "79",
              value: 376056243,
            },
            {
              key: "74",
              value: 517868288,
            },
            {
              key: "1",
              value: 598316364,
            },
            {
              key: "31",
              value: 266061808,
            },
          ],
          initialState: undefined,
        },
        {
          name: "clears graph if it's already there",
          paths: [],
          entries: [],
          initialState: initialState,
        },
      ];

      testTable.forEach((t) => {
        it(t.name, () => {
          let action = {
            type: "SET_GRAPH_PATH",
            ...t,
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
          initialState: undefined,
        },
        {
          name: "does not add duplicate edges or nodes",
          node: { id: 1, value: "1" },
          initialState: initialState,
          neighbors: [{ id: 2, value: "2" }],
        },
        {
          name: "merges new values with old",
          node: { id: 1, value: "1" },
          initialState: initialState,
          neighbors: [
            { id: 2, value: "2" },
            { id: 3, value: "3" },
          ],
        },
      ];

      testTable.forEach((t) => {
        it(t.name, () => {
          let action = {
            type: "ADD_NEIGHBORS_TO_GRAPH",
            ...t,
          };
          expect(graph(t.initialState, action)).toMatchSnapshot();
        });
      });
    });
  });
});
