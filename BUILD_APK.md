# 📱 Building InnoGalaxy APK

This guide explains how to build the InnoGalaxy mobile app as an APK file.

## 🔧 Prerequisites

1. **Expo CLI & EAS CLI installed**
   ```bash
   npm install -g @expo/cli eas-cli
   ```

2. **Expo Account** (for cloud builds)
   ```bash
   eas login
   ```

3. **Android Studio** (for local builds - optional)

## 🚀 Quick Build (Cloud)

### Option 1: EAS Build (Recommended)
```bash
# Build APK for testing
npm run build:apk

# Or manually:
eas build --platform android --profile preview
```

### Option 2: Production Build
```bash
# Build for Google Play Store
npm run build:android

# Or manually:
eas build --platform android --profile production
```

## 🏗️ Local Build (Without Cloud)

### Prerequisites for Local Build
1. Install Android Studio
2. Set up Android SDK
3. Configure environment variables

### Build Locally
```bash
# Prepare for local build
expo run:android

# Or use npm script
npm run build:android-local
```

## 📋 Build Profiles

The `eas.json` file contains three build profiles:

### Development
- For internal testing
- Includes development tools
- Fast build time

### Preview
- **Generates APK file**
- Perfect for testing
- Can be installed directly on devices

### Production
- For app store submission
- Optimized and minified
- Requires signing keys

## 🔐 Build Configuration

### App Signing
For production builds, you'll need:
1. Android Keystore
2. Key alias and passwords
3. Configured in EAS

### Environment Variables
Make sure these are set in your environment:
```bash
# In .env file
EXPO_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

## 📥 Download Your APK

After the build completes:

1. **Via EAS Dashboard**
   - Go to https://expo.dev/accounts/[username]/projects/innoalaxy/builds
   - Download the APK file

2. **Via CLI**
   ```bash
   eas build:list
   # Copy the artifact URL and download
   ```

## 📱 Installing APK

### On Android Device
1. Enable "Unknown Sources" in Settings
2. Transfer APK to device
3. Open file and install

### Using ADB
```bash
adb install innoalaxy.apk
```

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear Expo cache
expo r --clear

# Update dependencies
expo install --fix

# Check EAS configuration
eas build:configure
```

### Environment Issues
```bash
# Check environment
expo config

# Verify EAS configuration
eas config
```

### Asset Issues
- Ensure all required images exist in `assets/images/`
- Verify icon dimensions (1024x1024 for icon.png)
- Check splash screen (2048x2048 for splash.png)

## 📊 Build Status

You can monitor your build progress:

```bash
# List all builds
eas build:list

# View specific build
eas build:view [build-id]

# Follow build logs
eas build:view [build-id] --logs
```

## 🔄 Updating the App

To release updates:

1. Update version in `app.json`
2. Build new APK
3. Distribute to users
4. Or use Expo Updates for OTA updates

## 📱 Final APK Features

Your InnoGalaxy APK will include:

✅ **Complete AI Tools Database**
- Browse 1000+ AI tools
- Advanced search and filtering
- Categories and tags

✅ **AI Prompts Library**  
- Curated prompt collection
- Usage tracking
- Daily prompts

✅ **AI News & Updates**
- Latest AI news
- Industry updates
- Trend analysis

✅ **User Features**
- Favorites and bookmarks
- User profiles
- Settings and preferences

✅ **Offline Support**
- Fallback data when API unavailable
- Cached content
- Smooth user experience

## 🎯 Distribution

### Internal Testing
- Share APK directly with testers
- Use Google Play Console for closed testing

### Public Release
- Upload to Google Play Store
- Follow Play Store guidelines
- Include proper descriptions and screenshots

---

🎉 **Congratulations!** You now have a fully functional InnoGalaxy APK ready for distribution!