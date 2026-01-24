# Use the official lightweight Node.js 20 image.
# https://hub.docker.com/_/node
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /app

# Install pnpm
RUN corepack enable && corepack prepare pnpm@10.4.1 --activate

# Copy package.json and pnpm-lock.yaml for dependency installation
COPY package.json pnpm-lock.yaml* ./

# Install production dependencies only
# esbuild uses --packages=external, so runtime dependencies are needed
RUN pnpm install --prod --frozen-lockfile || pnpm install --prod --no-frozen-lockfile

# Copy the pre-built application (built in GitHub Actions)
# dist/ contains both the client (dist/public) and server (dist/index.js)
COPY dist/ ./dist/

# Run the web service on container startup.
# Cloud Run sets the PORT environment variable, which the application usually listens directly on.
# But we can also set a default just in case.
ENV PORT=8080
ENV NODE_ENV=production

# Expose the port
EXPOSE 8080

# Start the application
CMD ["pnpm", "start"]
