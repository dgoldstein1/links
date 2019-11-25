import { getNeighbors, shortestPath } from "./biggraph";
import moxios from "moxios";
import { store } from "../reducers";
import sinon from "sinon";
import axios from "axios";

describe("biggraph", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("getNeighbors", () => {
    it("makes request", done => {
      let id = 3;
      let url = `/services/biggraph/neighbors?node=${id}&limit=${
        store.getState().graph.maxNeighbors
      }`;
      let onFulfilled = sinon.spy();
      moxios.stubRequest(url, {
        status: 200
      });
      getNeighbors(id);
      moxios.wait(function() {
        expect(onFulfilled.getCall(0)).not.toBeUndefined();
        done();
      });
    });
  });
  describe("shortestPath", () => {
    it("makes request", done => {
      let start = { id: 1, label: "1" };
      let end = { id: 2, label: "2" };
      let url = `services/biggraph/shortestPath?start=${start.id}&end=${
        end.id
      }`;
      let onFulfilled = sinon.spy();
      moxios.stubRequest(url, {
        status: 200
      });
      shortestPath(start, end);
      moxios.wait(function() {
        expect(onFulfilled.getCall(0)).not.toBeUndefined();
        done();
      });
    });
  });
});
