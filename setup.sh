#!/bin/bash

echo "🚀 Innoalaxy App Setup Script"
echo "=============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install root dependencies
echo "📦 Installing root dependencies..."
npm install

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd backend
npm install
echo "✅ Backend dependencies installed"

# Go back to root
cd ..

# Install Expo CLI globally if not already installed
if ! command -v expo &> /dev/null; then
    echo "📱 Installing Expo CLI globally..."
    npm install -g @expo/cli
fi

# Install EAS CLI globally if not already installed
if ! command -v eas &> /dev/null; then
    echo "🏗️ Installing EAS CLI globally..."
    npm install -g eas-cli
fi

echo "✅ Setup completed successfully!"
echo ""
echo "🌐 Getting your IP address for mobile development..."
node scripts/get-ip.js

echo "🎯 Next Steps:"
echo "1. Update utils/config.ts with your IP address (shown above)"
echo "2. Start the backend: cd backend && npm run dev"
echo "3. In a new terminal, start the app: npm run dev"
echo "4. To build APK: npm run build:apk"
echo ""
echo "📱 For APK building, you'll need to:"
echo "1. Create an Expo account: https://expo.dev"
echo "2. Login to EAS: eas login"
echo "3. Configure your project: eas build:configure"
echo ""
echo "Happy coding! 🎉"