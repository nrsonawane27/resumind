#!/bin/bash

# Build script for Render deployment
# This script handles Rust compilation issues

echo "🔧 Installing system dependencies..."

# Update package list
apt-get update

# Install Rust and Cargo
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
export PATH="$HOME/.cargo/bin:$PATH"

# Install build essentials
apt-get install -y build-essential

# Install Python dependencies
echo "📦 Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

echo "✅ Build completed successfully!"
