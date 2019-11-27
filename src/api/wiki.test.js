import { _queryByTitle } from "./wiki";
import moxios from "moxios";
import { store } from "../reducers";
import sinon from "sinon";
import axios from "axios";

describe("wiki", () => {
  describe("_queryByTitle", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    let testTable = [
      {
        name: "there is an extract",
        s: "test1",
        url:
          "/services/wiki/w/api.php?action=query&format=json&prop=extracts&exlimit=max&explaintext&exintro&redirects&titles=test1",
        responseCode: 200,
        data: {
          batchcomplete: "",
          query: {
            pages: {
              "668126": {
                pageid: 668126,
                ns: 0,
                title: "dish",
                extract: "a dish is a dish"
              }
            }
          },
          limits: { extracts: 20 }
        },
        getImageUrl:
          "/services/wiki/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=100&pageids=668126",
        getImageResponse: {
          batchcomplete: "",
          query: {
            pages: { "668126": { pageid: 668126, ns: 0, title: "Dish" } }
          }
        }
      },
      {
        name: "500 response",
        s: "test1",
        url:
          "/services/wiki/w/api.php?action=query&format=json&prop=extracts&exlimit=max&explaintext&exintro&redirects&titles=test1",
        responseCode: 500,
        data: {
          batchcomplete: "",
          query: {
            pages: {
              "668126": {
                pageid: 668126,
                ns: 0,
                title: "dish",
                extract: "a dish is a dish"
              }
            }
          },
          limits: { extracts: 20 }
        },
        getImageUrl:
          "/services/wiki/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=100&pageids=668126",
        getImageResponse: {
          batchcomplete: "",
          query: {
            pages: { "668126": { pageid: 668126, ns: 0, title: "Dish" } }
          }
        }
      },
      {
        name: "no page id",
        s: "test",
        url:
          "/services/wiki/w/api.php?action=query&format=json&prop=extracts&exlimit=max&explaintext&exintro&redirects&titles=test",
        responseCode: 200,
        data: {
          batchcomplete: "",
          query: {
            normalized: [{ from: "pesticidal", to: "Pesticidal" }],
            pages: { "-1": { ns: 0, title: "Pesticidal", missing: "" } }
          },
          limits: { extracts: 20 }
        }
      },
      {
        name: "no extract found",
        s: "test",
        url:
          "/services/wiki/w/api.php?action=query&format=json&prop=extracts&exlimit=max&explaintext&exintro&redirects&titles=test",
        responseCode: 200,
        data: {
          batchcomplete: "",
          query: {
            pages: {
              "668126": {
                pageid: 668126,
                ns: 0,
                title: "dish"
              }
            }
          },
          limits: { extracts: 20 }
        }
      }
    ];
    testTable.forEach(t => {
      it(t.name, done => {
        let onFulfilled = sinon.spy();
        moxios.stubRequest(t.url, {
          status: t.responseCode,
          response: t.data
        });
        // mock get image, if any
        moxios.stubRequest(t.getImageUrl, {
          status: 200,
          response: t.getImageResponse
        });
        _queryByTitle(t.s).then(r => {
          expect(r).toMatchSnapshot();
          done();
        });
      });
    });
  });
});
