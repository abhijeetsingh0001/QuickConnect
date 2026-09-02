const fs = require('fs');
let code = fs.readFileSync('frontend/src/index.css', 'utf8');

code = code.replace(
  "body {\n  background-image: url('/public/bg.avif');",
  "body {\n  background-color: #f3f4f6;\n}\nhtml.dark body {\n  background-color: transparent;\n  background-image: url('/public/bg.avif');"
);

fs.writeFileSync('frontend/src/index.css', code);
