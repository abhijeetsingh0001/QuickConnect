const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/OtherUser.jsx', 'utf8');

code = code.replace(
  "<div className='w-10 rounded-full'>",
  "<div className='w-10 h-10 rounded-full overflow-hidden shadow-sm dark:shadow-none'>"
);

fs.writeFileSync('frontend/src/components/OtherUser.jsx', code);
