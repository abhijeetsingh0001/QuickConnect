const fs = require('fs');
let code = fs.readFileSync('frontend/src/hooks/useGetMessages.jsx', 'utf8');

code = code.replace(
  'dispatch(setMessages(res.data))',
  `dispatch(setMessages(res.data));
                // Mark messages as read
                if (res.data.length > 0) {
                    axios.post(\`/api/v1/message/read/\${selectedUser?._id}\`).catch(err => console.log(err));
                }`
);

fs.writeFileSync('frontend/src/hooks/useGetMessages.jsx', code);
