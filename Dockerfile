# Stage 1: Build the application
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package.json and yarn.lock to cache dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all files (including your TypeScript source code)
COPY . .

# Build the Next.js app
RUN yarn build

# ===========================================
# Stage 2: Run the application
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy the build output from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/public ./public

# Expose port 3000
EXPOSE 3000

# Start the Next.js app
CMD ["yarn", "start"]
