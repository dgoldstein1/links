import axios from "axios";

import { makeRequest } from "./utils";
/**
 * gets user's ip address and then posts go website analytics endpoint
 * @return: Promise
 * {
 *   success : bool,
 *   data : [{key, value}],
 *   error : string
 * }
 **/
export function postUserVisit() {
  // get client ip address
  return axios
    .get("/myip")
    .then(r => {
      if (!r.data)
        return Promise.resolve({
          success: false,
          error: "Could not get client ip address from reverse proxy"
        });
      let ip = r.data.ip && r.data.ip.split(":")[0]
      // first get ip address of user
      let geoUrl = encodeURI(
        `/analytics/api/geoIpServer/v1?apiKey=at_Mb3nWUvk1iAL4W97H5Fs1LxAXjRCn&ipAddress=${ip}`
      );
      // add in href, if exists
      return axios.get(geoUrl).then(res => {
        // check for failure
        if (!res.data)
          return Promise.resolve({
            success: false,
            error: "Could not get IP address from 3rd party"
          });
        // now post this data to the backend
        return makeRequest({
          method: "post",
          url: "/analytics/server/visits",
          onErrorPrefix: "could not post json to analytics backend",
          body: _formatDataToAnalyticsBackend(res)
        });
      });
    })
    .catch(e => ({
      success: false,
      error: "could not get user IP address: " + e.message
    }));
}

/**
 * formats data
 *   from: https://geo.ipify.org/docs
 *   into: https://github.com/dgoldstein1/websiteanalytics-backend#visits-1
 **/
export function _formatDataToAnalyticsBackend(ipifyResponse) {
  let d = {
    ip: ipifyResponse.data.ip,
    city: ipifyResponse.data.location.city,
    country_code: ipifyResponse.data.location.country,
    latitude: ipifyResponse.data.location.lat,
    longitude: ipifyResponse.data.location.lng,
    region_code: ipifyResponse.data.location.region,
    time_zone: "ipify" + ipifyResponse.data.location.timezone,
    zip_code: ipifyResponse.data.location.postalCode
  };
  // add in referrer code
  d.href = new URLSearchParams(window.location.search).get("href");
  return d;
}
