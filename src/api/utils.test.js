import { makeRequest } from "./utils";
import moxios from "moxios";
import { store } from "../reducers";
import sinon from "sinon";
import axios from "axios";

describe("api utils", () => {
  describe("make request", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    let testTable = [
      {
        name: "normal GET request",
        method: "get",
        url: `/test`,
        onErrorPrefix: "error getting ...",
        responseCode: 200,
        data: { test: "test" }
      },
      {
        name: "normal POST request",
        method: "post",
        bodt: { test: "test" },
        url: `/test`,
        onErrorPrefix: "error getting ...",
        responseCode: 200,
        data: { test: "test" }
      },
      {
        name: "GET request with response code 500",
        method: "get",
        url: `/test`,
        onErrorPrefix: "error getting ...",
        responseCode: 500,
        data: { test: "test" }
      }
    ];
    testTable.forEach(t => {
      it(t.name, done => {
        let onFulfilled = sinon.spy();
        moxios.stubRequest(t.url, {
          status: t.responseCode,
          response: t.data
        });
        makeRequest({ ...t }).then(r => {
          expect(r).toMatchSnapshot();
          done();
        });
      });
    });
  });
});
