const fs = require('fs');
const css = fs.readFileSync('c:\\bhaskar\\znaine_draft\\vistario.css', 'utf8');

const regex = /(?:^|\\})[^{}]*p[^{}]*\\{([^}]*)\\}/ig;
let match;
while ((match = regex.exec(css)) !== null) {
  console.log(`Match: ${match[0]}`);
}
