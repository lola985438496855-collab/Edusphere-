const fs = require('fs');
const content = fs.readFileSync('C:/Users/anasr/.gemini/antigravity/scratch/edusphere/server.js', 'utf8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('projects/') || line.includes('/projects/:id') || line.includes('checklist')) {
    console.log(`Line ${idx+1}: ${line.trim()}`);
  }
});
