const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/MessageContainer.jsx', 'utf8');

code = code.replace(
  "import { setSelectedUser } from '../redux/userSlice';",
  "import { setSelectedUser } from '../redux/userSlice';\nimport { setMessages } from '../redux/messageSlice';\nimport axios from 'axios';\nimport { FiTrash2 } from 'react-icons/fi';"
);

const newHeader = `
                        <div className='flex justify-between items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
                            <div className='flex gap-2 items-center'>
                                <div className={\`avatar \${isOnline ? 'online' : ''}\`}>
                                    <div className='w-12 rounded-full'>
                                        <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                    </div>
                                </div>
                                <div className='flex flex-col flex-1'>
                                    <div className='flex justify-between gap-2'>
                                        <p>{selectedUser?.fullName}</p>
                                    </div>
                                    {isTyping && (
                                        <p className='text-green-400 text-xs italic transition-opacity duration-300'>User is typing...</p>
                                    )}
                                </div>
                            </div>
                            <button onClick={clearChatHandler} className='btn btn-ghost btn-circle text-red-500 hover:bg-red-500 hover:text-white transition-colors' title="Clear Chat">
                                <FiTrash2 size={20} />
                            </button>
                        </div>
`;

code = code.replace(
  /<div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/,
  newHeader
);

const handlerCode = `
    const isTyping = typingUsers?.includes(selectedUser?._id);

    const clearChatHandler = async () => {
        if (window.confirm('Are you sure you want to clear this chat history?')) {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.delete(\`/api/v1/message/clear/\${selectedUser._id}\`);
                if (res.data) {
                    dispatch(setMessages([]));
                }
            } catch (error) {
                console.log(error);
            }
        }
    };
`;

code = code.replace(
  "const isTyping = typingUsers?.includes(selectedUser?._id);",
  handlerCode
);

fs.writeFileSync('frontend/src/components/MessageContainer.jsx', code);
