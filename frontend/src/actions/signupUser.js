import axios from "axios";

export const RegisterUser = async (formData) => {
  try {
    let user = await axios.post(
      "https://medilink360-3.onrender.com/api/v1/patient/register",
      formData
    );
    console.log("User",user);
    
    return user;
  } catch (error) {
    console.log(error);
  }
};
