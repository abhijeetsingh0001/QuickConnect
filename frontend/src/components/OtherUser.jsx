import React from 'react'
import { useDispatch,useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';


const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const {selectedUser,onlineUsers} = useSelector(store => store.user);
  const isOnline = onlineUsers?.includes(user._id);
  const lastActiveText = isOnline ? "Online" : user.lastActive ? `Last active: ${new Date(user.lastActive).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}` : "Offline";


  const selectedUserHandler = () => {
    dispatch(setSelectedUser(user));

  }


  return (
    <>
      <div onClick={() => selectedUserHandler(user)} className={` ${selectedUser?._id === user?._id ? 'bg-blue-100 dark:bg-zinc-200 text-black dark:text-black' : 'text-black dark:text-white'} flex gap-2 hover:text-black items-center hover:bg-slate-100 dark:hover:bg-zinc-200 rounded-xl p-2 cursor-pointer transition-colors duration-200`}>
        <div className='relative'>
          <div className='avatar'>
            <div className='w-10 h-10 rounded-full overflow-hidden shadow-sm dark:shadow-none'>
              <img src={user?.profilePhoto} alt="user-profile" className="w-full h-full object-cover" />
            </div>
          </div>
          <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-800 ${isOnline ? 'bg-green-500' : 'bg-gray-400'}`}></span>
        </div>
                <div className='flex flex-col flex-1'>
          <div className='flex justify-between gap-2 '>
            <p>{user?.fullName}</p>
          </div>
          <p className='text-xs text-gray-500 dark:text-gray-400'>{lastActiveText}</p>
        </div>
      </div>
      <div className='divider my-0 py-0 h-2'></div>

    </>
  )
}

export default OtherUser
