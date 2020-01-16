import moxios from "moxios";
import { store } from "../reducers";
import sinon from "sinon";
import axios from "axios";
import { _formatDataToAnalyticsBackend, postUserVisit } from "./analytics";

describe("analytics", () => {
  describe("_formatDataToAnalyticsBackend", () => {
    let testTable = [
      {
        name: "normal response",
        res: {
          data: {
            ip: "96.72.50.249",
            location: {
              country: "US",
              region: "Minnesota",
              city: "Hastings",
              lat: 44.7443,
              lng: -92.8514,
              postalCode: "55033",
              timezone: "-06:00",
              geonameId: 5029500
            },
            as: {
              asn: 7922,
              name: "Comcast",
              route: "96.64.0.0/11",
              domain: "https://corporate.comcast.com/",
              type: "Cable/DSL/ISP"
            },
            isp: "Comcast Cable Communications, LLC"
          }
        }
      }
    ];
    testTable.forEach(t => {
      it(t.name, () => {
        expect(_formatDataToAnalyticsBackend(t.res)).toMatchSnapshot();
      });
    });
  });
  describe("postUserVisits", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    let testTable = [
      {
        name: "normal IP",
        geoIpUrl: `/analytics/api/geoIpServer/v1?apiKey=at_Mb3nWUvk1iAL4W97H5Fs1LxAXjRCn&ipAddress=8.8.8.8`,
        analyticsServerUrl: "/analytics/server/visits",
        analyticsServerResponse: {
          ip: "205.153.92.177",
          city: "Sterling",
          country_code: "US",
          country_name: "United States",
          latitude: 38.952701568603516,
          longitude: -77.44322967529297,
          metro_code: 0,
          region_code: "VA",
          time_zone: "",
          zip_code: "20166",
          visit_date: "2019-11-27T01:01:23.504356771Z"
        },
        responseCode: 200,
        geoIpResponse: {
          ip: "205.153.92.177",
          location: {
            country: "US",
            region: "Sterling",
            city: "Hastings",
            lat: 38.952701568603516,
            lng: -77.44322967529297,
            postalCode: "20166",
            timezone: "-06:00",
            geonameId: 5029500
          },
          as: {
            asn: 7922,
            name: "Comcast",
            route: "96.64.0.0/11",
            domain: "https://corporate.comcast.com/",
            type: "Cable/DSL/ISP"
          },
          isp: "Comcast Cable Communications, LLC"
        }
      },
      {
        name: "bad geoIpRequest",
        geoIpUrl: `/analytics/api/geoIpServer/v1?apiKey=at_Mb3nWUvk1iAL4W97H5Fs1LxAXjRCn&ipAddress=8.8.8.8`,
        analyticsServerUrl: "/analytics/server/visits",
        analyticsServerResponse: {
          ip: "205.153.92.177",
          city: "Sterling",
          country_code: "US",
          country_name: "United States",
          latitude: 38.952701568603516,
          longitude: -77.44322967529297,
          metro_code: 0,
          region_code: "VA",
          time_zone: "",
          zip_code: "20166",
          visit_date: "2019-11-27T01:01:23.504356771Z"
        },
        responseCode: 500,
        geoIpResponse: {}
      }
    ];
    testTable.forEach(t => {
      it(t.name, done => {
        let onFulfilled = sinon.spy();
        // geoIpCheck
        moxios.stubRequest(t.geoIpUrl, {
          status: t.responseCode,
          response: t.geoIpResponse
        });
        // analytics server "/visits" post
        moxios.stubRequest(t.analyticsServerUrl, {
          status: 200,
          response: t.analyticsServerResponse
        });

        moxios.stubRequest("/myip", {
          status: 200,
          response: {
            ip: "8.8.8.8:2356"
          }
        });
        postUserVisit().then(r => {
          expect(r).toMatchSnapshot();
          done();
        });
      });
    });
  });
});
