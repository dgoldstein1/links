import axios from "axios";
// makes request
// returns Promise{sucess, data, error}
export function makeRequest({ method, url, onErrorPrefix = "", body }) {
  return axios[`${method}`](encodeURI(url), body)
    .then(r => ({
      success: true,
      data: r.data
    }))
    .catch(e => ({
      success: false,
      error: `${onErrorPrefix}: ${e.response.data}`
    }));
}
