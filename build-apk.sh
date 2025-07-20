#!/bin/bash

echo "📱 Innoalaxy APK Build Guide"
echo "============================"

# Check if EAS CLI is installed
if ! command -v eas &> /dev/null; then
    echo "❌ EAS CLI is not installed. Installing now..."
    npm install -g eas-cli
fi

echo "✅ EAS CLI is available"

# Check if user is logged in
if ! eas whoami &> /dev/null; then
    echo ""
    echo "🔐 You need to login to Expo to build APK"
    echo "1. Create an account at: https://expo.dev"
    echo "2. Run: eas login"
    echo "3. Then run this script again"
    exit 1
fi

echo "✅ Logged in to Expo"

# Check if project is configured
if [ ! -f "eas.json" ]; then
    echo "🔧 Configuring EAS Build..."
    eas build:configure
fi

echo ""
echo "🏗️ Building APK..."
echo "Choose build type:"
echo "1. Development APK (includes development tools, larger size)"
echo "2. Preview APK (optimized, smaller size, recommended)"
echo "3. Production APK (for app store submission)"

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo "🔨 Building development APK..."
        eas build --platform android --profile development
        ;;
    2)
        echo "🔨 Building preview APK..."
        eas build --platform android --profile preview
        ;;
    3)
        echo "🔨 Building production APK..."
        eas build --platform android --profile production
        ;;
    *)
        echo "❌ Invalid choice. Building preview APK by default..."
        eas build --platform android --profile preview
        ;;
esac

echo ""
echo "🎉 Build process initiated!"
echo "📱 Your APK will be available in your Expo dashboard when complete"
echo "🔗 Visit: https://expo.dev/accounts/[your-username]/projects/innoalaxy-ai-tools/builds"
echo ""
echo "💡 Tips:"
echo "- Development builds are larger but include debugging tools"
echo "- Preview builds are optimized and smaller in size"
echo "- Production builds are for app store submission"
echo "- Build time is usually 10-15 minutes"