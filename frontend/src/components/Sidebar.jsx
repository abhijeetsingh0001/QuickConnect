import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { toggleTheme } from '../redux/themeSlice';
import { FiSun, FiMoon } from "react-icons/fi";

 
const Sidebar = () => {
    const [search, setSearch] = useState("");
    const {otherUsers} = useSelector(store=>store.user);
    const {mode} = useSelector(store=>store.theme);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user)=> user.fullName.toLowerCase().includes(search.toLowerCase()));
        if(conversationUser){
            dispatch(setOtherUsers([conversationUser]));
        }else{
            toast.error("User not found!");
        }
    }
    return (
        <div className='border-r border-gray-200 dark:border-slate-500 p-4 flex flex-col bg-slate-50 dark:bg-transparent'>
            <form onSubmit={searchSubmitHandler} action="" className='flex items-center gap-2'>
                <input
                    value={search}
                    onChange={(e)=>setSearch(e.target.value)}
                    className='input input-bordered rounded-xl bg-black dark:bg-white text-white dark:text-black placeholder-gray-400 dark:placeholder-gray-500 w-full h-12 text-base border-none shadow-sm' type="text"
                    placeholder='Search...'
                />
                <button type='submit' className='btn h-12 w-12 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-gray-200 text-white dark:text-black border-none shadow-sm'>
                    <BiSearchAlt2 className='w-6 h-6 outline-none'/>
                </button>
            </form>
            <div className="divider px-3"></div> 
            <OtherUsers/> 
            
            <div className='mt-2 flex items-center justify-between'>
                <button onClick={logoutHandler} className='btn btn-sm bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-800 dark:hover:bg-slate-100 border-none rounded-full px-8 shadow-sm hover:shadow-md transition-all duration-300 ease-out transform hover:-translate-y-0.5 font-medium tracking-wide'>Logout</button>
                <button onClick={() => dispatch(toggleTheme())} className="btn btn-sm btn-circle btn-ghost text-black dark:text-white">
                    {mode === 'dark' ? <FiSun size={20} /> : <FiMoon size={20} />}
                </button>
            </div>
        </div>

    )
}

export default Sidebar