const fs = require('fs');
const content = fs.readFileSync('C:/Users/anasr/.gemini/antigravity/scratch/edusphere/public/app.js', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('setup3DTiltEffect') || line.includes('Tilt') || line.includes('perspective')) {
    console.log(`Line ${idx+1}: ${line.trim()}`);
  }
});
