const fs = require('fs');
let code = fs.readFileSync('frontend/tailwind.config.js', 'utf8');

code = code.replace(
  'module.exports = {',
  "module.exports = {\n  darkMode: 'class',"
);

fs.writeFileSync('frontend/tailwind.config.js', code);
