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
  // first get ip address of user
  let geoUrl = encodeURI(
    `/analytics/api/geoIpServer/v1?apiKey=at_Mb3nWUvk1iAL4W97H5Fs1LxAXjRCn&ipAddress=8.8.8.8`
  );
  // add in href, if exists
  return axios
    .get(geoUrl)
    .then(res => {
      if (res.data) {
        // add in referrer code
        res.data.href = new URLSearchParams(window.location.search).get("href");
        // small cleanup on attributes
        res.data.zip_code = res.data.zip;
      }
      // now post this data to the backend
      return makeRequest({
        method: "post",
        url: "/analytics/server/visits",
        onErrorPrefix: "could not post json to analytics backend",
        body: res.data
      });
    })
    .catch(e => ({
      success: false,
      error: "could not get user IP address: " + e.message
    }));
}
