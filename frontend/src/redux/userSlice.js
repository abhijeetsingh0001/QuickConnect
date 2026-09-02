import { createSlice } from "@reduxjs/toolkit"
import OtherUser from "../components/OtherUser";

const userSlice = createSlice({
  name: "user",
  initialState: {
    authUser: null,
    otherUsers: null,
    selectedUser: null,
    onlineUsers: null,
    typingUsers: [],
  },
  reducers: {
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    addTypingUser: (state, action) => {
      if (!state.typingUsers.includes(action.payload)) {
        state.typingUsers.push(action.payload);
      }
    },
    removeTypingUser: (state, action) => {
      state.typingUsers = state.typingUsers.filter(id => id !== action.payload);
    }
  }
});
export const { setAuthUser, setOtherUsers, setSelectedUser, setOnlineUsers, addTypingUser, removeTypingUser } = userSlice.actions;
export default userSlice.reducer;
