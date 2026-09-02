const fs = require('fs');
let code = fs.readFileSync('frontend/src/hooks/useGetRealTimeMessage.jsx', 'utf8');

code = code.replace(
  'import { setMessages, markMessagesRead } from "../redux/messageSlice";',
  'import { setMessages, markMessagesRead } from "../redux/messageSlice";\nimport axios from "axios";'
);

code = code.replace(
  'const {messages} = useSelector(store=>store.message);',
  'const {messages} = useSelector(store=>store.message);\n    const {selectedUser} = useSelector(store=>store.user);'
);

code = code.replace(
  '        socket?.on("newMessage", (newMessage)=>{\n            dispatch(setMessages([...(Array.isArray(messages) ? messages : []), newMessage]));\n        });',
  `        socket?.on("newMessage", (newMessage)=>{
            dispatch(setMessages([...(Array.isArray(messages) ? messages : []), newMessage]));
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                axios.post(\`/api/v1/message/read/\${selectedUser._id}\`).catch(err => console.log(err));
            }
        });`
);

code = code.replace(
  '},[setMessages, messages]);',
  '},[setMessages, messages, selectedUser]);'
);

fs.writeFileSync('frontend/src/hooks/useGetRealTimeMessage.jsx', code);
