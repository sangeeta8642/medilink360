import { useState, useEffect } from "react";
import axios from "axios";

export const useGetPatientById = (id) => {
  const [patient, setPatient] = useState([]); // Store Patients data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/patient/${id}`,
          { withCredentials: true }
        );
        setPatient(response.data.data); // Set the fetched Patients data/$
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error); // Set error if the request fails
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchPatient(); // Call the function to fetch Patients
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return { patient, loading, error }; // Return the doctors data, loading, and error state
};
