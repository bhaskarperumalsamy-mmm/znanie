const fs = require('fs');
const css = fs.readFileSync('c:\\bhaskar\\znaine_draft\\vistario.css', 'utf8');

const regex = /--_typhography---[a-z0-9-]+:\s*[^;]+;/gi;
let match;
const matches = [];
while ((match = regex.exec(css)) !== null) {
  matches.push(match[0]);
}

fs.writeFileSync('c:\\bhaskar\\znaine_draft\\vars.txt', matches.join('\n'));
