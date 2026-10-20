# muestra de dockerfile para revisar el resaltado de dark dev
ARG NODE_VERSION=20
FROM node:${NODE_VERSION}-alpine AS build
LABEL maintainer="rezzt"
ENV NODE_ENV=production PORT=3000
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev && \
    npm cache clean --force
COPY . .
EXPOSE 3000
HEALTHCHECK --interval=30s CMD wget -qO- http://localhost:3000 || exit 1
USER node
ENTRYPOINT ["node"]
CMD ["server.js"]
