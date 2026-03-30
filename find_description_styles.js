const fs = require('fs');
const css = fs.readFileSync('c:\\bhaskar\\znaine_draft\\vistario.css', 'utf8');

const regex = /\.rt-hero-three-description\s*\{([^}]*)\}/i;
const match = css.match(regex);
console.log('rt-hero-three-description:', match ? match[1] : 'Not found');

// Let's also look for any style block that contains the font-size of the description.
// In output.txt, the description was:
// <p data-w-id="9f0961f7-757b-11b3-1572-ccdc4ce820e0" style="opacity:0;filter:blur(5px)" class="rt-text-white">Start your learning path...
// So it might only rely on global p styles.
