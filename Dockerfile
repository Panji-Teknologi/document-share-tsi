FROM node:20-alpine

WORKDIR /app

COPY . .

# Tambahkan ini untuk memastikan .env ter-copy
COPY .env .env

RUN npm install --legacy-peer-deps

RUN npm run db:generate && npm run build

EXPOSE 5000

CMD ["npm", "start"]
