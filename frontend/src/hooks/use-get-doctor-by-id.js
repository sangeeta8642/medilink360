import { useState, useEffect } from "react";
import axios from "axios";

export const useGetDoctorById = (id) => {
  const [doctor, setDoctor] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/doctor/${id}`,
          { withCredentials: true }
        );
        setDoctor(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  return { doctor, loading, error };
};
