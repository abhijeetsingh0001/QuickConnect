import { useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { setMessages, markMessagesRead } from "../redux/messageSlice";
import axios from "axios";

const useGetRealTimeMessage = () => {
    const {socket} = useSelector(store=>store.socket);
    const {messages} = useSelector(store=>store.message);
    const {selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(()=>{
        socket?.on("newMessage", (newMessage)=>{
            dispatch(setMessages([...(Array.isArray(messages) ? messages : []), newMessage]));
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                axios.post(`/api/v1/message/read/${selectedUser._id}`).catch(err => console.log(err));
            }
        });
        socket?.on("messagesRead", (data) => {
            dispatch(markMessagesRead(data.receiverId));
        });
        return () => {
            socket?.off("newMessage");
            socket?.off("messagesRead");
        };
    },[setMessages, messages, selectedUser]);
};
export default useGetRealTimeMessage;