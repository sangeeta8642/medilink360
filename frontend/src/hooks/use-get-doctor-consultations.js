import { useState, useEffect } from "react";
import axios from "axios";

export const useGetdoctorConsultations = () => {
  const [consultations, setConsultations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConsultations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/consultation/get/by/doctor`,
          { withCredentials: true }
        );
        setConsultations(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchConsultations();
  }, []);
  return { consultations, loading, error };
};
