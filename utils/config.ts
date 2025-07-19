import { Platform } from 'react-native';

export const config = {
  // Get your computer's IP address by running: ipconfig (Windows) or ifconfig (Mac/Linux)
  // For production, replace with your deployed backend URL
  API_BASE_URL: __DEV__ 
    ? Platform.OS === 'web' 
      ? 'http://localhost:5000/api'
      : 'http://172.30.0.2:5000/api' // Current detected IP
    : 'https://your-production-backend.com/api', // Replace with production URL
  
  APP_NAME: 'Innoalaxy',
  APP_VERSION: '1.0.0',
  
  // Feature flags
  FEATURES: {
    OFFLINE_MODE: true,
    PUSH_NOTIFICATIONS: false,
    ANALYTICS: false,
  },
  
  // API timeouts
  TIMEOUTS: {
    REQUEST: 10000, // 10 seconds
    CONNECTION: 5000, // 5 seconds
  },
  
  // Cache settings
  CACHE: {
    TOOLS_TTL: 300000, // 5 minutes
    USER_TTL: 3600000, // 1 hour
  }
};

// Helper function to get the current environment
export const getEnvironment = () => {
  return __DEV__ ? 'development' : 'production';
};

// Helper function to check if running on mobile
export const isMobile = () => {
  return Platform.OS === 'ios' || Platform.OS === 'android';
};

// Helper function to get device info
export const getDeviceInfo = () => {
  return {
    platform: Platform.OS,
    version: Platform.Version,
    isWeb: Platform.OS === 'web',
    isMobile: isMobile(),
  };
};