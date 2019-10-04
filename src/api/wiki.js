import axios from "axios";
/**
 * @param s {string}
 * @return JSON {
    success: bool,
    data : {
      description : string,
      img : "string URL"
    }
    error : string
  }
 **/
export function getDescription(s) {
  s = "Al-Farabi";
  // get extracts
  let url = process.env.REACT_APP_WIKIMETA_ENDPOINT;
  url += `?action=query`;
  url += `&format=json`;
  url += `&prop=extracts`;
  url += `&exlimit=max`;
  url += `&explaintext`;
  url += `&exintro`;
  url += `&titles=${s}`;
  console.log("URL:", encodeURI(url));

  let _errOut = e => ({
    success: false,
    error: `Could not get description from wikipedia for article ${s}: ${e}`
  });

  return axios
    .get(encodeURI(url))
    .then(r => {
      let pageId = Object.keys(r.data.query.pages)[0];
      if (!pageId) return _errOut("no page found");
      let extract = r.data.query.pages[pageId].extract;
      // now get images
      url = process.env.REACT_APP_WIKIMETA_ENDPOINT;
      url += `?action=query`;
      url += `&prop=pageimages`;
      url += `&format=json`;
      url += `&pithumbsize=250`;
      url += `&pageids=${pageId}`;
      return axios
        .get(encodeURI(url))
        .then(r => ({
          success: true,
          description: extract,
          img: r.data.query.pages[pageId].thumbnail
        }))
        .catch(_errOut);
    })
    .catch(_errOut);
}
