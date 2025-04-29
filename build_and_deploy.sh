#!/bin/bash

echo "=== Starting build and deploy process ==="

# Step 1: Run the update_front_config.py script
echo "Updating frontend configuration..."
python3 /home/ubuntu/deploy2/update_front_config.py

# Step 2: Build the frontend
echo "Building frontend..."
cd /home/ubuntu/deploy2/front-end
/home/ubuntu/.nvm/versions/node/v20.19.1/bin/npm install
/home/ubuntu/.nvm/versions/node/v20.19.1/bin/npm run build

# Step 3: Terminate any existing HTTP server on port 8000
echo "Terminating any existing HTTP server on port 8000..."
pid=$(lsof -t -i:8000)
if [ -n "$pid" ]; then
    echo "Killing process $pid running on port 8000"
    kill -9 $pid
else
    echo "No process found running on port 8000"
fi

# Step 4: Start a new HTTP server in the background
echo "Starting HTTP server on port 8000..."
cd /home/ubuntu/deploy2/front-end/dist
nohup /home/ubuntu/.nvm/versions/node/v20.19.1/bin/npx http-server -p 8000 > /dev/null 2>&1 &

echo "=== Build and deploy process completed ==="
echo "Frontend is now available at http://$(curl -s https://api.ipify.org):8000"
