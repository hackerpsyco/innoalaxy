#!/bin/bash

echo "🚀 Starting Innoalaxy Development Environment"
echo "============================================="

# Function to check if port is in use
check_port() {
    lsof -i :$1 >/dev/null 2>&1
    return $?
}

# Function to kill process on port
kill_port() {
    lsof -ti :$1 | xargs kill -9 2>/dev/null
}

# Kill existing processes on development ports
echo "🧹 Cleaning up existing processes..."
kill_port 5000
kill_port 8081
sleep 2

echo "🌐 Current IP configuration:"
node scripts/get-ip.js

echo ""
echo "🖥️ Starting Backend Server..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait for backend to start
sleep 3

echo "📱 Starting Frontend Development Server..."
cd ..
EXPO_NO_TELEMETRY=1 expo start &
FRONTEND_PID=$!

echo ""
echo "✅ Development environment started!"
echo "📍 Backend: http://localhost:5000"
echo "📍 Frontend: http://localhost:8081"
echo ""
echo "📱 To test on mobile device:"
echo "1. Install Expo Go app on your phone"
echo "2. Scan the QR code that appears"
echo "3. Make sure your phone is on the same WiFi network"
echo ""
echo "🛑 To stop both servers, press Ctrl+C"

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping development servers..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    kill_port 5000
    kill_port 8081
    echo "✅ Development environment stopped"
    exit 0
}

# Trap SIGINT (Ctrl+C) and SIGTERM
trap cleanup SIGINT SIGTERM

# Wait for background processes
wait