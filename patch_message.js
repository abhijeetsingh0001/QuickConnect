const fs = require('fs');
let code = fs.readFileSync('frontend/src/components/Message.jsx', 'utf8');

code = code.replace(
  'import {useSelector} from "react-redux";',
  'import {useSelector} from "react-redux";\nimport { BsCheck2, BsCheck2All } from "react-icons/bs";'
);

// We need to add the ticks inside the chat bubble or below it. Let's put it next to the time or inside the bubble at the bottom right.
// Putting it next to the time is typical for WhatsApp if it's inside the bubble, but since it's a daisyui chat, the time is in chat-header.
// Usually read receipts are next to the time. Let's put it next to the time in the chat-header for the sender.

const headerReplace = `<div className="chat-header flex items-center gap-1">
                    <time className="text-xs opacity-50 text-black dark:text-white">
                        {message?.createdAt ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'}
                    </time>
                    {message?.senderId === authUser?._id && (
                        <span className="text-xs ml-1">
                            {message?.status === 'read' ? (
                                <BsCheck2All className="text-blue-500 w-4 h-4" />
                            ) : (
                                <BsCheck2All className="text-gray-400 w-4 h-4" />
                            )}
                        </span>
                    )}
                </div>`;

code = code.replace(
  /<div className="chat-header">[\s\S]*?<\/div>/,
  headerReplace
);

fs.writeFileSync('frontend/src/components/Message.jsx', code);
