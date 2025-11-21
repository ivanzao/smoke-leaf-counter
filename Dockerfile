# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Export
# We use a scratch image to export only the build artifacts
FROM scratch AS export
COPY --from=builder /app/dist /
