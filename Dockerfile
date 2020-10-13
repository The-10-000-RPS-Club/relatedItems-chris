FROM node:12.18.2

RUN mkdir -p /src/app

WORKDIR /src/app

COPY . /src/app

RUN npm install

RUN npm run builder

EXPOSE 3004

CMD ["npm", "start"]
