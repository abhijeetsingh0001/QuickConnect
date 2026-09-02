const fs = require('fs');

// Patch OtherUser.jsx
let otherUserCode = fs.readFileSync('frontend/src/components/OtherUser.jsx', 'utf8');

const lastActiveLogicOther = `  const isOnline = onlineUsers?.includes(user._id);
  const lastActiveText = isOnline ? "Online" : user.lastActive ? \`Last active: \${new Date(user.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\` : "Offline";
`;

otherUserCode = otherUserCode.replace(
  '  const isOnline = onlineUsers?.includes(user._id);',
  lastActiveLogicOther
);

const otherUserJSX = `        <div className='flex flex-col flex-1'>
          <div className='flex justify-between gap-2 '>
            <p>{user?.fullName}</p>
          </div>
          <p className='text-xs text-gray-500 dark:text-gray-400'>{lastActiveText}</p>
        </div>`;

otherUserCode = otherUserCode.replace(
  /<div className='flex flex-col flex-1'>[\s\S]*?<\/div>/,
  otherUserJSX
);

fs.writeFileSync('frontend/src/components/OtherUser.jsx', otherUserCode);

// Patch MessageContainer.jsx
let msgContainerCode = fs.readFileSync('frontend/src/components/MessageContainer.jsx', 'utf8');

const lastActiveLogicMsg = `    const isOnline = onlineUsers?.includes(selectedUser?._id);
    const lastActiveText = isOnline ? "Online" : selectedUser?.lastActive ? \`Last active: \${new Date(selectedUser.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\` : "Offline";
`;

msgContainerCode = msgContainerCode.replace(
  '    const isOnline = onlineUsers?.includes(selectedUser?._id);',
  lastActiveLogicMsg
);

const msgContainerJSX = `                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                                {isTyping ? (
                                    <p className='text-green-400 text-xs italic transition-opacity duration-300'>User is typing...</p>
                                ) : (
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>{lastActiveText}</p>
                                )}
                            </div>`;

msgContainerCode = msgContainerCode.replace(
  /<div className='flex flex-col flex-1'>[\s\S]*?<\/div>/,
  msgContainerJSX
);

fs.writeFileSync('frontend/src/components/MessageContainer.jsx', msgContainerCode);

