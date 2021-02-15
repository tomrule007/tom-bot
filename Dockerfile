FROM node:14

WORKDIR /usr/src/app

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

EXPOSE 8080

# Make sure to include .dockerignore file with node_modules & npm-debug.log
COPY . .

USER node

CMD [ "yarn", "start" ]
