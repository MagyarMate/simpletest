# Step 1

FROM node:18.3-alpine as build-step

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build

# Step 2

FROM nginx:1.22-alpine

COPY --from=build-step app/dist/simpletest-frontend /usr/share/nginx/html
