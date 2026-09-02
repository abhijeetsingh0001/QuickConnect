import React, {useState, useRef, useEffect } from 'react' 
import { IoSend } from "react-icons/io5";
import axios from "axios";
import {useDispatch,useSelector} from "react-redux";
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
    const [message, setMessage] = useState("");
    const dispatch = useDispatch();
    const {selectedUser} = useSelector(store=>store.user);
    const {messages} = useSelector(store=>store.message);
    const {socket} = useSelector(store=>store.socket);
    const typingTimeoutRef = useRef(null);

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/message/send/${selectedUser?._id}`, {message}, {
                headers:{
                    'Content-Type':'application/json'
                },
                withCredentials:true
            });
            dispatch(setMessages([...(Array.isArray(messages) ? messages : []), res?.data?.newMessage]))
        } catch (error) {
            console.log(error);
        } 
        setMessage("");
        if (socket && selectedUser) {
            socket.emit("stopTyping", selectedUser._id);
        }
    }

    const onChangeHandler = (e) => {
        setMessage(e.target.value);
        if (socket && selectedUser) {
            socket.emit("typing", selectedUser._id);
            
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
            typingTimeoutRef.current = setTimeout(() => {
                socket.emit("stopTyping", selectedUser._id);
            }, 2000);
        }
    };

    useEffect(() => {
        return () => {
            if (typingTimeoutRef.current) {
                clearTimeout(typingTimeoutRef.current);
            }
        };
    }, []);

  return (
     <form onSubmit={onSubmitHandler} className='px-4 my-3'>
            <div className='w-full relative'>
                <input
                    value={message}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder='Send a message...'
                    className='border text-sm rounded-full block w-full p-3 pl-5 border-gray-200 dark:border-zinc-500 bg-white dark:bg-gray-600 text-black dark:text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-transparent transition-all'
                />
                <button type="submit" className='absolute flex inset-y-0 end-0 items-center pr-5 text-black dark:text-white'>
                    <IoSend />
                </button>
            </div>
        </form>
  )
}

export default SendInput
