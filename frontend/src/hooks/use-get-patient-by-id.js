import { useState, useEffect } from "react";
import axios from "axios";

export const useGetPatientById = (id) => {
  const [patient, setPatient] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/patient/${id}`,
          { withCredentials: true }
        );
        setPatient(response.data.data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPatient();
  }, []);
  return { patient, loading, error };
};
