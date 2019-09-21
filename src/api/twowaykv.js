import axios from "axios"

// fetches random nodes from twowaykv
// @param n, number of random items to fetch
// @return:
// {
//   success : bool,
//   data : [{key, value}],
//   error : string
// }
export function random(n) {
  let url = encodeURI(`${process.env.REACT_APP_TWOWAYKV_ENDPOINT}/random?n=${n}`)
  return axios.get(url)
    .then(r => {
      return {
        success : true,
        data : r.data
      }
  }).catch(e => {
    return {
      success : false,
      error : "Error getting random entry: " + e.message
    }
  })
}
