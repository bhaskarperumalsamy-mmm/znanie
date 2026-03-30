const fs = require('fs');
const css = fs.readFileSync('c:\\bhaskar\\znaine_draft\\vistario.css', 'utf8');

const regex = /--[a-z0-9-]+:\s*[^;]+;/gi;
let match;
const vars = new Set();
while ((match = regex.exec(css)) !== null) {
  vars.add(match[0]);
}

console.log(Array.from(vars).slice(0, 50).join('\n'));
