# Innoalaxy Backend API

Complete backend API for the Innoalaxy AI Tools Discovery App built with Node.js, Express, TypeScript, and MongoDB.

## 🚀 Features

- **Complete REST API** for AI tools, news, prompts, and user management
- **JWT Authentication** with role-based access control
- **JSON File Upload System** for easy data updates
- **Image Upload** with multer
- **MongoDB Integration** with Mongoose
- **TypeScript** for type safety
- **Input Validation** and error handling
- **Rate Limiting** and security middleware
- **Comprehensive Documentation**

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── middleware/
│   │   ├── auth.ts              # Authentication middleware
│   │   ├── validation.ts        # Input validation
│   │   └── errorHandler.ts      # Error handling
│   ├── models/
│   │   ├── Tool.ts              # AI Tool model
│   │   ├── News.ts              # AI News model
│   │   ├── Prompt.ts            # AI Prompt model
│   │   └── User.ts              # User model
│   ├── routes/
│   │   ├── toolRoutes.ts        # AI tools endpoints
│   │   ├── newsRoutes.ts        # AI news endpoints
│   │   ├── promptRoutes.ts      # AI prompts endpoints
│   │   ├── userRoutes.ts        # User management
│   │   └── uploadRoutes.ts      # File upload system
│   └── index.ts                 # Main server file
├── uploads/                     # File upload directory
├── .env                         # Environment variables
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Installation & Setup

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Environment Setup
Create a `.env` file with the following variables:

```env
# Database
MONGO_URI=mongodb://localhost:27017/innoalaxy

# JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# Server Configuration
PORT=5000
NODE_ENV=development

# File Upload
MAX_FILE_SIZE=10485760
UPLOAD_PATH=./uploads

# API Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Origins
CORS_ORIGINS=http://localhost:3000,http://localhost:19006
```

### 3. Start MongoDB
Make sure MongoDB is running on your system or use MongoDB Atlas.

### 4. Run the Server
```bash
# Development mode
npm run dev

# Production build
npm run build
npm start
```

## 📡 API Endpoints

### 🔐 Authentication
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (auth required)
- `PUT /api/users/profile` - Update profile (auth required)
- `PUT /api/users/change-password` - Change password (auth required)

### 🛠️ AI Tools
- `GET /api/tools` - Get all tools (with filtering & pagination)
- `GET /api/tools/featured` - Get featured tools
- `GET /api/tools/categories` - Get categories with counts
- `GET /api/tools/:id` - Get single tool
- `POST /api/tools` - Create tool (admin only)
- `PUT /api/tools/:id` - Update tool (admin only)
- `DELETE /api/tools/:id` - Delete tool (admin only)

### 📰 AI News
- `GET /api/news` - Get all news (with filtering & pagination)
- `GET /api/news/latest` - Get latest news (last 7 days)
- `GET /api/news/sources` - Get all news sources
- `GET /api/news/:id` - Get single news article
- `POST /api/news` - Create news (admin only)
- `PUT /api/news/:id` - Update news (admin only)
- `DELETE /api/news/:id` - Delete news (admin only)

### 🧠 AI Prompts
- `GET /api/prompts` - Get all prompts (with filtering & pagination)
- `GET /api/prompts/daily` - Get daily rotating prompts
- `GET /api/prompts/popular` - Get most popular prompts
- `GET /api/prompts/tools` - Get available tools
- `GET /api/prompts/:id` - Get single prompt
- `POST /api/prompts/:id/use` - Track prompt usage
- `POST /api/prompts` - Create prompt (admin only)
- `PUT /api/prompts/:id` - Update prompt (admin only)
- `PUT /api/prompts/daily/rotate` - Rotate daily prompts (admin only)
- `DELETE /api/prompts/:id` - Delete prompt (admin only)

### 📤 File Upload System
- `POST /api/upload/json` - Upload JSON data files (admin only)
- `POST /api/upload/image` - Upload image files (admin only)
- `GET /api/upload/sample/:type` - Get sample JSON structure

### 👥 User Management (Admin)
- `GET /api/users` - Get all users (admin only)
- `PUT /api/users/:id/role` - Update user role (admin only)
- `PUT /api/users/:id/status` - Toggle user status (admin only)

## 📊 JSON Upload System

### How to Update Data via JSON Files

1. **Get Sample JSON Structure**
   ```bash
   GET /api/upload/sample/tools
   GET /api/upload/sample/news
   GET /api/upload/sample/prompts
   ```

2. **Upload JSON Data**
   ```bash
   POST /api/upload/json
   Content-Type: multipart/form-data
   
   Body:
   - jsonFile: [your-json-file]
   - dataType: "tools" | "news" | "prompts"
   ```

### Sample JSON Formats

#### Tools JSON
```json
[
  {
    "name": "ChatGPT",
    "description": "Advanced AI chatbot for conversations",
    "category": "Text",
    "features": ["Natural language", "Code generation"],
    "link": "https://chat.openai.com",
    "logo": "https://example.com/logo.png",
    "rating": 5,
    "tags": ["AI", "Chat", "Text"],
    "isFeatured": true
  }
]
```

#### News JSON
```json
[
  {
    "title": "OpenAI Releases GPT-5",
    "summary": "Revolutionary AI model with enhanced capabilities",
    "link": "https://openai.com/gpt-5",
    "date": "2024-01-20",
    "source": "OpenAI",
    "category": "Product Launch"
  }
]
```

#### Prompts JSON
```json
[
  {
    "title": "Content Strategy Generator",
    "content": "Create a comprehensive content strategy for...",
    "tool": "ChatGPT",
    "category": "Marketing",
    "difficulty": "Intermediate",
    "tags": ["Marketing", "Strategy"],
    "isDaily": false,
    "usageCount": 0
  }
]
```

## 🔒 Security Features

- **JWT Authentication** with secure token handling
- **Password Hashing** using bcrypt
- **Rate Limiting** to prevent abuse
- **Input Validation** for all endpoints
- **CORS Configuration** for cross-origin requests
- **Helmet** for security headers
- **File Upload Validation** with size and type restrictions

## 🚀 Frontend Integration

### Example API Calls

```typescript
// Get all tools
const response = await fetch('http://localhost:5000/api/tools');
const data = await response.json();

// Get daily prompts
const prompts = await fetch('http://localhost:5000/api/prompts/daily');
const promptData = await prompts.json();

// Get latest news
const news = await fetch('http://localhost:5000/api/news/latest');
const newsData = await news.json();

// Authentication
const loginResponse = await fetch('http://localhost:5000/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

## 📈 Performance & Scalability

- **Database Indexing** for optimized queries
- **Pagination** for large datasets
- **Compression** middleware for reduced payload size
- **Error Handling** with proper HTTP status codes
- **Logging** for debugging and monitoring

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm test` - Run tests (to be implemented)

### Adding New Features
1. Create model in `src/models/`
2. Add routes in `src/routes/`
3. Add validation in `src/middleware/validation.ts`
4. Update main `src/index.ts` to include new routes

## 🌐 Deployment

### Production Checklist
- [ ] Set strong JWT_SECRET
- [ ] Configure MongoDB Atlas or production database
- [ ] Set NODE_ENV=production
- [ ] Configure CORS_ORIGINS for your domain
- [ ] Set up SSL/HTTPS
- [ ] Configure file upload limits
- [ ] Set up monitoring and logging

### Environment Variables for Production
```env
NODE_ENV=production
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/innoalaxy
JWT_SECRET=your-super-secure-production-secret
PORT=5000
CORS_ORIGINS=https://yourdomain.com,https://app.yourdomain.com
```

## 📞 Support

For questions or issues, please check the API documentation or create an issue in the repository.

---

**Innoalaxy Backend** - Powering the future of AI tools discovery! 🚀