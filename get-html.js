const https = require('https');

https.get('https://vistario.webflow.io/home-three', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // get main css file URL
    const cssMatch = data.match(/<link[^>]+href="([^"]+\.css(\?[^"]*)?)"/g);
    if (!cssMatch) {
      console.log('No CSS found');
    } else {
      console.log('CSS Links:', cssMatch);
    }
    
    // Find heading classes in HTML. The heading text is something like "Grow your skills build your future"
    const headingMatch = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
    console.log('H1 content and HTML:', headingMatch ? headingMatch[0] : 'Not found');
    
    const pMatch = data.match(/<p[^>]*>Start your learning path[\s\S]*?<\/p>/i);
    console.log('P content and HTML:', pMatch ? pMatch[0] : 'Not found');
  });
});
