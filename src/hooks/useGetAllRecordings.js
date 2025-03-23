import React, { useEffect, useState } from "react";
import axios from "../axios/axios";

const useGetAllRecordings = (Id) => {
  const [record, setRecord] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRecords = async (Id) => { // ✅ Fix: No destructuring
    if (!Id) return; // Prevent unnecessary API calls

    setLoading(true);
    setError(null);

    try {
      const res = await axios.get(`/api/v1/functions/recordings/${Id}`);
      setRecord(res.data.result || []);
      console.log("Record API Response:", res.data);
    } catch (error) {
      setError(error.message || "Failed to fetch functions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords(Id); // ✅ Fix: Pass Id correctly
  }, [Id]); // ✅ Runs when Id changes

  return { record, loading, error, setRecord };
};

export default useGetAllRecordings;
