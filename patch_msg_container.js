const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/MessageContainer.jsx', 'utf8');

code = code.replace(
  "className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'",
  "className='flex gap-2 items-center bg-gray-200 dark:bg-zinc-800 text-black dark:text-white px-4 py-2 mb-2'"
);

code = code.replace(
  "<h1 className='text-4xl text-white font-bold'>Hi, {authUser?.fullName} </h1>",
  "<h1 className='text-4xl text-black dark:text-white font-bold'>Hi, {authUser?.fullName} </h1>"
);

code = code.replace(
  "<h1 className='text-2xl text-white'>Let's start conversation</h1>",
  "<h1 className='text-2xl text-black dark:text-white'>Let's start conversation</h1>"
);

fs.writeFileSync('frontend/src/components/MessageContainer.jsx', code);
