# 🌟 Innoalaxy - AI Tools Discovery App

A modern React Native app built with Expo for discovering and exploring AI tools. Features a beautiful UI, offline support, and comprehensive backend API.

## 📱 Features

- **AI Tools Discovery**: Browse and discover the latest AI tools
- **Categories**: Filter tools by categories (Image, Text, Audio, Video, Code, Productivity)
- **Search**: Search tools by name, description, and tags
- **Favorites**: Save your favorite tools for quick access
- **Offline Support**: App works offline with cached data
- **Modern UI**: Beautiful gradient design with smooth animations
- **Cross-platform**: Works on Android, iOS, and Web

## 🏗️ Project Structure

```
innoalaxy/
├── app/                    # React Native app screens
│   ├── (tabs)/            # Tab navigation screens
│   ├── index.tsx          # Splash screen
│   └── tool-details.tsx   # Tool details page
├── backend/               # Express.js backend API
│   ├── src/
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   ├── config/        # Database config
│   │   └── middleware/    # Express middleware
├── utils/                 # Utility functions and API
├── data/                  # Static data files
├── types/                 # TypeScript type definitions
└── assets/                # Images and static assets
```

## 🚀 Quick Setup

### Option 1: Automated Setup (Recommended)

```bash
# Make the setup script executable
chmod +x setup.sh

# Run the setup script
./setup.sh
```

### Option 2: Manual Setup

1. **Install Dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install backend dependencies
   cd backend
   npm install
   cd ..
   
   # Install Expo CLI globally
   npm install -g @expo/cli eas-cli
   ```

2. **Get Your IP Address**
   ```bash
   npm run get-ip
   ```

3. **Configure API URL**
   Update `utils/config.ts` with your IP address:
   ```typescript
   API_BASE_URL: __DEV__ 
     ? Platform.OS === 'web' 
       ? 'http://localhost:5000/api'
       : 'http://YOUR_IP_HERE:5000/api' // Replace with your IP
   ```

## 🖥️ Development

### Start Backend Server
```bash
cd backend
npm run dev
```
Backend will run on `http://localhost:5000`

### Start Mobile App
```bash
npm run dev
```
This will start the Expo development server.

### Seed Database (Optional)
```bash
cd backend
npm run seed
```

## 📱 Building APK

### Prerequisites
1. Create an Expo account at [expo.dev](https://expo.dev)
2. Login to EAS CLI:
   ```bash
   eas login
   ```

### Configure Build
```bash
eas build:configure
```

### Build APK
```bash
# Build development APK
npm run build:preview

# Build release APK
npm run build:apk
```

The APK will be available in your Expo dashboard for download.

## 🛠️ Backend API

### Environment Variables
Create `backend/.env` file:
```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/innoalaxy
JWT_SECRET=your_secret_key
```

### API Endpoints
- `GET /api/tools` - Get all tools with filtering
- `GET /api/tools/featured` - Get featured tools
- `GET /api/tools/:id` - Get specific tool
- `POST /api/tools` - Create new tool (admin)
- `PUT /api/tools/:id` - Update tool (admin)
- `DELETE /api/tools/:id` - Delete tool (admin)

## 🎨 UI Components

### Design System
- **Colors**: Purple gradient theme (#7C3AED to #3B82F6)
- **Typography**: Modern, clean fonts with proper hierarchy
- **Animations**: Smooth transitions using React Native Reanimated
- **Layout**: Responsive design for different screen sizes

### Key Screens
- **Splash Screen**: Animated logo with tagline
- **Home**: Tool discovery with search and categories
- **Tool Details**: Comprehensive tool information
- **Favorites**: Saved tools for quick access
- **Settings**: App configuration and preferences

## 🔧 Configuration

### Mobile Development
1. Ensure your phone and computer are on the same WiFi network
2. Update the IP address in `utils/config.ts`
3. Use the Expo Go app to scan the QR code

### Production Deployment
1. Update production URLs in `utils/config.ts`
2. Configure environment variables in `backend/.env`
3. Deploy backend to your preferred hosting service
4. Build production APK using EAS Build

## 📦 Dependencies

### Frontend
- **Expo**: Cross-platform development framework
- **React Native**: Mobile app framework
- **Expo Router**: File-based navigation
- **React Native Reanimated**: Smooth animations
- **Lucide React Native**: Beautiful icons

### Backend
- **Express.js**: Web framework
- **MongoDB**: Database
- **Mongoose**: MongoDB ODM
- **JWT**: Authentication
- **CORS**: Cross-origin resource sharing

## 🚀 Deployment

### Backend Deployment Options
- **Railway**: `railway.app`
- **Heroku**: `heroku.com`
- **Vercel**: `vercel.com`
- **DigitalOcean**: `digitalocean.com`

### Frontend Deployment
- **Expo Build Service**: For APK/IPA generation
- **Expo Web**: For web deployment
- **App Stores**: Google Play Store / Apple App Store

## 🐛 Troubleshooting

### Common Issues

1. **Metro bundler issues**
   ```bash
   npx expo start --clear
   ```

2. **Cannot connect to backend**
   - Check if backend is running on correct port
   - Verify IP address in config
   - Check firewall settings

3. **Build failures**
   - Clear node_modules and reinstall
   - Check Expo CLI version
   - Verify app.json configuration

### Network Issues
- Make sure your phone and computer are on the same network
- Check if ports 5000 and 8081 are not blocked
- Try disabling firewall temporarily

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Check the troubleshooting section
- Review Expo documentation

---

Built with ❤️ using React Native and Expo
