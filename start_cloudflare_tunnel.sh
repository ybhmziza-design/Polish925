#!/usr/bin/env bash
# POLISH 925 — Quick Cloudflare Tunnel Launcher

echo "======================================================"
echo "    POLISH 925 — Starting Server & Cloudflare Tunnel "
echo "======================================================"

# 1. Start Flask backend if not already running on port 5000
if ! lsof -i :5000 > /dev/null 2>&1; then
    echo "Starting local backend server on port 5000..."
    python3 backend/app.py &
    SERVER_PID=$!
    sleep 2
else
    echo "Backend server already running on port 5000."
fi

# 2. Start Cloudflare Tunnel to expose port 5000 securely
echo ""
echo "Creating secure Cloudflare Tunnel to the internet..."
echo "Look for the public https://*.trycloudflare.com link below:"
echo "------------------------------------------------------"
cloudflared tunnel --url http://127.0.0.1:5000

# Cleanup on exit
if [ -n "$SERVER_PID" ]; then
    kill $SERVER_PID
fi
