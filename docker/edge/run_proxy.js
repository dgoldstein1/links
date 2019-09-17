var express = require("express");
var proxy = require("http-proxy-middleware");

// simple proxy to serve as edge
var app = express();

let config = [
  {
    route: "/",
    url: "LINKS_UI_URL"
  },
  {
    route: "/services/biggraph",
    url: "BIG_GRAPH_URL"
  },
  {
    route: "/services/twowaykv",
    url: "TWO_WAY_KV_URL"
  },
  {
    route: "/admin/prometheus",
    url: "PROMETHEUS_URL"
  },
  {
    route: "/admin/grafana",
    url: "GRAFANA_URL"
  }
];

// check that all required values exist
config.forEach(v => {
  if (!process.env[v.url]) {
    console.error("required variable %s was not passed", v.url);
    process.exit(1);
  }
});
if (!process.env.PORT) {
  console.error("PORT must be defined");
  process.exit(1);
}
// configure proxy to config
config.forEach(v => {
  if (v.route == "/") {
    app.use(
      v.route,
      proxy({
        target: process.env[v.url],
        logLevel: "debug",
        onError: err => console.error(err),
        secure: false,
        changeOrigin: true,
        ws: true
      })
    );
  } else {
    app.use(v.route, proxy({ target: process.env[v.url], changeOrigin: true }));
  }
});
// serve
console.log("serving on port %s", process.env.PORT);
try {
	app.listen(process.env.PORT);
} catch (e) {
	console.error(e)
	process.exit(1)
}
