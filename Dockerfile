# Install dependencies only when needed
FROM node:16-alpine AS deps

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

# Rebuild the source code only when needed
FROM node:14-alpine AS builder

WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules


ENV NEXT_PUBLIC_MAPBOX_API_KEY MAPBOX_API_KEY_TEMP
ENV NEXT_PUBLIC_DATA_API_URL DATA_API_URL_TEMP
ENV NEXT_PUBLIC_AUTH_API_URL AUTH_API_URL_TEMP
ENV NEXT_PUBLIC_CHAT_SOCKET_URL CHAT_SOCKET_URL_URL_TEMP

RUN npm run build

# Production image, copy all the files and run next
FROM node:14-alpine AS runner

WORKDIR /app

ENV NODE_ENV production

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/entrypoint.sh ./entrypoint.sh

EXPOSE 3000

RUN npx next telemetry disable

RUN chmod +x /app/entrypoint.sh
ENTRYPOINT ["/app/entrypoint.sh"]

CMD npm start