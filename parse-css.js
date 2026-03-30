const fs = require('fs');
const css = fs.readFileSync('c:\\bhaskar\\znaine_draft\\vistario.css', 'utf8');

const findStyle = (selector) => {
  const regex = new RegExp(`(?:^|\\})[^{}]*?(?:${selector})[^{}]*?\\{([^}]*)\\}`, 'ig');
  let match;
  while ((match = regex.exec(css)) !== null) {
      console.log(`Match for ${selector}:`, match[0].substring(0, 150) + "...");
  }
}

findStyle('h1');
findStyle('rt-text-white');
findStyle('rt-text-yellow');
