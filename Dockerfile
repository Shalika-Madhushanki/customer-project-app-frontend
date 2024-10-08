# Start with a node base image for building the React app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Use a lightweight web server (serve)
FROM node:18-alpine

# Install serve to serve the static files
RUN npm install -g serve

# Copy the build output from the previous stage
COPY --from=build /app/build /app/build

# Expose the application port
EXPOSE 3000

# Start the app with serve
CMD ["serve", "-s", "/app/build"]
