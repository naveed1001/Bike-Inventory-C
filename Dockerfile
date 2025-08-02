# 📦 Use Node.js v18 based on Alpine Linux (lightweight)
FROM node:18-alpine AS builder

# 📁 Set working directory. All following commands will run inside /app
WORKDIR /app

# 📄 Copy only package.json and package-lock.json. Helps Docker cache this layer to avoid reinstalling dependencies unless they change
COPY package*.json ./


# 📦 Install project dependencies from package.json (e.g., Express, MySQL driver, etc.)
RUN npm install

# 📄 Copy all remaining source code into the image Includes your app files, routes, configs, etc.
COPY . .

# 🚪 Expose port 3000 to the host So your app can be accessed via container:3000
EXPOSE 3000

# ▶️ Start the application using npm. This should call "start" script in package.json
# Example: "start": "node server.js"
CMD ["npm", "start"]