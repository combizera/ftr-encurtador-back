FROM node:jod-alpine

ENV PORT=8080

RUN mkdir -p /usr/src/app && chown -R node:node /usr/src/app

WORKDIR /usr/src/app

COPY package*.json ./

USER node

COPY --chown=node:node . .

RUN npm install && npm run build

EXPOSE ${PORT}

CMD [ "node", "build/server.js" ]