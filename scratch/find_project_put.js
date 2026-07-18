const fs = require('fs');
const content = fs.readFileSync('C:/Users/anasr/.gemini/antigravity/scratch/edusphere/public/app.js', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('projects') && (line.includes('PUT') || line.includes('PATCH') || line.includes('update') || line.includes('edit'))) {
    console.log(`Line ${idx+1}: ${line.trim()}`);
  }
});
