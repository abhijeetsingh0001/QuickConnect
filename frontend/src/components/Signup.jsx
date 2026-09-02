import React from 'react'
import { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom'
import axios from "axios";
import toast from 'react-hot-toast'


const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({
    fullName:"",
    username:"",
    password:"",
    confirmPassword:"",
    gender:""
  });
  const navigate=useNavigate();
    const handleCheckbox =(gender)=>{
    setUser({...user,gender})
  };


  const onSubmitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
   try {
    const res = await axios.post(`/api/v1/user/register`,user,{
      headers:{
        'Content-Type':'application/json'
      },
      withCredentials:true
    });
    if(res.data.success){
      navigate("/login")
      toast.success(res.data.message);

    }
   } catch (error) {
     toast.error(error.response?.data?.message || "Registration failed");
     console.log(error);
   } finally {
     setLoading(false);
   }
   
   setUser({
     fullName:"",
     username:"",
     password:"",
     confirmPassword:"",
     gender:"",
   });
  }


  return (
    <div className="min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-480 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100 ">
        <h1 className="text-3xl font-bold text-center ">
          SignUp
        </h1>
        <form onSubmit={onSubmitHandler} action="">
          <div>
            <label className='label p-2'>
              <span className="text-base label-text">fullname </span>
            </label>
            <input value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              className="w-full input-bordered h-10" type="text" placeholder='fullname' />



          </div>
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
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input-bordered h-10" type="Password" placeholder='Password' />

          </div>
          <div>
            <label className='label1 p-2'>
              <span className="text-base label-text">ConfirmPassword </span>
            </label>
            <input value={user.confirmPassword}
              onChange={(e) => setUser({ ...user, confirmPassword: e.target.value })} className="w-full input-bordered h-10" type="Password" placeholder="ConfirmPassword" />

          </div>
          <div className='flex items-center my-4'>
            <div className='flex items-center'>
              <p>Male</p>
              <input type="checkbox" 
              checked={user.gender==="male"}
              onChange={()=>handleCheckbox("male")}
              aria-label="Checkbox" defaultChecked className="checkbox mx-2" />
            </div>
            <div className='flex items-center'>
              <p>FeMale</p>
              <input type="checkbox" 
              checked={user.gender==="female"}
              onChange={()=>handleCheckbox("female")}aria-label="Checkbox" defaultChecked className="checkbox mx-2" />
            </div>



          </div>

          <p className='text-center my-2'>Already have an account?

            <Link to="/login">
              Login

            </Link>
          </p>


          <div>
            <button disabled={loading} type='submit' className='w-full btn btn-block-md mt-2 border border-slate-800'>
              {loading ? <span className="loading loading-spinner"></span> : "SignUp"}
            </button>

          </div>
        </form>

      </div>

    </div>
  )
}

export default Signup
