#!/bin/bash

# for testing that edge proxy is running from host machine
# NOTE: need to run docker-compose up -d before running this script
export LINKS_UI_URL="http://localhost:3000"
export BIG_GRAPH_URL="http://localhost:5000"
export TWO_WAY_KV_URL="http://localhost:5001"
export PROMETHEUS_URL="http://localhost:9090"
export GRAFANA_URL="http://localhost:3001"
export PORT=8443

# let config = [
# 	{
# 		route : "/"	,
# 		url : "LINKS_UI_URL",
# 	},
# 	{
# 		route : "/services/biggraph",
# 		url : "BIG_GRAPH_URL",
# 	},
# 	{
# 		route : "/services/twowaykv",
# 		url : "TWO_WAY_KV_URL"
# 	},
# 	{
# 		route : "/admin/prometheus",
# 		url : "PROMETHEUS_URL",
# 	},
# 	{
# 		route : "/admin/grafana",
# 		url : "GRAFANA_URL",
# 	},
# ]

node run_proxy.js &
PID=$!
echo $PID

curl localhost:8080
curl localhost:8080/services/biggraph
curl localhost:8080/services/twowaykv
curl localhost:8080/admin/prometheus 
curl localhost:8080/admin/grafana

pkill $PID