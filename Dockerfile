# Stage 1: Build
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run typecheck
# Build using standard NestJS build approach if available, or just use source for dev-demo
# Since we have ts-node, we'll keep it simple for now as requested.

# Stage 2: Runtime
FROM node:20-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 3000
CMD ["npm", "start"]