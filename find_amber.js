const fs = require('fs');
const css = fs.readFileSync('c:\\bhaskar\\znaine_draft\\vistario.css', 'utf8');

const lines = css.split('\n');
lines.forEach(line => {
  if (line.includes('--_color---golden-amber')) {
    console.log(line.trim());
  }
});
