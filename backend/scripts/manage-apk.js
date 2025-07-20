#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const APK_DIR = path.join(__dirname, '../apk');

// Ensure APK directory exists
if (!fs.existsSync(APK_DIR)) {
  fs.mkdirSync(APK_DIR, { recursive: true });
  console.log('✅ Created APK directory:', APK_DIR);
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function listAPKFiles() {
  console.log('\n📱 APK Files in directory:');
  console.log('='.repeat(50));
  
  try {
    const files = fs.readdirSync(APK_DIR).filter(file => file.endsWith('.apk'));
    
    if (files.length === 0) {
      console.log('No APK files found.');
      return;
    }
    
    files.forEach((file, index) => {
      const filePath = path.join(APK_DIR, file);
      const stats = fs.statSync(filePath);
      const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
      
      console.log(`${index + 1}. ${file}`);
      console.log(`   Size: ${sizeMB} MB`);
      console.log(`   Modified: ${stats.mtime.toLocaleDateString()}`);
      console.log('');
    });
  } catch (error) {
    console.error('Error listing files:', error.message);
  }
}

function copyAPKFile() {
  rl.question('\n📂 Enter the path to your APK file: ', (sourcePath) => {
    if (!fs.existsSync(sourcePath)) {
      console.log('❌ File not found:', sourcePath);
      showMenu();
      return;
    }
    
    if (!sourcePath.endsWith('.apk')) {
      console.log('❌ Invalid file type. Only APK files are allowed.');
      showMenu();
      return;
    }
    
    const fileName = path.basename(sourcePath);
    const destPath = path.join(APK_DIR, fileName);
    
    try {
      fs.copyFileSync(sourcePath, destPath);
      console.log('✅ APK file copied successfully!');
      console.log('📁 Destination:', destPath);
      console.log('🌐 Download URL: http://localhost:5000/api/apk/page');
    } catch (error) {
      console.log('❌ Error copying file:', error.message);
    }
    
    showMenu();
  });
}

function createSampleAPK() {
  const sampleFileName = 'innoalaxy-sample.apk';
  const samplePath = path.join(APK_DIR, sampleFileName);
  
  // Create a dummy APK file for demonstration
  const sampleContent = `
# Sample APK File for Innoalaxy
# This is a demonstration file
# Replace this with your actual APK file

Created: ${new Date().toISOString()}
Version: 1.0.0 (Sample)
App: Innoalaxy Mobile Application

Note: This is not a real APK file. 
Please upload your actual APK file using option 2 in the menu.
`.trim();

  try {
    fs.writeFileSync(samplePath, sampleContent);
    console.log('✅ Sample APK file created:', sampleFileName);
    console.log('🌐 You can now test the download at: http://localhost:5000/api/apk/page');
  } catch (error) {
    console.log('❌ Error creating sample file:', error.message);
  }
  
  showMenu();
}

function deleteAPKFile() {
  listAPKFiles();
  
  rl.question('\n🗑️  Enter the filename to delete: ', (filename) => {
    const filePath = path.join(APK_DIR, filename);
    
    if (!fs.existsSync(filePath)) {
      console.log('❌ File not found:', filename);
      showMenu();
      return;
    }
    
    try {
      fs.unlinkSync(filePath);
      console.log('✅ File deleted successfully:', filename);
    } catch (error) {
      console.log('❌ Error deleting file:', error.message);
    }
    
    showMenu();
  });
}

function showMenu() {
  console.log('\n🚀 Innoalaxy APK Manager');
  console.log('='.repeat(30));
  console.log('1. List APK files');
  console.log('2. Copy APK file to server');
  console.log('3. Create sample APK (for testing)');
  console.log('4. Delete APK file');
  console.log('5. Exit');
  console.log('');
  
  rl.question('Choose an option (1-5): ', (choice) => {
    switch (choice) {
      case '1':
        listAPKFiles();
        showMenu();
        break;
      case '2':
        copyAPKFile();
        break;
      case '3':
        createSampleAPK();
        break;
      case '4':
        deleteAPKFile();
        break;
      case '5':
        console.log('👋 Goodbye!');
        rl.close();
        break;
      default:
        console.log('❌ Invalid option. Please choose 1-5.');
        showMenu();
        break;
    }
  });
}

// Start the application
console.log('🎯 APK Directory:', APK_DIR);
showMenu();