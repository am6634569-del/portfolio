FROM node:20-alpine

WORKDIR /app

# Copy server package files and install dependencies
COPY server/package*.json ./server/
RUN cd server && npm install --production

# Copy server source code
COPY server/ ./server/

# Set default port
ENV PORT=5000
EXPOSE 5000

# Start server
CMD ["node", "server/server.js"]
