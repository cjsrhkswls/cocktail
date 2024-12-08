# Use Node.js 20.11.1 base image
FROM node:20.11.1-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy project files
COPY . .

# Expose API port
EXPOSE 3000

# Run the server
CMD ["node", "server.js"]
