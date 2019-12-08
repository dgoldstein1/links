# build environment
# FROM node:9.4 as build
# WORKDIR /app
# COPY . /app
# RUN npm install
# ENV PATH /app/node_modules/.bin:$PATH
# RUN npm install react-scripts@3.0.1 -g
# RUN npm run build

# production environment
FROM golang:1.12
# setup go
ENV GOBIN $GOPATH/bin
ENV PATH $GOBIN:/usr/local/go/bin:$PATH
ENV GO11MODULE "on"
WORKDIR /

# build server binary
COPY ./docker/prod-server /
RUN go build -o links-server
RUN ls links-server

# copy in assets
COPY LICENSE /LICENSE
COPY VERSION /VERSION
# COPY --from=build /app/build /build
COPY ./build /build

ENV PORT "5001"
CMD ./links-server
