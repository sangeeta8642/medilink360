import { useState, useEffect } from "react";
import axios from "axios";

export const useGetprescriptionById = (id) => {
  const [prescription, setprescription] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchprescription = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/prescription/${id}`,
          { withCredentials: true }
        );
        setprescription(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchprescription();
  }, []);
  return { prescription, loading, error };
};
