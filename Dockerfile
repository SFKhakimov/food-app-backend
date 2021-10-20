FROM node:14.15

WORKDIR /apps/food-app
COPY . /apps/food-app

RUN yarn install
