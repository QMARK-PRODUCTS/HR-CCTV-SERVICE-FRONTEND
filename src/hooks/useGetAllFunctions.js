import { useEffect, useState } from "react";
import axios from "../axios/axios";

const useGetAllFunctions = () => {
  const [functions, setFunctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFunctions = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("/api/v1/functions");
      setFunctions(res.data.result || []); // Ensure data is set correctly
    } catch (error) {
      setError(error.message || "Failed to fetch functions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFunctions();
  }, []);

  return { functions, loading, error, setFunctions, refetch: fetchFunctions };
};

export default useGetAllFunctions;
