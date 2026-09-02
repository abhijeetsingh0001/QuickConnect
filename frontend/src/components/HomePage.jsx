import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);

  if (!authUser) {
    return (
      <div className="flex flex-col items-center justify-center sm:h-[450px] md:h-[550px] w-full min-w-[400px] md:min-w-[550px] p-8 rounded-2xl bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">Welcome to Chat</h1>
        <p className="text-gray-200 text-center mb-8 max-w-sm">Connect with friends, share moments, and stay in touch instantly.</p>
        
        <div className="flex flex-col w-full gap-4 max-w-xs">
          <Link to="/login" className="btn w-full bg-blue-600 hover:bg-blue-700 text-white border-none rounded-xl text-lg font-medium transition-all shadow-lg hover:shadow-blue-600/30">
            Login
          </Link>
          <Link to="/register" className="btn w-full bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-xl text-lg font-medium transition-all">
            Create an account
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-2xl overflow-hidden bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-200 dark:border-none dark:shadow-none dark:bg-gray-400 dark:bg-opacity-0 dark:bg-clip-padding dark:backdrop-filter dark:backdrop-blur-lg'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default HomePage

