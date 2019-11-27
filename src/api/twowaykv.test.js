import { random, entriesFromValues, search } from "./twowaykv";
import moxios from "moxios";
import { store } from "../reducers";
import sinon from "sinon";
import axios from "axios";

describe("twowaykv", () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  describe("random()", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    let testTable = [
      {
        name: "successful request",
        n: 1,
        url: `/services/twowaykv/random?n=1`,
        responseCode: 200,
        data: [
          {
            key: "key",
            value: 234234
          }
        ]
      }
    ];
    testTable.forEach(t => {
      it(t.name, done => {
        let onFulfilled = sinon.spy();
        moxios.stubRequest(t.url, {
          status: t.responseCode,
          response: t.data
        });
        random(t.n).then(r => {
          expect(r).toMatchSnapshot();
          done();
        });
      });
    });
  });
  describe("entriesFromValues", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    let testTable = [
      {
        name: "success",
        ids: [234234],
        url: `/services/twowaykv/entriesFromValues`,
        responseCode: 200,
        data: [
          {
            key: "key",
            value: 234234
          }
        ]
      }
    ];
    testTable.forEach(t => {
      it(t.name, done => {
        let onFulfilled = sinon.spy();
        moxios.stubRequest(t.url, {
          status: t.responseCode,
          response: t.data
        });
        entriesFromValues(t.ids).then(r => {
          expect(r).toMatchSnapshot();
          done();
        });
      });
    });
  });
  describe("search", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    let testTable = [
      {
        name: "success",
        s: "test",
        url: `/services/twowaykv/search?q=test`,
        responseCode: 200,
        data: [
          {
            key: "key",
            value: 234234
          }
        ]
      }
    ];
    testTable.forEach(t => {
      it(t.name, done => {
        let onFulfilled = sinon.spy();
        moxios.stubRequest(t.url, {
          status: t.responseCode,
          response: t.data
        });
        search(t.s).then(r => {
          expect(r).toMatchSnapshot();
          done();
        });
      });
    });
  });
});
