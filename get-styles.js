const https = require('https');

https.get('https://vistario.webflow.io/home-three', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // get main css file URL
    const cssMatch = data.match(/<link[^>]+href="([^"]+webflow\.css)"/i);
    if (!cssMatch) {
      console.log('No CSS found');
      return;
    }
    const cssUrl = cssMatch[1];
    console.log('CSS URL:', cssUrl);
    
    // Find heading classes in HTML. The heading text is something like "Grow your skills build your future"
    const headingMatch = data.match(/<h1[^>]*class="([^"]+)"[^>]*>(.*?)<\/h1>/i);
    console.log('Heading Classes:', headingMatch ? headingMatch[1] : 'Not found');
    
    if (headingMatch && cssUrl) {
      https.get(cssUrl, (res2) => {
        let cssData = '';
        res2.on('data', (c) => { cssData += c; });
        res2.on('end', () => {
          const classes = headingMatch[1].split(' ');
          classes.forEach(c => {
            const regex = new RegExp(`\\.${c}\\s*{([^}]+)}`, 'g');
            let match;
            while ((match = regex.exec(cssData)) !== null) {
              console.log(`CSS for .${c}:`, match[1].trim());
            }
          });
          
          // Let's also find styles for any span inside the h1
          const spanMatch = headingMatch[2].match(/<span[^>]*class="([^"]+)"/i);
          if (spanMatch) {
            console.log('Span Classes inside H1:', spanMatch[1]);
            const spanClasses = spanMatch[1].split(' ');
            spanClasses.forEach(c => {
              const regex = new RegExp(`\\.${c}\\s*{([^}]+)}`, 'g');
              let match;
              while ((match = regex.exec(cssData)) !== null) {
                console.log(`CSS for .${c}:`, match[1].trim());
              }
            });
          }

          // Descriptions p classes
          const pMatch = data.match(/<p[^>]*class="([^"]+)"[^>]*>Start your learning path/i);
          if (pMatch) {
            console.log('P Classes:', pMatch[1]);
            const pClasses = pMatch[1].split(' ');
            pClasses.forEach(c => {
              const regex = new RegExp(`\\.${c}\\s*{([^}]+)}`, 'g');
              let match;
              while ((match = regex.exec(cssData)) !== null) {
                console.log(`CSS for .${c}:`, match[1].trim());
              }
            });
          }
        });
      });
    }
  });
});
