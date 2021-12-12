FROM node:14.16.1-alpine3.13

ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR /usr/src/app

COPY ./dist/ ./dist/

COPY ecosystem.config.js package.json package-lock.json tsconfig.json .eslintrc.js ./

RUN npm install pm2 -g
RUN npm install --production --ignore-scripts --prefer-offline

CMD ["pm2-docker", "ecosystem.config.js"]
