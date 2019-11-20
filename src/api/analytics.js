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
    `/analytics/api/geoIpServer/check?access_key=7eca814a6de384aab338e110c57fef37`
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
      let url = encodeURI(`/analytics/server/visits`);
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
