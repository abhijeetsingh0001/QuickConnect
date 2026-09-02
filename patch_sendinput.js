const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/SendInput.jsx', 'utf8');

code = code.replace(
  "className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'",
  "className='border text-sm rounded-lg block w-full p-3 border-gray-300 dark:border-zinc-500 bg-gray-100 dark:bg-gray-600 text-black dark:text-white'"
);

code = code.replace(
  "className='absolute flex inset-y-0 end-0 items-center pr-4'",
  "className='absolute flex inset-y-0 end-0 items-center pr-4 text-black dark:text-white'"
);

fs.writeFileSync('frontend/src/components/SendInput.jsx', code);
