FROM node:latest

WORKDIR /app

# Clone your repository
RUN git clone https://github.com/kechangdev/homepage.git

# Change the working directory to your repository name
WORKDIR /app/homepage

# Install dependencies
RUN npm install

# Expose the application port
EXPOSE 3000

# Use CMD to start the application. Modify this to align with your package.json scripts.
CMD ["npm", "run", "dev"]