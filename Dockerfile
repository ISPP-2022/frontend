FROM node:16.13.0-alpine3.14

RUN mkdir -p /usr/src/app
ENV PORT 3000

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN yarn install --production
RUN yarn add tailwindcss@latest postcss@latest autoprefixer@latest --dev

COPY . /usr/src/app

RUN yarn build

EXPOSE 3000
CMD [ "yarn", "start" ]