const fs = require('fs');
const content = fs.readFileSync('c:/bhaskar/znaine_nextjs/3001.html', 'utf8');
const idx = content.indexOf('alt="India"');
if (idx === -1) {
  console.log("India not found");
} else {
  const start = Math.max(0, content.lastIndexOf('<section', idx));
  const end = content.indexOf('</section>', idx) + 10;
  fs.writeFileSync('c:/bhaskar/znaine_draft/extracted-globe.txt', content.substring(start, end).replace(/></g, '>\n<'));
}
