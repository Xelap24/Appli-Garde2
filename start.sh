#!/bin/sh
# Quick start script for Appli-Garde2
# Installs dependencies and starts the development server.
# Usage: ./start.sh

set -e
cd "$(dirname "$0")/project"

if [ ! -d node_modules ]; then
  npm install --legacy-peer-deps
fi
npm run dev
