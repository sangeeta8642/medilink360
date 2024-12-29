import axios from "axios";

export const CreateConsultation = async (formData) => {
  try {
    let response = await axios.post(
      "http://localhost:8000/api/v1/consultation",
      formData
    );

    return await response.data;
  } catch (error) {
    console.log(error);
  }
};
