import { useState, useEffect } from "react";
import axios from "axios";

export const useGetconsultationById = (id) => {
  const [consultation, setconsultation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchconsultation = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/consultation/${id}`,
          { withCredentials: true }
        );
        setconsultation(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchconsultation();
  }, []);

  return { consultation, loading, error };
};
