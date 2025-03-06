import { useState, useEffect } from "react";
import axios from "../axios/axios";


const useGetAllModels = () => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("/api/v1/users/model");
        setModels(response.data.result); // Assuming the response has the list of models
        console.log(response.data)
      } catch (err) {
        setError(err.message || "Failed to fetch models");
      } finally {
        setLoading(false);
      }
    };

    fetchModels();
  }, []);

  return { models, loading, error };
};

export default useGetAllModels;
