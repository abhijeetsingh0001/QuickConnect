import React, { useEffect } from 'react'
import axios from "axios";
import {useSelector,useDispatch} from "react-redux";
import { setMessages } from '../redux/messageSlice';


const useGetMessages = () => {
    const {selectedUser} = useSelector(store=>store.user);
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const res = await axios.get(`/api/v1/message/${selectedUser?._id}`);
                dispatch(setMessages(res.data));
                // Mark messages as read
                if (res.data.length > 0) {
                    axios.post(`/api/v1/message/read/${selectedUser?._id}`).catch(err => console.log(err));
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchMessages();
    }, [selectedUser?._id,setMessages]);
}

export default useGetMessages