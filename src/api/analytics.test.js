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
  describe("postUserVisits", () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });
    let ipAddress = "14.35.263.24";
    let testTable = [
      {
        name: "normal IP",
        ipUrl: `/analytics/api/geoIpServer/check?access_key=7eca814a6de384aab338e110c57fef37`,
        ipResponse: { ip: ipAddress },
        geoIpUrl: `/analytics/api/geoIpServer/${ipAddress}?access_key=7eca814a6de384aab338e110c57fef37`,
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
          type: "ipv4",
          continent_code: "NA",
          continent_name: "North America",
          country_code: "US",
          country_name: "United States",
          region_code: "VA",
          region_name: "Virginia",
          city: "Sterling",
          zip: "20166",
          latitude: 38.952701568603516,
          longitude: -77.44322967529297,
          location: {
            geoname_id: 4787534,
            capital: "Washington D.C.",
            languages: [{ code: "en", name: "English", native: "English" }],
            country_flag: "http://assets.ipstack.com/flags/us.svg",
            country_flag_emoji: "\ud83c\uddfa\ud83c\uddf8",
            country_flag_emoji_unicode: "U+1F1FA U+1F1F8",
            calling_code: "1",
            is_eu: false
          }
        }
      },
      {
        name: "bad geoIpRequest",
        ipUrl: `/analytics/api/geoIpServer/check?access_key=7eca814a6de384aab338e110c57fef37`,
        ipResponse: { ip: ipAddress },
        geoIpUrl: `/analytics/api/geoIpServer/${ipAddress}?access_key=7eca814a6de384aab338e110c57fef37`,
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
        // ip address
        moxios.stubRequest(t.ipUrl, {
          status: 200,
          response: t.ipResponse
        });
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
        postUserVisit().then(r => {
          expect(r).toMatchSnapshot();
          done();
        });
      });
    });
  });
});
