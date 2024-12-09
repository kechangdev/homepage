FROM node:current-alpine AS builder

WORKDIR /app

RUN apk add --no-cache git

RUN git clone https://github.com/kechangdev/homepage.git .

RUN npm install

RUN npm run build

FROM node:current-alpine AS production

WORKDIR /app

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

RUN npm prune --production

EXPOSE 3000

CMD ["npm", "start"]