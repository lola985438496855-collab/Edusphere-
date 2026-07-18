const fs = require('fs');

const content = fs.readFileSync('C:/Users/anasr/.gemini/antigravity/scratch/edusphere/public/style.css', 'utf8');
const lines = content.split('\n');

const search_terms = [/\.glass-panel/, /\.card-tilt/, /animation:/, /@keyframes/];
search_terms.forEach(term => {
    console.log(`--- Search for: ${term} ---`);
    let count = 0;
    lines.forEach((line, idx) => {
        if (term.test(line)) {
            console.log(`Line ${idx+1}: ${line.trim()}`);
            count++;
            if (count >= 15) {
                console.log('... (truncated)');
                // break in forEach can be emulated by returning or just letting it continue
            }
        }
    });
});
