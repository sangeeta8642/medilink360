import { useState, useEffect } from "react";
import axios from "axios";

export const useGetPatientPrescription = () => {
  const [prescriptions, setPrescriptions] = useState([]); // Store doctors data
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state

  useEffect(() => {
    const fetchPrescriptions = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKENDURL}/prescription/get/by/patient`,
          { withCredentials: true }
        );
        setPrescriptions(response.data.data); // Set the fetched doctors data/$
        setLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        setError(error); // Set error if the request fails
        setLoading(false); // Set loading to false if an error occurs
      }
    };

    fetchPrescriptions(); // Call the function to fetch doctors
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return { prescriptions, loading, error }; // Return the doctors data, loading, and error state
};
