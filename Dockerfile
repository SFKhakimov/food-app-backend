FROM node:14.18-alpine

WORKDIR /apps/food-app
COPY . /apps/food-app

RUN yarn install
