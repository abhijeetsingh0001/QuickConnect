
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios"
import { useDispatch } from 'react-redux';

import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({

    username: "",
    password: "",



  });
const dispactch = useDispatch();

  const navigate = useNavigate();



  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`/api/v1/user/login`, user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      navigate("/");
      
      dispactch(setAuthUser(res.data));


    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      console.log(error);

    } finally {
      setLoading(false);
    }
    setUser({
      username: "",
      password: "",
    });
  }
  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-480 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 ">
        <h1 className="text-3xl font-bold text-center ">
          Login
        </h1>
        <form onSubmit={onSubmitHandler} action="">

          <div>
            <label className='label1 p-2'>
              <span className="text-base label-text">UserName</span>
            </label>
            <input value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full input-bordered h-10" type="text" placeholder='UserName' />

          </div>
          <div>
            <label className='label1 p-2'>
              <span className="text-base label-text">Password</span>
            </label>
            <input value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })} className="w-full input-bordered h-10" type="Password" placeholder='Password' />

          </div>

          <p className='text-center my-2'>Don't have an account?

            <Link to="/register">
              SignUp
            </Link>
          </p>


          <div>
            <button disabled={loading} type='submit' className='w-full btn btn-blockv btn-md mt-2 border border-slate-800 '>
              {loading ? <span className="loading loading-spinner"></span> : "Login"}
            </button>

          </div>
        </form>

      </div>

    </div>
  )
}

export default Login
