# build environment
FROM node:9.4 as build
WORKDIR /app
COPY . /app
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install react-scripts@3.0.1 -g
RUN npm run build

# production environment
FROM dgoldstein1/reverse-proxy:0.1.3

# copy in assets
RUN mkdir -p /static-files
COPY LICENSE /static-files/LICENSE
COPY VERSION /static-files/VERSION
COPY --from=build /app/build /static-files/

ENV links_incoming_path /
ENV links_outgoing_url file:///static-files

# configure reverse-proxy
ENV PORT "3000"
ENV services biggraph,twowaykv,geoip,wikipedia,analytics,grafana,prometheus,links
###################
## core services ##
###################
ENV biggraph_incoming_path /services/biggraph/
ENV biggraph_outgoing_url http://graph:5000
ENV twowaykv_incoming_path /services/twowaykv/
ENV twowaykv_outgoing_url http://kv:5001
ENV wikipedia_incoming_path /services/wiki/
ENV wikipedia_outgoing_url https://en.wikipedia.org
###############
## analytics ##
###############
ENV geoip_incoming_path /analytics/api/geoIpServer/
ENV geoip_outgoing_url http://api.ipstack.com
ENV analytics_incoming_path /analytics/server/
ENV analytics_outgoing_url http://analytics-server:5000
###########
## admin ##
###########
ENV grafana_incoming_path /admin/grafana/
ENV grafana_outgoing_url http://grafana:3000
ENV prometheus_incoming_path /admin/prometheus/
ENV prometheus_outgoing_url http://prom:9090

CMD ./reverseProxy
