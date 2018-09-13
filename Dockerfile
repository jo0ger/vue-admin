# build stage
FROM node:8.12.0-alpine as build-stage

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app/package.json

RUN yarn config set registry 'https://registry.npm.taobao.org'

RUN yarn install

COPY . .

RUN npm run build

# production stage
FROM nginx:1.13.12-alpine as production-stage

COPY --from=build-stage /usr/src/app/dist /usr/share/nginx/html

COPY --from=build-stage /usr/src/app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
