import axios from "axios";

export const RegisterUser = async (formData) => {
  try {
    let user = await axios.post(
      `${import.meta.env.VITE_BACKENDURL}/patient/register`,
      formData
    );
    console.log("User", user);

    return user;
  } catch (error) {
    console.log(error);
  }
};
