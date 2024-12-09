FROM node:latest AS builder

WORKDIR /app

RUN git clone https://github.com/kechangdev/homepage.git .

RUN npm install

RUN npm run build

FROM node:latest AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

RUN npm install --only=production

EXPOSE 3000

CMD ["npm", "start"]