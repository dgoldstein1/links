# build environment
FROM node:9.4 as build
WORKDIR /app
COPY . /app
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install react-scripts@3.0.1 -g
RUN npm run build

# production environment
FROM dgoldstein1/reverse-proxy:0.1.4

# copy in assets
RUN mkdir -p /static-files
COPY LICENSE /static-files/LICENSE
COPY VERSION /static-files/VERSION
COPY --from=build /app/build /static-files/

ENV links_incoming_path /
ENV links_outgoing_url file:///static-files

# configure reverse-proxy
ENV PORT "3000"
ENV services links

CMD ./reverseProxy
