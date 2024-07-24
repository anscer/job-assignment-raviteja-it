FROM node:20
WORKDIR /usr/src/app
COPY package*.json index.ts ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "index.ts"]