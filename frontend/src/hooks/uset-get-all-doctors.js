import { useState, useEffect } from "react";
import axios from "axios";

export const useGetAllDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/doctor`,
          {
            withCredentials: true,
          }
        );
        setDoctors(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);
  return { doctors, loading, error };
};
