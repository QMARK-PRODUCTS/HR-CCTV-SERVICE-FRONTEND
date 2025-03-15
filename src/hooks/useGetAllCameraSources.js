import React, { useEffect, useState } from 'react'
import axios from '../axios/axios';

const useGetAllCameraSources = () => {
  const [data , setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchCameraSources = async (params) => {
    setLoading(true);
    setError(null);
    try {
       const res = await axios.get("/api/v1/camera-sources") 
       setData(res.data.result || []);
       console.log(res.data)
    } catch (error) {
        setError(error.message || "Failed to fetch functions");
    }finally {
        setLoading(false);
      }
  };
  useEffect(()=>{
fetchCameraSources();
  },[])

    return{data ,loading , error , setData , refetch : fetchCameraSources}
}

export default useGetAllCameraSources
