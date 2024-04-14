FROM node:20 as base

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

COPY *config.json ./
COPY src ./src/

FROM base as production

EXPOSE 3000

CMD ["npx", "ts-node", "--project", "tsconfig.json", "src/index.ts" ]

