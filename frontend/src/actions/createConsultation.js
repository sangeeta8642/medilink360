import axios from "axios";

export const CreateConsultation = async (formData) => {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BACKENDURL}/consultation`,
      formData,
      { withCredentials: true }
    );

    return await response.data;
  } catch (error) {
    console.log(error);
  }
};
