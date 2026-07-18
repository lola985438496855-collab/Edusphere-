const fs = require('fs');
const content = fs.readFileSync('C:/Users/anasr/.gemini/antigravity/scratch/edusphere/public/app.js', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('notif') || line.includes('alliance')) {
    console.log(`Line ${idx+1}: ${line.trim()}`);
  }
});
