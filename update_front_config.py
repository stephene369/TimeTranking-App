#!/usr/bin/env python3
import requests
import os
import socket

# Try multiple methods to get the public IP
def get_public_ip():
    # Method 1: Using external service
    try:
        response = requests.get('https://api.ipify.org', timeout=5)
        if response.status_code == 200:
            return response.text
    except:
        pass
    
    # Method 2: EC2 metadata service
    try:
        response = requests.get('http://169.254.169.254/latest/meta-data/public-ipv4', timeout=2)
        if response.status_code == 200 and response.text:
            return response.text
    except:
        pass
    
    # Method 3: DNS lookup of the hostname
    try:
        hostname = socket.gethostname()
        return socket.gethostbyname(hostname)
    except:
        pass
    
    # Fallback to the current EC2 public IP
    return "18.208.248.206"  # Your current EC2 public IP

# Get the public IP
public_ip = get_public_ip()
print(f"Detected public IP: {public_ip}")

# Update the frontend .env file
frontend_env_path = "/home/ubuntu/deploy/front-end/.env"
with open(frontend_env_path, "w") as f:
    f.write(f"VITE_API_URL=http://{public_ip}:8080/api\n")
print(f"Updated {frontend_env_path}")

# Optionally update vite.config.js
vite_config_path = "/home/ubuntu/deploy/front-end/vite.config.js"
if os.path.exists(vite_config_path):
    with open(vite_config_path, "r") as f:
        content = f.read()
    
    # Replace the proxy target
    if "target:" in content:
        updated_content = content.replace(
            "target: 'http://localhost:8080'", 
            f"target: 'http://{public_ip}:8080'"
        )
        with open(vite_config_path, "w") as f:
            f.write(updated_content)
        print(f"Updated {vite_config_path}")
