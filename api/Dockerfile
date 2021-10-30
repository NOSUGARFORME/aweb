FROM node:12.13-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

ARG NODE_ENV
RUN if [ "$NODE_ENV" = "development" ]; \
    then npm install; \
    else npm install --only=production; \
    fi

COPY . ./

RUN npm run build