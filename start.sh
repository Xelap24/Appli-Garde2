#!/bin/sh
# Quick start script for Appli-Garde2
# Installs dependencies and starts the development server.
# Usage: ./start.sh

set -e
cd "$(dirname "$0")/project"

npm install --legacy-peer-deps
npm run dev
