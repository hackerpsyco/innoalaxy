#!/bin/bash

echo "🚀 Testing Innoalaxy APK Download System"
echo "========================================"

# Check if backend directory exists
if [ ! -d "backend" ]; then
    echo "❌ Backend directory not found!"
    exit 1
fi

cd backend

# Check if APK file exists
if [ ! -f "apk/innoalaxy-sample.apk" ]; then
    echo "📱 Creating sample APK file..."
    echo "3" | node scripts/manage-apk.js > /dev/null 2>&1
fi

echo "✅ APK file found: $(ls apk/)"

# Check if dependencies are installed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install > /dev/null 2>&1
fi

echo "✅ Dependencies ready"

# Build the project
echo "🔨 Building TypeScript..."
npm run build > /dev/null 2>&1

if [ $? -eq 0 ]; then
    echo "✅ Build successful"
else
    echo "❌ Build failed. Please check for TypeScript errors."
    exit 1
fi

echo ""
echo "🎉 APK Download System is ready!"
echo ""
echo "📋 Quick Start Guide:"
echo "1. Start the server:"
echo "   cd backend && npm run dev"
echo ""
echo "2. Open in browser:"
echo "   http://localhost:5000/api/apk/page"
echo ""
echo "3. API Endpoints:"
echo "   - Download page: http://localhost:5000/api/apk/page"
echo "   - APK info: http://localhost:5000/api/apk/info"
echo "   - Direct download: http://localhost:5000/api/apk/download/innoalaxy-sample.apk"
echo ""
echo "4. Manage APK files:"
echo "   cd backend && npm run apk"
echo ""
echo "📖 For detailed instructions, see: backend/APK_DOWNLOAD_README.md"