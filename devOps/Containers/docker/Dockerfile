FROM node:18-slim

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install -g pnpm

COPY . .

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "run", "dev"]