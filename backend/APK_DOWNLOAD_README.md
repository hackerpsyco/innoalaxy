# 📱 Innoalaxy APK Download System

This system provides a simple and secure way to distribute your Innoalaxy Android APK files through your backend server.

## 🚀 Features

- **Secure APK Download**: Professional download page with file validation
- **Beautiful UI**: Modern, responsive download interface
- **File Management**: Easy APK file management through CLI tool
- **Auto-Detection**: Automatically serves the latest APK file
- **File Information**: Shows file size, version, and last update date

## 📁 Directory Structure

```
backend/
├── apk/                    # APK files storage directory
├── src/routes/apkRoutes.ts # APK download routes
└── scripts/manage-apk.js   # APK management utility
```

## 🌐 Endpoints

### Download Page
- **URL**: `http://localhost:5000/api/apk/page`
- **Description**: Beautiful HTML page for downloading APK
- **Method**: GET

### APK Information
- **URL**: `http://localhost:5000/api/apk/info`
- **Description**: Get APK file information (JSON)
- **Method**: GET
- **Response**:
```json
{
  "success": true,
  "data": {
    "filename": "innoalaxy-v1.0.0.apk",
    "size": 25600000,
    "modified": "2024-01-20T10:30:00.000Z",
    "downloadUrl": "/api/apk/download/innoalaxy-v1.0.0.apk"
  }
}
```

### Direct Download
- **URL**: `http://localhost:5000/api/apk/download/:filename`
- **Description**: Direct APK file download
- **Method**: GET

## 🛠️ How to Use

### 1. Start the Server
```bash
cd backend
npm run dev
```

### 2. Access the Download Page
Open your browser and go to: `http://localhost:5000/api/apk/page`

### 3. Manage APK Files

#### Using the CLI Tool:
```bash
# Navigate to backend directory
cd backend

# Run the APK manager
npm run apk
```

#### Options in the CLI tool:
1. **List APK files** - View all APK files in the directory
2. **Copy APK file to server** - Upload your APK file
3. **Create sample APK** - Create a test file for demonstration
4. **Delete APK file** - Remove an APK file
5. **Exit** - Close the tool

#### Manual Method:
```bash
# Copy your APK file to the apk directory
cp /path/to/your/app.apk backend/apk/
```

## 📱 For Users (How to Download)

1. Visit the download page: `http://localhost:5000/api/apk/page`
2. You'll see:
   - App name and logo
   - Download button
   - File information (size, version, last update)
3. Click "📱 Download APK" to download the file
4. Install the APK on your Android device

## 🔒 Security Features

- **File Type Validation**: Only `.apk` files are accepted
- **Path Traversal Protection**: Prevents directory traversal attacks
- **File Existence Checks**: Validates file existence before serving
- **Error Handling**: Graceful error handling with user-friendly messages

## 🎨 Customization

### Modify the Download Page
Edit `backend/src/routes/apkRoutes.ts` in the `/page` route to customize:
- App name and branding
- Colors and styling
- Logo and icons
- Text content

### Add Authentication (Optional)
To add authentication to APK downloads, modify the routes in `apkRoutes.ts`:

```typescript
// Add authentication middleware
import { authenticateUser } from '../middleware/auth';

router.get('/download/:filename', authenticateUser, (req, res) => {
  // ... existing download logic
});
```

## 📋 File Naming Conventions

For better organization, consider using these naming patterns:
- `innoalaxy-v1.0.0.apk` (with version)
- `innoalaxy-release-20240120.apk` (with date)
- `innoalaxy-production.apk` (environment-based)

## 🐛 Troubleshooting

### APK File Not Found
- Ensure the APK file is in the `backend/apk/` directory
- Check file permissions (file should be readable)
- Verify the filename doesn't contain special characters

### Download Page Not Loading
- Confirm the server is running on the correct port
- Check if the route is properly registered in `backend/src/index.ts`
- Verify CORS settings if accessing from different domain

### Large File Downloads
For large APK files (>50MB), consider:
- Increasing Express body size limits
- Implementing chunked downloads
- Adding progress indicators

## 🔧 Advanced Configuration

### Environment Variables
Add these to your `.env` file for customization:

```env
# APK Download Settings
APK_MAX_SIZE=100MB
APK_DOWNLOAD_PATH=/custom/apk/path
ENABLE_APK_AUTH=true
```

### Production Deployment
When deploying to production:

1. **Use HTTPS**: Ensure your server uses SSL/TLS
2. **Set Proper Headers**: Add security headers
3. **File Validation**: Implement additional file validation
4. **Rate Limiting**: Add download rate limiting
5. **Logging**: Log download activities

## 📞 Support

If you encounter any issues with the APK download system:

1. Check the server logs for error messages
2. Verify file permissions and paths
3. Test with the sample APK first
4. Ensure your APK file is valid and not corrupted

## 🎯 Quick Start Example

```bash
# 1. Navigate to backend
cd backend

# 2. Create a sample APK for testing
npm run apk
# Choose option 3 to create sample APK

# 3. Start the server
npm run dev

# 4. Open in browser
# Visit: http://localhost:5000/api/apk/page

# 5. Upload your real APK
npm run apk
# Choose option 2 to upload your APK file
```

Your APK download system is now ready! 🎉