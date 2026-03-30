const https = require('https');
const fs = require('fs');

https.get('https://cdn.prod.website-files.com/68b824698be8e7c047a5da51/css/vistario.webflow.shared.054dc51c7.css', (res) => {
  let cssData = '';
  res.on('data', (c) => { cssData += c; });
  res.on('end', () => {
    fs.writeFileSync('c:\\bhaskar\\znaine_draft\\vistario.css', cssData);
  });
});
