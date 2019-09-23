import axios from "axios";
/**
 * @param {int} id
 * @return JSON {
    success: bool,
    data : []int
    error : string
  }
 **/
export function getNeighbors(id) {
  let url = encodeURI(
    `${process.env.REACT_APP_BIGGRAPH_ENDPOINT}/neihbors?node=${id}`
  );
  return axios
    .get(url)
    .then(r => ({
      success: true,
      data: r.data
    }))
    .catch(e => ({
      success: false,
      error: "Could not get neighbor of node " + id + ": " + e.message
    }));
}
