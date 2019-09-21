import axios from "axios";

/**
 * fetches random nodes from twowaykv
 * @param n, number of random items to fetch
 * @return:
 *{
 *  success : bool,
 *   data : [{key, value}],
 *   error : string
 *}
 **/
export function random(n) {
  let url = encodeURI(
    `${process.env.REACT_APP_TWOWAYKV_ENDPOINT}/random?n=${n}`
  );
  return axios
    .get(url)
    .then(r => ({
      success: true,
      data: r.data
    }))
    .catch(e => ({
      success: false,
      error: "Error getting random entry: " + e.message
    }));
}

/**
 * gets entries from IDs
 * @param ids []int
 * @return same response type as above
 **/
export function entriesFromValues(ids) {
  let url = encodeURI(
    `${process.env.REACT_APP_TWOWAYKV_ENDPOINT}/entriesFromValues`
  );
  return axios
    .post(url, ids)
    .then(r => ({
      success: true,
      data: r.data
    }))
    .catch(e => ({
      success: false,
      error: "Error getting entries from values: " + e.message
    }));
}
