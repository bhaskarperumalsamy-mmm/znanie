const fs = require('fs');
const path = require('path');

const root = __dirname;

// Directories to delete
const dirs = [
  'src/app/home-one',
  'src/app/about-two',
];

// Files to delete
const files = [
  'src/app/about-us/about.module.css.recovered',
  'about-temp.html',
  'about-two.html',
  'debug_h1.js',
  'debug_p.js',
  'extract-vars.js',
  'extract.js',
  'extracted-globe.txt',
  'extracted-section.txt',
  'find_all_vars.js',
  'find_amber.js',
  'find_description_styles.js',
  'get-css.js',
  'get-html.js',
  'get-styles.js',
  'h1_styles.txt',
  'hero3.html',
  'home3.html',
  'output.txt',
  'p_styles.txt',
  'parse-css.js',
  'parsed-output.txt',
  'vars.txt',
  'vistario.css',
  'vistario.html',
  'TODO.md',
];

// Delete directories
for (const dir of dirs) {
  const full = path.join(root, dir);
  if (fs.existsSync(full)) {
    fs.rmSync(full, { recursive: true, force: true });
    console.log('Deleted dir:', dir);
  } else {
    console.log('Not found:', dir);
  }
}

// Delete files
for (const file of files) {
  const full = path.join(root, file);
  if (fs.existsSync(full)) {
    fs.unlinkSync(full);
    console.log('Deleted file:', file);
  } else {
    console.log('Not found:', file);
  }
}

console.log('\\nCleanup complete!');
