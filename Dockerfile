FROM node:16 AS build

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm ci

COPY . .

RUN npm run build

#Port 80 automatically exposed
FROM httpd:2.4
WORKDIR /usr/local/apache2/htdocs/
COPY --from=build /app/build/ .