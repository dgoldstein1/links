# build environment
FROM node:9.4 as build
WORKDIR /app
COPY . /app
RUN npm install
ENV PATH /app/node_modules/.bin:$PATH
RUN npm install react-scripts@3.0.1 -g
RUN npm run build

# production environment
FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY VERSION /VERSION
COPY LICENSE /LICENSE
ENV REACT_APP_ENV "production"
RUN rm /etc/nginx/conf.d/default.conf
COPY docker/nginx/nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
