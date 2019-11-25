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
export function postUserVisit(ids) {
  // first get ip address of user
  _getIpAddress().then(ip => {
    let geoUrl = encodeURI(
      `/analytics/api/geoIpServer/${ip}?access_key=7eca814a6de384aab338e110c57fef37`
    );
    // add in href, if exists
    return axios
      .get(geoUrl)
      .then(res => {
        if (res.data) {
          // add in referrer code
          res.data.href = new URLSearchParams(window.location.search).get(
            "href"
          );
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
  });
}

export function _getIpAddress() {
  let geoUrl = encodeURI(
    `/analytics/api/geoIpServer/check?access_key=7eca814a6de384aab338e110c57fef37`
  );
  return axios.get(geoUrl).then(r => {
    // delimit IP address, if needed
    if (r.data.ip && r.data.ip.includes(","))
      r.data.ip = r.data.ip.split(",")[0];
    return Promise.resolve(r.data.ip);
  });
}
