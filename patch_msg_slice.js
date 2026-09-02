const fs = require('fs');
let code = fs.readFileSync('frontend/src/redux/messageSlice.js', 'utf8');

code = code.replace(
  '        setMessages:(state,action)=>{\n            state.messages = action.payload;\n        }',
  `        setMessages:(state,action)=>{
            state.messages = action.payload;
        },
        markMessagesRead:(state,action)=>{
            if(state.messages) {
                state.messages = state.messages.map(msg => {
                    if (msg.receiverId === action.payload) {
                        return { ...msg, status: 'read' };
                    }
                    return msg;
                });
            }
        }`
);

code = code.replace(
  'export const {setMessages} = messageSlice.actions;',
  'export const {setMessages, markMessagesRead} = messageSlice.actions;'
);

fs.writeFileSync('frontend/src/redux/messageSlice.js', code);
