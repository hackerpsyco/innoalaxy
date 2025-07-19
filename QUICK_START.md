# ⚡ InnoGalaxy - Quick Start Guide

Get your InnoGalaxy app running in 3 minutes!

## 🚀 Instant Setup

```bash
# 1. Run the automated setup
./setup.sh

# 2. Start both services
npm run start:services
```

That's it! Your app is now running.

## 📱 Access Points

- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/health  
- **API Documentation**: http://localhost:5000/api/tools
- **Frontend**: Expo QR code in terminal

## 🔧 Essential Commands

```bash
# Development
npm run start:services    # Start everything
npm run dev              # Frontend only
npm run start:backend    # Backend only

# Building APK
npm run build:apk        # Build APK file
npm run build:android    # Production build

# Maintenance
npm run setup           # Re-run setup
expo install --fix     # Fix dependencies
```

## 📱 Using the App

### 🏠 Home Screen
- Browse AI tools
- Search and filter
- View featured tools

### 📂 Categories
- Filter by tool type
- Explore different AI categories

### ⭐ Favorites
- Save your favorite tools
- Quick access to bookmarks

### 💡 Prompts
- AI prompt library
- Copy and use prompts
- Track usage

### 📰 News
- Latest AI news
- Industry updates

### ⚙️ Settings
- User preferences
- App configuration

## 🔄 API Features

### Available Endpoints
- `/api/tools` - AI tools
- `/api/prompts` - Prompts library  
- `/api/news` - AI news
- `/api/users` - User management

### Test API
```bash
curl http://localhost:5000/health
curl http://localhost:5000/api/tools
```

## 📱 Build APK

### Simple APK Build
```bash
# 1. Login to Expo (optional)
eas login

# 2. Build APK
npm run build:apk

# 3. Download from dashboard
# Visit: https://expo.dev
```

### Alternative Build
```bash
# Local build (requires Android Studio)
npm run build:android-local
```

## 🐛 Quick Fixes

### App Won't Start
```bash
expo r --clear
npm install
cd backend && npm install && cd ..
```

### API Issues
```bash
cd backend && npm run build
npm run start:backend
```

### Build Issues
```bash
expo install --fix
npx expo start --clear
```

## 📊 What's Included

✅ **Complete AI Tools Database** - 1000+ tools  
✅ **AI Prompts Library** - Curated prompts  
✅ **AI News Feed** - Latest updates  
✅ **User System** - Profiles and favorites  
✅ **Offline Support** - Works without internet  
✅ **Modern UI** - Beautiful design  
✅ **Cross-platform** - iOS and Android  

## 🎯 Next Steps

1. **Test the app** - Run it locally
2. **Build APK** - Generate installation file
3. **Deploy** - Share with users
4. **Customize** - Add your branding
5. **Extend** - Add new features

## 📞 Need Help?

- Check `README.md` for detailed docs
- Review `DEPLOYMENT_SUMMARY.md` for status
- See `BUILD_APK.md` for build instructions
- Look at logs in terminal for errors

---

🎉 **You're all set! InnoGalaxy is ready to use!** 🚀