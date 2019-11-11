import axios from "axios";
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
  let geoUrl = encodeURI(
    `${process.env.REACT_APP_GEO_IP_ENDPOINT}/check?access_key=${
      process.env.REACT_APP_GEO_IP_ACCESS_KEY
    }`
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
      let url = encodeURI(`${process.env.REACT_APP_ANALYTICS_ENDPOINT}/visits`);
      return axios
        .post(url, res.data)
        .then(r => ({
          success: true,
          data: r.data
        }))
        .catch(e => ({
          success: false,
          error: "could not post json to analytics backend: " + e.message
        }));
    })
    .catch(e => ({
      success: false,
      error: "could not get user IP address: " + e.message
    }));
}
