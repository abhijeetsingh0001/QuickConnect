const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/HomePage.jsx', 'utf8');

code = code.replace(
  "className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0 '",
  "className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white/30 dark:bg-gray-400 dark:bg-opacity-0 bg-clip-padding backdrop-filter backdrop-blur-lg'"
);

fs.writeFileSync('frontend/src/components/HomePage.jsx', code);
