// Responsive testing script for modern devices
const devices = [
  { name: 'iPhone 17', width: 390, height: 844 },
  { name: 'iPhone 17 Pro', width: 402, height: 874 },
  { name: 'iPhone 17 Pro Max', width: 428, height: 926 },
  { name: 'Galaxy S25', width: 360, height: 800 },
  { name: 'Galaxy S25+', width: 412, height: 915 },
  { name: 'Pixel 10', width: 412, height: 892 },
  { name: 'iPad Pro 11" M4', width: 834, height: 1194 },
  { name: 'iPad Pro 13" M4', width: 1024, height: 1366 }
];

const pages = ['/', '/realty', '/virtual-staging', '/pricing'];

console.log('Responsive Testing Matrix');
console.log('========================');

devices.forEach(device => {
  console.log(`\n${device.name} (${device.width}x${device.height})`);
  pages.forEach(page => {
    console.log(`  - ${page}: Testing needed`);
  });
});
