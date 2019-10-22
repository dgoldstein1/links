import axios from "axios";

let _errOut = (s, e) => ({
  success: false,
  error: `Could not get description from wikipedia for article ${s}: ${e}`
});
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
  return _queryByTitle(s).then(r => {
    console.log(r);
    if (r.success) return Promise.resolve(r);
    // if can't find find exact title, try opensearch
    return _opensearch(s);
  });
}

// gets icon and description by trying to guess title
export function _queryByTitle(s) {
  // get extracts
  let url = process.env.REACT_APP_WIKIMETA_ENDPOINT;
  url += `?action=query`;
  url += `&format=json`;
  url += `&prop=extracts`;
  url += `&exlimit=max`;
  url += `&explaintext`;
  url += `&exintro`;
  url += `&titles=${s}`;

  return axios
    .get(encodeURI(url))
    .then(r => {
      let pageId = Object.keys(r.data.query.pages)[0];
      pageId = parseInt(pageId);
      /*jslint eqeq: true*/
      if (!pageId || pageId === -1) return _errOut(s, "no page found");
      let extract = r.data.query.pages[pageId].extract;
      // now get images
      url = process.env.REACT_APP_WIKIMETA_ENDPOINT;
      url += `?action=query`;
      url += `&prop=pageimages`;
      url += `&format=json`;
      url += `&pithumbsize=100`;
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

// gets description and image for the first
// result in an opensearch
export function _opensearch(s) {
  // get extracts
  let url = process.env.REACT_APP_WIKIMETA_ENDPOINT;
  url += "?action=opensearch";
  url += "&limit=1";
  url += "&namespace=0";
  url += "&format=json";
  url += `&search=${s}`;

  return axios
    .get(encodeURI(url))
    .then(r => {
      let pageTitle = r.data[1];
      if (!pageTitle) return _errOut(s, "no page found");
      let extract = r.data[2];
      // now get images
      url = process.env.REACT_APP_WIKIMETA_ENDPOINT;
      url += `?action=query`;
      url += `&prop=pageimages`;
      url += `&format=json`;
      url += `&pithumbsize=100`;
      url += `&titles=${pageTitle}`;
      return axios
        .get(encodeURI(url))
        .then(r => {
          let pageId = Object.keys(r.data.query.pages)[0];
          return {
            success: true,
            description: extract,
            img: pageId && r.data.query.pages[pageId].thumbnail
          };
        })
        .catch(_errOut);
    })
    .catch(_errOut);
}
