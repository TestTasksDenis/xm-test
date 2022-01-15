# Stage 1: Angular
FROM node:17-alpine3.14 AS build

WORKDIR /usr/src/app

RUN npm install -g @angular/cli

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN ng build --configuration development

FROM nginx:alpine

# Stage 2: Nginx
COPY --from=build /usr/src/app/dist/xm-test /usr/share/nginx/html

COPY /nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
