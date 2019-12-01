import { makeRequest } from "./utils";

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
  return makeRequest({
    method: "get",
    url: `/services/twowaykv/random?n=${n}`,
    onErrorPrefix: "Error getting random entry"
  });
}

/**
 * gets entries from IDs
 * @param ids []int
 * @return same response type as above
 **/
export function entriesFromValues(ids) {
  return makeRequest({
    method: "post",
    url: "/services/twowaykv/entriesFromValues",
    onErrorPrefix: "Error getting entries from values",
    body: ids
  });
}

/**
 * searches 'startswith' on keys
 * @param s {string}
 * @return same response type as above
 **/
export function search(s) {
  return makeRequest({
    method: "get",
    url: `/services/twowaykv/search?q=${s}`,
    onErrorPrefix: "Error searching keys"
  });
}
