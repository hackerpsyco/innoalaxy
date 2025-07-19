#!/usr/bin/env node

const os = require('os');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Skip over non-IPv4 and internal addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  
  return 'localhost';
}

const ip = getLocalIP();

console.log('\n🌐 Network Configuration for Mobile Development');
console.log('================================================');
console.log(`Your IP Address: ${ip}`);
console.log(`Backend URL: http://${ip}:5000`);
console.log(`Frontend URL: http://${ip}:8081`);
console.log('\n📱 Mobile Testing Instructions:');
console.log('1. Update utils/config.ts with your IP address');
console.log('2. Make sure your phone is on the same WiFi network');
console.log('3. Start the backend server: cd backend && npm run dev');
console.log('4. Start the mobile app: npm run dev');
console.log('\n💡 Tip: If you change networks, run this script again to get the new IP');
console.log('================================================\n');