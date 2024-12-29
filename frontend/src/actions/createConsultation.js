import axios from "axios";

export const CreateConsultation = async (formData) => {
  try {
    let response = await axios.post(
      "https://medilink360-3.onrender.com/api/v1/consultation",
      formData
    );

    return await response.data;
  } catch (error) {
    console.log(error);
  }
};
