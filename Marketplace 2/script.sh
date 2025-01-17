#!/bin/bash

# Script to install Node.js and npm on Ubuntu

echo "Installing pre-requisites"

# Update package list and install required dependencies
apt-get update -y

# Install necessary packages
apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    lsb-release \
    apt-transport-https \
    software-properties-common

# Add NodeSource repository for Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -

# Install Node.js and npm
echo "Installing Node.js and npm..."
apt-get install -y nodejs

# Verify Node.js and npm installation
echo "Verifying Node.js installation..."
node -v

echo "Verifying npm installation..."
npm -v

# Create a project directory and initialize a Node.js project
echo "Creating project directory: hello-world-node"
mkdir hello-world-node
cd hello-world-node

# Initialize Node.js project
echo "Initializing Node.js project..."
npm init -y

# Create a simple Node.js app
echo "Creating hello.js inside hello-world-node..."
cat > hello.js << EOL
console.log("Hello, Node.js!");
EOL

# Run the Node.js application
echo "Starting the Node.js application..."
node hello.js