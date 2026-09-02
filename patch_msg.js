const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/Message.jsx', 'utf8');

code = code.replace(
  'className="text-xs opacity-50 text-white"',
  'className="text-xs opacity-50 text-black dark:text-white"'
);

fs.writeFileSync('frontend/src/components/Message.jsx', code);
