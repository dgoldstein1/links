import axios from "axios";
/**
 * @param s {string}
 * @return JSON {
    success: bool,
    data : {
      extract : string,
      image : "string URL"
    }
    error : string
  }
 **/
export function getDescription(s) {
  // get extracts
  let url = process.env.REACT_APP_WIKIMETA_ENDPOINT;
  url += `?action=query`
  url += `&format=json`
  url += `&prop=extracts`
  url += `&exlimit=max`
  url += `&explaintext`
  url += `&exintro`
  url += `&titles=${s}`
  console.log("URL:", encodeURI(url))
  return axios
    .get(encodeURI(url))
    .then(r => {
      console.log(r)

    })
    .catch(e => ({
      success: false,
      error: `Could not get description from wikipedia for article ${s}: ${e}`
    }));
}