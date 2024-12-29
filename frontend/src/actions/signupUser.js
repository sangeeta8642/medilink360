import axios from "axios";

export const RegisterUser = async (formData) => {
  try {
    let user = await axios.post(
      `${import.meta.env.VITE_BACKENDURL}/patient/register`,
      formData,{withCredentials:true}
    );
  
    return user;
  } catch (error) {
    console.log(error);
  }
};
