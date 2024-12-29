import axios from "axios";

export const LogOut = async () => {
  try {
    let response = await axios.post(
      `${import.meta.env.VITE_BACKENDURL}/logout`,
      null,
      { withCredentials: true }
    );

    return await response.data;
  } catch (error) {
    console.log(error);
  }
};
