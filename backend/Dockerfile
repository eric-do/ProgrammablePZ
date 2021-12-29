FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

ENV NEW_RELIC_NO_CONFIG_FILE=true

EXPOSE 3001

CMD [ "node", "server/index.js" ]