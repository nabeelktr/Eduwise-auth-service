FROM node:21-alpine3.18

WORKDIR /app

COPY package.json package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 8081

CMD ["npm", "run", "start:prod"]

