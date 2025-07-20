# 🚀 InnoGalaxy - AI Tools Discovery Platform

InnoGalaxy is a comprehensive AI tools discovery platform that helps users find, explore, and learn about the latest AI tools and technologies. It features a React Native frontend with Expo and a Node.js/Express backend with MongoDB support.

## ✨ Features

### Frontend (React Native + Expo)
- 📱 Cross-platform mobile app (iOS & Android)
- 🎨 Beautiful, modern UI with smooth animations
- 🔍 Advanced search and filtering
- ⭐ Favorites and bookmarking system
- 📰 AI news and updates
- 💡 AI prompts library
- 📊 User profiles and settings
- 🌙 Dark/Light theme support

### Backend (Node.js + Express)
- 🔐 JWT-based authentication
- 📊 RESTful API with comprehensive endpoints
- 🗄️ MongoDB integration with fallback data
- 🛡️ Security middleware (helmet, rate limiting, CORS)
- 📁 File upload support
- 🔄 Real-time error handling
- 📝 Comprehensive logging

### API Endpoints
- `/api/tools` - AI tools management
- `/api/prompts` - AI prompts library
- `/api/news` - AI news and updates
- `/api/users` - User management and authentication
- `/api/upload` - File upload services

## 🛠️ Tech Stack

### Frontend
- **React Native** - Cross-platform mobile development
- **Expo** - Development platform and tools
- **TypeScript** - Type safety
- **Expo Router** - File-based routing
- **React Native Reanimated** - Smooth animations
- **Lucide React Native** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - Database (with fallback support)
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (optional - app has fallback data)
- Android Studio (for Android development)
- Xcode (for iOS development - macOS only)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd innoalaxy
   ```

2. **Run the setup script**
   ```bash
   ./setup.sh
   ```

3. **Start the application**
   ```bash
   npm run start:services
   ```

### Manual Setup

If you prefer manual setup:

1. **Install dependencies**
   ```bash
   npm install
   cd backend && npm install && cd ..
   ```

2. **Set up environment variables**
   ```bash
   # Copy and edit .env files
   cp .env.example .env
   cp backend/.env.example backend/.env
   ```

3. **Build backend**
   ```bash
   npm run build:backend
   ```

4. **Start services**
   ```bash
   # Start both frontend and backend
   npm run start:services
   
   # Or start individually
   npm run start:backend  # Backend only
   npm run dev           # Frontend only
   ```

## 📱 Building APK

### Using EAS Build (Recommended)
```bash
# Build APK for testing
npm run build:apk

# Build for Google Play Store
npm run build:android
```

### Local Build
```bash
# Requires Android SDK
npm run build:android-local
```

## 🔧 Configuration

### Environment Variables

#### Frontend (.env)
```env
EXPO_PUBLIC_API_URL=http://localhost:5000/api
EXPO_PUBLIC_API_BASE_URL=http://localhost:5000
EXPO_PUBLIC_APP_NAME=Innoalaxy
EXPO_PUBLIC_APP_VERSION=1.0.0
EXPO_NO_TELEMETRY=1
```

#### Backend (backend/.env)
```env
# Database
MONGO_URI=mongodb://localhost:27017/innoalaxy
NODE_ENV=development

# Server
PORT=5000

# Security
JWT_SECRET=your-super-secure-jwt-secret-key
JWT_EXPIRES_IN=7d

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS
FRONTEND_URL=http://localhost:8081
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:8081
```

## 📊 API Documentation

### Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - User login
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile

### AI Tools
- `GET /api/tools` - Get all tools (with filtering)
- `GET /api/tools/:id` - Get tool by ID
- `GET /api/tools/featured` - Get featured tools
- `GET /api/tools/categories` - Get tool categories

### AI Prompts
- `GET /api/prompts` - Get all prompts
- `GET /api/prompts/:id` - Get prompt by ID
- `GET /api/prompts/daily` - Get daily prompts
- `POST /api/prompts/:id/use` - Track prompt usage

### AI News
- `GET /api/news` - Get all news
- `GET /api/news/:id` - Get news by ID
- `GET /api/news/latest` - Get latest news

## 🏗️ Project Structure

```
innoalaxy/
├── app/                    # Frontend screens
│   ├── (tabs)/            # Tab navigation screens
│   ├── index.tsx          # Splash screen
│   └── _layout.tsx        # Root layout
├── backend/               # Backend API
│   ├── src/
│   │   ├── config/        # Database config
│   │   ├── middleware/    # Express middleware
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── index.ts       # Server entry point
│   └── dist/              # Compiled JavaScript
├── assets/                # Static assets
├── data/                  # Fallback data
├── types/                 # TypeScript definitions
├── utils/                 # Utility functions
├── eas.json              # EAS build configuration
├── app.json              # Expo configuration
└── package.json          # Dependencies and scripts
```

## 🔄 Development Workflow

### Starting Development
```bash
# Start both services
npm run start:services

# Development with hot reload
npm run dev
```

### Building for Production
```bash
# Build backend
npm run build:backend

# Build APK
npm run build:apk

# Build all
npm run build:all
```

### Testing
```bash
# Frontend
expo start --tunnel  # For testing on physical devices

# Backend
curl http://localhost:5000/health
```

## 🌐 Deployment

### Backend Deployment
1. Set up MongoDB Atlas or local MongoDB
2. Configure environment variables
3. Build and deploy to your preferred platform (Heroku, DigitalOcean, etc.)

### Mobile App Deployment
1. Build APK using EAS Build
2. Test thoroughly on different devices
3. Submit to Google Play Store / Apple App Store

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Backend not starting**
   ```bash
   cd backend && npm run build && npm start
   ```

3. **Database connection issues**
   - Check MongoDB is running
   - Verify MONGO_URI in .env
   - App will use fallback data if DB unavailable

4. **Build issues**
   ```bash
   expo install --fix
   npm install
   ```

### Getting Help
- Check the logs for detailed error messages
- Ensure all dependencies are properly installed
- Verify environment variables are set correctly

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the repository
- Check the troubleshooting section
- Review the API documentation

---

Made with ❤️ by the InnoGalaxy Team
