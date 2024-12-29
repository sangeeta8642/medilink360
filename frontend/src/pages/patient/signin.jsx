import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

const Signin = () => {
  const [PatientLoginData, setPatientLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate()

  const HandleLoginPatient = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/patient/login`,
        PatientLoginData, {
        withCredentials: true
      },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Login Successful:", response);


      localStorage.setItem("authToken", JSON.stringify(response.data.data));

      navigate("/patient");
    } catch (error) {
      // Handle errors
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const HandleInputChange = async (e) => {
    const { name, value } = e.target;
    setPatientLoginData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center mt-40">
      <form onSubmit={HandleLoginPatient} className="flex flex-col gap-6">
        <div className="text-xl font-bold tracking-wider text-center">
          Patient Signin
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={HandleInputChange}
            className="py-1.5 px-2.5 border rounded-md"
            placeholder="abc@gmail.com"
          />
        </div>
        <div className="flex flex-col">
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={HandleInputChange}
            className="py-1.5 px-2.5 border rounded-md"
          />
        </div>
        <div>
          <button
            type="submit"
            className="px-5 text-base rounded-md py-1 border bg-green-400"
          >
            Login
          </button>
        </div>

        <div className="w-full h-0.5 bg-black"></div>
        <div>
          New Patient ?
          <NavLink
            to="/patient/signup"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500 ml-3"
            }
          >
            Sign Up as Patient
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Signin;
