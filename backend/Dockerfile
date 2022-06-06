FROM node:18.3-alpine as build-step

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

CMD [ "node", "."]