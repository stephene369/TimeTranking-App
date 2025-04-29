#!/bin/bash

# Get the EC2 public IP
EC2_IP=$(curl -s http://169.254.169.254/latest/meta-data/public-ipv4)

# Update the frontend configuration
cd /home/ubuntu/deploy2/front-end

# Create or update .env file
echo "VITE_API_URL=http://${EC2_IP}:8080/api" > .env.production.local

# Rebuild the frontend if needed
# npm run build
