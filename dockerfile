# --- Stage 1: The Build Environment ---
# We use a Node.js base image to install dependencies and build the app.
FROM node:18-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the dependency files and install them.
# We do this first to leverage Docker's build cache.
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of your application code
COPY . .

# Run the Next.js build command
RUN npm run build

# --- Stage 2: The Production Environment ---
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy necessary files from the build stage.
# The `standalone` folder contains the self-contained app.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# Copy the public folder with assets like images, fonts, etc.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
# This is the crucial line for CSS: copy the static folder
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Expose the port your application will run on
EXPOSE 3000

# Set the command to run the application in production mode
CMD ["node", "server.js"]