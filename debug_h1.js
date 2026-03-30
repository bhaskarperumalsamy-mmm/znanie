const fs = require('fs');
const css = fs.readFileSync('c:\\bhaskar\\znaine_draft\\vistario.css', 'utf8');

const query = 'h1';
const regex = new RegExp(`(?:^|\\})[^{}]*${query}[^{}]*\\{([^}]*)\\}`, 'ig');
let match;
while ((match = regex.exec(css)) !== null) {
  console.log(`Match: ${match[0]}`);
}
