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
  // get extracts
  let url = process.env.REACT_APP_WIKIMETA_ENDPOINT;
  url += "?action=opensearch";
  url += "&limit=1";
  url += "&namespace=0";
  url += "&format=json";
  url += `&search=${s}`;

  let _errOut = e => ({
    success: false,
    error: `Could not get description from wikipedia for article ${s}: ${e}`
  });

  return axios
    .get(encodeURI(url))
    .then(r => {
      let pageTitle = r.data[1];
      if (!pageTitle) return _errOut("no page found");
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
