import { _queryByTitle, _opensearch, getDescription } from "./wiki";
import moxios from "moxios";
import { store } from "../reducers";
import sinon from "sinon";
import axios from "axios";

describe("wiki", () => {
  describe("get description", () => {
    let testTable = [
      {
        name: "query by title",
        s: "test",
        before: () => {}
      },
      {
        name: "_opensearch",
        s: "test1",
        before: () => {
          let setup = {
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
          };
          moxios.stubRequest(setup.url, {
            status: setup.responseCode,
            response: setup.data
          });
          // mock get image, if any
          moxios.stubRequest(setup.getImageUrl, {
            status: 200,
            response: setup.getImageResponse
          });
        }
      }
    ];
    testTable.forEach(t => {
      it(t.name, done => {
        t.before();
        getDescription(t.s).then(r => {
          expect(r).toMatchSnapshot();
          done();
        });
      });
    });
  });
  describe("_opensearch", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    let testTable = [
      {
        name: "success",
        s: "dish",
        searchUrl:
          "/services/wiki/w/api.php?action=opensearch&limit=1&namespace=0&format=json&search=dish",
        searchResponse: [
          "al-helal",
          ["Al-Helal Islami Academy & College"],
          [
            "Al-Helal Islami Academy & College (Bengali: \u0986\u09b2-\u09b9\u09c7\u09b2\u09be\u09b2 \u0987\u09b8\u09b2\u09be\u09ae\u09c0 \u098f\u0995\u09be\u09a1\u09c7\u09ae\u09bf \u098f\u09cd\u09af\u09be\u09a8\u09cd\u09a1 \u0995\u09b2\u09c7\u099c) is a private higher secondary school in Sapahar, Naogaon District, Bangladesh."
          ],
          ["https://en.wikipedia.org/wiki/Al-Helal_Islami_Academy_%26_College"]
        ],
        searchStatusCode: 200,
        getImageUrl:
          "/services/wiki/w/api.php?action=query&prop=pageimages&format=json&pithumbsize=100&titles=Al-Helal%20Islami%20Academy%20&%20College",
        getImageResponse: {
          batchcomplete: "",
          query: {
            pages: { "668126": { pageid: 668126, ns: 0, title: "Dish" } }
          }
        }
      },
      {
        name: "no page found",
        s: "dish",
        searchUrl:
          "/services/wiki/w/api.php?action=opensearch&limit=1&namespace=0&format=json&search=dish",
        searchResponse: [],
        searchStatusCode: 200
      }
    ];
    testTable.forEach(t => {
      it(t.name, done => {
        let onFulfilled = sinon.spy();
        moxios.stubRequest(t.searchUrl, {
          status: t.responseCode,
          response: t.searchResponse
        });
        // mock get image, if any
        moxios.stubRequest(t.getImageUrl, {
          status: 200,
          response: t.getImageResponse
        });
        _opensearch(t.s).then(r => {
          expect(r).toMatchSnapshot();
          done();
        });
      });
    });
  });
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
