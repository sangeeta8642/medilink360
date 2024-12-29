import { useState, useEffect } from 'react';
import axios from 'axios';

export const useGetAllDoctors = () => {
  const [doctors, setDoctors] = useState([]);  // Store doctors data
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/doctor');
        setDoctors(response.data.data);  // Set the fetched doctors data
        setLoading(false);  // Set loading to false after data is fetched
      } catch (error) {
        setError(error);  // Set error if the request fails
        setLoading(false);  // Set loading to false if an error occurs
      }
    };

    fetchDoctors();  // Call the function to fetch doctors
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  return { doctors, loading, error };  // Return the doctors data, loading, and error state
};
