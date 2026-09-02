import React, { useEffect } from 'react'
import SendInput from './SendInput'
import Messages from './Messages';
import { useSelector,useDispatch } from "react-redux";
import { setSelectedUser } from '../redux/userSlice';

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers, typingUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const isOnline = onlineUsers?.includes(selectedUser?._id);
    const lastActiveText = isOnline ? "Online" : selectedUser?.lastActive ? `Last active: ${new Date(selectedUser.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "Offline";

    
    const isTyping = typingUsers?.includes(selectedUser?._id);
   
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col'>
                        <div className='flex gap-2 items-center bg-white dark:bg-zinc-800 border-b border-gray-200 dark:border-transparent text-black dark:text-white px-4 py-3 mb-2 shadow-sm dark:shadow-none'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 h-12 rounded-full overflow-hidden'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <div className='flex justify-between gap-2'>
                                    <p>{selectedUser?.fullName}</p>
                                </div>
                                {isTyping ? (
                                    <p className='text-green-400 text-xs italic transition-opacity duration-300'>User is typing...</p>
                                ) : (
                                    <p className='text-xs text-gray-500 dark:text-gray-400'>{lastActiveText}</p>
                                )}
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center gap-4'>
                        <div className={`avatar ${onlineUsers?.includes(authUser?._id) ? 'online' : ''}`}>
                            <div className='w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-zinc-700 shadow-lg dark:shadow-none'>
                                <img src={authUser?.profilePhoto} alt="user-profile" className="w-full h-full object-cover" />
                            </div>
                        </div>
                        <h1 className='text-4xl text-black dark:text-white font-bold'>Hi, {authUser?.fullName} </h1>
                        <h1 className='text-2xl text-black dark:text-white'>Let's start conversation</h1>
                    </div>
                )
            }
        </>

    )
}

export default MessageContainer