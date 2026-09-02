const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/OtherUser.jsx', 'utf8');

code = code.replace(
  "className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black' : 'text-white'} flex gap-2 hover:text-black items-center hover:bg-zinc-200 rounded p-2 cursor-pointer`}",
  "className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 dark:bg-zinc-200 text-black dark:text-black' : 'text-black dark:text-white'} flex gap-2 hover:text-black items-center hover:bg-gray-200 dark:hover:bg-zinc-200 rounded p-2 cursor-pointer`}"
);

fs.writeFileSync('frontend/src/components/OtherUser.jsx', code);
