import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux';

const OtherUsers = () => {

  useGetOtherUsers();
  const {otherUsers} =  useSelector(store => store.user)
   if (!otherUsers) return null; //early return 
  return (
    
     <div className='overflow-auto flex-1'>
      {
        Array.isArray(otherUsers) && otherUsers.map((user)=>{
          return(
            <OtherUser key={user._id} user = {user}/>
          )
        })
      }
      
      
     </div>
    
  )
}

export default OtherUsers
