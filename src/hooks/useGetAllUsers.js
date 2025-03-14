import  { useEffect, useState } from 'react'
import axios from '../axios/axios';

const useGetAllUsers = () => {
    const [users , setusers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchusers = async()=>{
            try {
                const response = await axios.get("/api/v1/people");
                setusers(response.data.result);
                console.log("response here",response.data);
            } catch (error) {
                setError(error.message || "Failed to fetch models");
            }finally {
                setLoading(false);
              }
        }
        fetchusers();
    },[])

  return {users , loading ,error}
}

export default useGetAllUsers
