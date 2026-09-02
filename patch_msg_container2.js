const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/MessageContainer.jsx', 'utf8');

const regex = /<div className='flex gap-2 items-center bg-white dark:bg-zinc-800[\s\S]*?<Messages \/>/m;

const replacement = `<div className='flex gap-2 items-center bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-transparent text-black dark:text-white px-4 py-3 mb-2 shadow-sm dark:shadow-none'>
                            <div className={\`avatar \${isOnline ? 'online' : ''}\`}>
                                <div className='w-12 h-12 rounded-full overflow-hidden'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                                {isTyping ? (
                                    <p className='text-green-400 text-xs italic transition-opacity duration-300'>User is typing...</p>
                                ) : (
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>{lastActiveText}</p>
                                )}
                            </div>
                        </div>
                        <Messages />`;

code = code.replace(regex, replacement);
fs.writeFileSync('frontend/src/components/MessageContainer.jsx', code);
