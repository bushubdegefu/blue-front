# FROM node:21-alpine3.18
# FROM chainguard/bun:latest
FROM oven/bun:alpine

RUN apk add npm 

RUN npm install -g npm@latest

WORKDIR /playground

COPY . .

COPY package.json ./
COPY package-lock.json ./

RUN npm install
RUN npm run build
RUN npm install express

COPY server.js ./

# Expose the default HAProxy port
EXPOSE 4173

CMD ["npm","run","serve"]