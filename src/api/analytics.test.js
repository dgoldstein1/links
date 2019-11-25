import moxios from "moxios";
import { store } from "../reducers";
import sinon from "sinon";
import axios from "axios";
import { _getIpAddress, postUserVisit } from "./analytics";

describe("analytics", () => {
  describe("_getIpAddress", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    let testTable = [
      {
        name: "normal IP",
        url: `/analytics/api/geoIpServer/check?access_key=7eca814a6de384aab338e110c57fef37`,
        responseCode: 200,
        data: {
          ip: "14.35.263.24"
        }
      },
      {
        name: "deliminted IP",
        url: `/analytics/api/geoIpServer/check?access_key=7eca814a6de384aab338e110c57fef37`,
        responseCode: 200,
        data: {
          ip: "14.35.263.24, 25.362.53.32"
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
        _getIpAddress().then(ip => {
          expect(ip).toMatchSnapshot();
          done();
        });
      });
    });
  });
  // describe("postUserVisits", () => {
  //   beforeEach(() => {
  //     moxios.install();
  //   });

  //   afterEach(() => {
  //     moxios.uninstall();
  //   });
  //   let testTable = [];
  //   testTable.forEach(t => {
  //     it(t.name, done => {
  //       let onFulfilled = sinon.spy();
  //       moxios.stubRequest(t.url, {
  //         status: t.responseCode,
  //         response: t.data
  //       });
  //       _getIpAddress().then(ip => {
  //         expect(ip).toMatchSnapshot();
  //         done();
  //       });
  //     });
  //   });
    
  // })
});
