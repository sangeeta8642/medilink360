import { useState, useEffect } from "react";
import axios from "axios";

export const useGetPatientPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/prescription/get/by/patient`,
          { withCredentials: true }
        );
        setPrescriptions(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPrescriptions();
  }, []);
  return { prescriptions, loading, error };
};
