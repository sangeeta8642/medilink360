import axios from "axios";

export const RegisterUser = async (formData) => {
  try {
    let user = await axios.post(
      "http://localhost:8000/api/v1/patient/register",
      formData
    );
    console.log("User",user);
    
    return user;
  } catch (error) {
    console.log(error);
  }
};
