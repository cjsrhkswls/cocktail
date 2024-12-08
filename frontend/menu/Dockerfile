# Use Node.js 20.11.1 base image
FROM node:20.11.1-alpine AS build

# Set working directory
WORKDIR /app

# Install Angular CLI
RUN npm install -g @angular/cli@17.2.3

# Copy project files
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Angular app
RUN ng build --prod

# Use Nginx to serve built files
FROM nginx:alpine
COPY --from=build /app/dist/hohobar /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
