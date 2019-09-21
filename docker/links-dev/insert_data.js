const axios = require("axios");
const kv = "http://kv:5001";
const graph = "http://graph:5000";
// const kv = "http://localhost:5001"
// const graph = "http://localhost:5000"

// insert mock data into twowaykv and biggraph
function insertNodes(n) {
  // create entries
  let keys = [];
  for (var i = 0; i < n; i++) keys.push(i + "");
  let url = kv + "/entries";
  console.log("posting to ", url);
  axios.post(url, keys).then(r => {
    // yay!!
    // add edge for each node
    let neighbors = [];
    for (var i = 0; i < n; i++) {
      url = graph + "/edges?node=" + r.data.entries[i].value;
      neighbors = [];
      for (let i = 0; i < 5; i++) {
        let j = Math.floor(Math.random() * Math.floor(n));
        neighbors.push(r.data.entries[j].value);
      }
      console.log("posting to " + url + " body: ", { neighbors });
      axios.post(url, { neighbors });
    }
  });
}

// wait a few seconds, then run
console.log("sleeping for 5s..");
setTimeout(() => {
  insertNodes(100);
}, 5000);
