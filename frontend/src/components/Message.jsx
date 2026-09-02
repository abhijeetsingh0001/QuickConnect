import React, { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";
import { BsCheck2, BsCheck2All } from "react-icons/bs";

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser,selectedUser} = useSelector(store=>store.user);

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);
    
    return (
        <div ref={scroll} className={`flex w-full ${message?.senderId === authUser?._id ? 'justify-end' : 'justify-start'} my-2`}>
            <div className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
                <div className="chat-image avatar">
                    <div className="w-10 h-10 rounded-full overflow-hidden shadow-sm dark:shadow-none">
                        <img alt="Tailwind CSS chat bubble component" className="w-full h-full object-cover" src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto } />
                    </div>
                </div>
                <div className="chat-header flex items-center gap-1">
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
                </div>
                <div className={`chat-bubble px-5 py-3 rounded-3xl ${message?.senderId !== authUser?._id ? 'bg-white border border-gray-200 dark:border-transparent dark:bg-gray-200 text-black shadow-sm dark:shadow-none' : 'bg-blue-600 text-white shadow-sm dark:shadow-none'} `}>{message?.message}</div>
            </div>
        </div>
    )
}

export default Message
