import { Router, Request, Response } from 'express';
import path from 'path';
import fs from 'fs';

const router = Router();

// Get APK file info
router.get('/info', (req: Request, res: Response) => {
  try {
    const apkDir = path.join(__dirname, '../../apk');
    
    // Check if APK directory exists
    if (!fs.existsSync(apkDir)) {
      return res.status(404).json({
        success: false,
        message: 'APK directory not found'
      });
    }

    // Get APK files
    const files = fs.readdirSync(apkDir).filter(file => file.endsWith('.apk'));
    
    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No APK files found'
      });
    }

    // Get file info for the latest APK
    const latestApk = files[files.length - 1];
    const filePath = path.join(apkDir, latestApk);
    const stats = fs.statSync(filePath);

    res.json({
      success: true,
      data: {
        filename: latestApk,
        size: stats.size,
        modified: stats.mtime,
        downloadUrl: `/api/apk/download/${latestApk}`
      }
    });
  } catch (error) {
    console.error('Error getting APK info:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Download APK file
router.get('/download/:filename', (req: Request, res: Response) => {
  try {
    const { filename } = req.params;
    
    // Validate filename
    if (!filename.endsWith('.apk')) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file type. Only APK files are allowed.'
      });
    }

    const apkPath = path.join(__dirname, '../../apk', filename);
    
    // Check if file exists
    if (!fs.existsSync(apkPath)) {
      return res.status(404).json({
        success: false,
        message: 'APK file not found'
      });
    }

    // Set headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/vnd.android.package-archive');
    
    // Stream the file
    const fileStream = fs.createReadStream(apkPath);
    fileStream.pipe(res);
    
    fileStream.on('error', (error) => {
      console.error('Error streaming file:', error);
      if (!res.headersSent) {
        res.status(500).json({
          success: false,
          message: 'Error downloading file'
        });
      }
    });

  } catch (error) {
    console.error('Error downloading APK:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get download page
router.get('/page', (req: Request, res: Response) => {
  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Innoalaxy APK Download</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
        }
        
        .container {
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 100%;
        }
        
        .logo {
            width: 100px;
            height: 100px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 36px;
            font-weight: bold;
        }
        
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 28px;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 16px;
        }
        
        .download-btn {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-size: 18px;
            font-weight: 600;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
            margin-bottom: 20px;
            display: inline-block;
            text-decoration: none;
        }
        
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba(102, 126, 234, 0.3);
        }
        
        .file-info {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin-top: 20px;
            text-align: left;
        }
        
        .file-info h3 {
            margin-bottom: 10px;
            color: #333;
        }
        
        .file-info p {
            margin: 5px 0;
            color: #666;
        }
        
        .loading {
            display: none;
        }
        
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #667eea;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
            margin: 20px auto;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="logo">IA</div>
        <h1>Innoalaxy</h1>
        <p class="subtitle">Download the latest version of our Android app</p>
        
        <div id="loading" class="loading">
            <div class="spinner"></div>
            <p>Loading APK information...</p>
        </div>
        
        <div id="content">
            <a href="#" id="downloadBtn" class="download-btn">
                📱 Download APK
            </a>
            <div id="fileInfo" class="file-info">
                <h3>App Information</h3>
                <p><strong>Size:</strong> <span id="fileSize">Loading...</span></p>
                <p><strong>Version:</strong> <span id="fileName">Loading...</span></p>
                <p><strong>Last Updated:</strong> <span id="fileDate">Loading...</span></p>
            </div>
        </div>
    </div>

    <script>
        async function loadAPKInfo() {
            try {
                document.getElementById('loading').style.display = 'block';
                document.getElementById('content').style.display = 'none';
                
                const response = await fetch('/api/apk/info');
                const data = await response.json();
                
                if (data.success) {
                    const downloadBtn = document.getElementById('downloadBtn');
                    downloadBtn.href = data.data.downloadUrl;
                    
                    document.getElementById('fileName').textContent = data.data.filename;
                    document.getElementById('fileSize').textContent = formatFileSize(data.data.size);
                    document.getElementById('fileDate').textContent = new Date(data.data.modified).toLocaleDateString();
                    
                    document.getElementById('loading').style.display = 'none';
                    document.getElementById('content').style.display = 'block';
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                document.getElementById('loading').innerHTML = 
                    '<p style="color: red;">Error loading APK information: ' + error.message + '</p>';
            }
        }
        
        function formatFileSize(bytes) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const sizes = ['Bytes', 'KB', 'MB', 'GB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
        }
        
        // Load APK info when page loads
        loadAPKInfo();
        
        // Add download tracking
        document.getElementById('downloadBtn').addEventListener('click', function() {
            this.innerHTML = '⬇️ Downloading...';
            setTimeout(() => {
                this.innerHTML = '📱 Download APK';
            }, 3000);
        });
    </script>
</body>
</html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  res.send(htmlContent);
});

export default router;