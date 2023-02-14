FROM node:16.19-bullseye-slim
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

RUN  npm run build; npx prisma generate

EXPOSE 80



CMD [ "node", "dist/main.js"]