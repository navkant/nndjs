# Stage 1: Build Node.js application
FROM nginx:alpine
# WORKDIR /usr/share/nginx/htmls

FROM node:lts-alpine AS node_builder
# WORKDIR /app
# COPY package*.json ./
# RUN npm install
# COPY . .:
# RUN npm run build # If you have a build step for your Node.js app

# Stage 2: Build Python application
FROM python:3.9-alpine AS python_builder
# WORKDIR /app
# COPY requirements.txt ./
# RUN pip install -r requirements.txt
# COPY . .

# Stage 3: Final image with Nginx and application artifacts

# Copy Nginx configuration (if needed)
# COPY nginx.conf /etc/nginx/conf.d/default.conf # Adjust path as needed for your config

# Copy built Node.js application (e.g., static assets)
# COPY --from=node_builder /app/build ./node-app # Adjust source/destination paths

# Copy Python application (e.g., a Flask/Django app)
# COPY --from=python_builder /app ./python-app

# Expose port 80 for Nginx
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]