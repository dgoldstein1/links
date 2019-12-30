import moxios from "moxios";
import { store } from "../reducers";
import sinon from "sinon";
import axios from "axios";
import { _getIpAddress, postUserVisit } from "./analytics";

describe("analytics", () => {
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
        ipResponse: { ip: ipAddress },
        geoIpUrl: `/analytics/api/geoIpServer/v1?apiKey=at_Mb3nWUvk1iAL4W97H5Fs1LxAXjRCn&ipAddress=8.8.8.8`,
        analyticsServerUrl: "/analytics/server/visits",
        analyticsServerResponse: {
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
        ipResponse: { ip: ipAddress },
        geoIpUrl: `/analytics/api/geoIpServer/v1?apiKey=at_Mb3nWUvk1iAL4W97H5Fs1LxAXjRCn&ipAddress=8.8.8.8`,
        analyticsServerUrl: "/analytics/server/visits",
        analyticsServerResponse: {
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
