import { useEffect } from "react";

import './App.css';
import{createBrowserRouter,RouterProvider} from "react-router-dom";
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import { useSelector,useDispatch } from 'react-redux';
import io from "socket.io-client"
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers, addTypingUser, removeTypingUser } from './redux/userSlice';


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  {
    path: "/login",
    element: <Login/>
  },
  {
    path: "/register",

    element: <Signup/>
  }
]);

function App() {
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const {mode} = useSelector(store=>store.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }, [mode]);

  useEffect(()=>{
    if(authUser){
      const socketio = io(``, {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });

      socketio?.on('userTyping', (userId) => {
        dispatch(addTypingUser(userId));
      });

      socketio?.on('userStoppedTyping', (userId) => {
        dispatch(removeTypingUser(userId));
      });
      return () => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);





  return (
    <div className="App p-4 h-screen flex items-center justify-center">
      
      <RouterProvider router={router} />
      
      
    </div>
  );
}

export default App;
