FROM node:20-alpine

WORKDIR /app

# Install deps
COPY package.json ./
RUN npm install --production

# Copy server
COPY server/ ./server/

# Copy client build
COPY client/dist/ ./client/dist/

# Seed DB on first run
RUN node server/db/seed.js

EXPOSE 3000

CMD ["node", "server/index.js"]
