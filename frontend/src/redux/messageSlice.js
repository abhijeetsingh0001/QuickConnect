import {createSlice} from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name:"message",
    initialState:{
        messages:null,
    },
    reducers:{
        setMessages:(state,action)=>{
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
        }
    }
});
export const {setMessages, markMessagesRead} = messageSlice.actions;
export default messageSlice.reducer;