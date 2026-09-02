const fs = require('fs');
let code = fs.readFileSync('frontend/src/hooks/useGetRealTimeMessage.jsx', 'utf8');

code = code.replace(
  'import { setMessages } from "../redux/messageSlice";',
  'import { setMessages, markMessagesRead } from "../redux/messageSlice";'
);

code = code.replace(
  '        socket?.on("newMessage", (newMessage)=>{\n            dispatch(setMessages([...(Array.isArray(messages) ? messages : []), newMessage]));\n        });',
  `        socket?.on("newMessage", (newMessage)=>{
            dispatch(setMessages([...(Array.isArray(messages) ? messages : []), newMessage]));
        });
        socket?.on("messagesRead", (data) => {
            dispatch(markMessagesRead(data.receiverId));
        });`
);

code = code.replace(
  '        return () => socket?.off("newMessage");',
  '        return () => {\n            socket?.off("newMessage");\n            socket?.off("messagesRead");\n        };'
);

fs.writeFileSync('frontend/src/hooks/useGetRealTimeMessage.jsx', code);
