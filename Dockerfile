# Use the official lightweight Node.js 20 image.
# https://hub.docker.com/_/node
FROM node:20-slim

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install dependencies.
# If you add a package-lock.json speed your build by switching to 'npm ci'.
RUN npm ci

# Copy local code to the container image.
COPY . .

# Build the application
# This runs "vite build" (client -> dist/public) and "esbuild" (server -> dist/index.js)
RUN npm run build

# Run the web service on container startup.
# Cloud Run sets the PORT environment variable, which the application usually listens directly on.
# But we can also set a default just in case.
ENV PORT=8080
ENV NODE_ENV=production

# Expose the port
EXPOSE 8080

# Start the application
CMD ["npm", "start"]
