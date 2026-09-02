const fs = require('fs');
let code = fs.readFileSync('frontend/src/index.css', 'utf8');

code = code.replace(
  'html.dark body {',
  `  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

html.dark body {`
);

code = code.replace(
  "  background-repeat: no-repeat;\n  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',\n    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',\n    sans-serif;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}",
  "  background-repeat: no-repeat;\n}"
);

fs.writeFileSync('frontend/src/index.css', code);
