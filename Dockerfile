# Use the official lightweight Node.js 20 image.
# https://hub.docker.com/_/node
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# Copy application dependency manifests to the container image.
# Copying this separately prevents re-running pnpm install on every code change.
COPY package.json pnpm-lock.yaml* ./

# Install dependencies.
RUN pnpm install --frozen-lockfile

# Copy local code to the container image.
COPY . .

# Build the application
# This runs "vite build" (client -> dist/public) and "esbuild" (server -> dist/index.js)
# Note: Environment variables should be set during build in GitHub Actions
RUN pnpm run build

# Run the web service on container startup.
# Cloud Run sets the PORT environment variable, which the application usually listens directly on.
# But we can also set a default just in case.
ENV PORT=8080
ENV NODE_ENV=production

# Expose the port
EXPOSE 8080

# Start the application
CMD ["pnpm", "start"]
