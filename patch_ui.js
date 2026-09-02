const fs = require('fs');

// 1. HomePage
let hpCode = fs.readFileSync('frontend/src/components/HomePage.jsx', 'utf8');
hpCode = hpCode.replace(
  "className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-white/30 dark:bg-gray-400 dark:bg-opacity-0 bg-clip-padding backdrop-filter backdrop-blur-lg'",
  "className='flex sm:h-[450px] md:h-[550px] rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 dark:border-none dark:shadow-none dark:bg-gray-400 dark:bg-opacity-0 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-lg'"
);
fs.writeFileSync('frontend/src/components/HomePage.jsx', hpCode);

// 2. Sidebar
let sidebarCode = fs.readFileSync('frontend/src/components/Sidebar.jsx', 'utf8');
sidebarCode = sidebarCode.replace(
  "className='border-r border-slate-500 p-4 flex flex-col'",
  "className='border-r border-gray-200 dark:border-slate-500 p-4 flex flex-col bg-slate-50 dark:bg-transparent'"
);
fs.writeFileSync('frontend/src/components/Sidebar.jsx', sidebarCode);

// 3. OtherUser
let otherUserCode = fs.readFileSync('frontend/src/components/OtherUser.jsx', 'utf8');
otherUserCode = otherUserCode.replace(
  "className={` ${selectedUser?._id === user?._id ? 'bg-zinc-200 dark:bg-zinc-200 text-black dark:text-black' : 'text-black dark:text-white'} flex gap-2 hover:text-black items-center hover:bg-gray-200 dark:hover:bg-zinc-200 rounded p-2 cursor-pointer`}",
  "className={` ${selectedUser?._id === user?._id ? 'bg-blue-100 dark:bg-zinc-200 text-black dark:text-black' : 'text-black dark:text-white'} flex gap-2 hover:text-black items-center hover:bg-slate-100 dark:hover:bg-zinc-200 rounded-xl p-2 cursor-pointer transition-colors duration-200`}"
);
otherUserCode = otherUserCode.replace(
  "<div className='w-12 rounded-full'>",
  "<div className='w-12 h-12 rounded-full overflow-hidden'>"
);
otherUserCode = otherUserCode.replace(
  '<img src={user?.profilePhoto} alt="user-profile" />',
  '<img src={user?.profilePhoto} alt="user-profile" className="w-full h-full object-cover" />'
);
fs.writeFileSync('frontend/src/components/OtherUser.jsx', otherUserCode);

// 4. MessageContainer
let msgContainerCode = fs.readFileSync('frontend/src/components/MessageContainer.jsx', 'utf8');
msgContainerCode = msgContainerCode.replace(
  "className='flex gap-2 items-center bg-gray-200 dark:bg-zinc-800 text-black dark:text-white px-4 py-2 mb-2'",
  "className='flex gap-2 items-center bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-transparent text-black dark:text-white px-4 py-3 mb-2 shadow-sm dark:shadow-none'"
);
msgContainerCode = msgContainerCode.replace(
  "<div className='w-12 rounded-full'>",
  "<div className='w-12 h-12 rounded-full overflow-hidden'>"
);
msgContainerCode = msgContainerCode.replace(
  '<img src={selectedUser?.profilePhoto} alt="user-profile" />',
  '<img src={selectedUser?.profilePhoto} alt="user-profile" className="w-full h-full object-cover" />'
);
msgContainerCode = msgContainerCode.replace(
  "<div className='w-24 rounded-full border-4 border-zinc-700'>",
  "<div className='w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-zinc-700 shadow-lg dark:shadow-none'>"
);
msgContainerCode = msgContainerCode.replace(
  '<img src={authUser?.profilePhoto} alt="user-profile" />',
  '<img src={authUser?.profilePhoto} alt="user-profile" className="w-full h-full object-cover" />'
);
fs.writeFileSync('frontend/src/components/MessageContainer.jsx', msgContainerCode);

// 5. Message
let msgCode = fs.readFileSync('frontend/src/components/Message.jsx', 'utf8');
msgCode = msgCode.replace(
  "className={`chat-bubble px-5 py-3 rounded-3xl ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : 'bg-blue-600 text-white'} `}",
  "className={`chat-bubble px-5 py-3 rounded-3xl ${message?.senderId !== authUser?._id ? 'bg-white border border-gray-200 dark:border-transparent dark:bg-gray-200 text-black shadow-sm dark:shadow-none' : 'bg-blue-600 text-white shadow-sm dark:shadow-none'} `}"
);
msgCode = msgCode.replace(
  '<div className="w-10 rounded-full">',
  '<div className="w-10 h-10 rounded-full overflow-hidden shadow-sm dark:shadow-none">'
);
msgCode = msgCode.replace(
  '<img alt="Tailwind CSS chat bubble component" src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto } />',
  '<img alt="Tailwind CSS chat bubble component" className="w-full h-full object-cover" src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto } />'
);
fs.writeFileSync('frontend/src/components/Message.jsx', msgCode);

// 6. SendInput
let sendInputCode = fs.readFileSync('frontend/src/components/SendInput.jsx', 'utf8');
sendInputCode = sendInputCode.replace(
  "className='border text-sm rounded-lg block w-full p-3 border-gray-300 dark:border-zinc-500 bg-gray-100 dark:bg-gray-600 text-black dark:text-white'",
  "className='border text-sm rounded-full block w-full p-3 pl-5 border-gray-200 dark:border-zinc-500 bg-white dark:bg-gray-600 text-black dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-transparent transition-all'"
);
sendInputCode = sendInputCode.replace(
  "className='absolute flex inset-y-0 end-0 items-center pr-4 text-black dark:text-white'",
  "className='absolute flex inset-y-0 end-0 items-center pr-5 text-black dark:text-white'"
);
fs.writeFileSync('frontend/src/components/SendInput.jsx', sendInputCode);

