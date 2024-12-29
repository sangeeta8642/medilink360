import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [DoctorRegisterData, setDoctorRegisterData] = useState({
    email: "",
    password: "",
    name: "",
    phone: "",
    speciality: "",
    experience: "",
    file: "",
  });

  const handleFileChange = (e) => {
    setDoctorRegisterData({
      ...DoctorRegisterData,
      file: e.target.files[0],
    });
  };

  const HandleRegisterDoctor = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", DoctorRegisterData.name);
      formData.append("speciality", DoctorRegisterData.speciality);
      formData.append("email", DoctorRegisterData.email);
      formData.append("experience", DoctorRegisterData.experience);
      formData.append("password", DoctorRegisterData.password);
      formData.append("phone", DoctorRegisterData.phone);
      formData.append("file", DoctorRegisterData.file);

      console.log(DoctorRegisterData);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKENDURL}/doctor/register`,
        formData
      );

      console.log("Register Successful:", response.data);

      navigate("/doctor/signin");
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const HandleInputChange = async (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^\d{0,10}$/.test(value)) {
        alert("Phone number must be 10 digits and numeric.");
      }
    }
    setDoctorRegisterData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="flex justify-center items-center mt-14">
      <form onSubmit={HandleRegisterDoctor} className="flex flex-col gap-2">
        <div className="text-xl font-bold tracking-wider text-center">
          Doctor SignUp
        </div>
        <div className="flex flex-col">
          <label>Name</label>
          <input
            type="text"
            name="name"
            onChange={HandleInputChange}
            className="py-1.5 px-2.5 border rounded-md"
            placeholder="Jhon Deo"
          />
        </div>
        <div className="flex flex-col">
          <label>Email</label>
          <input
            type="email"
            name="email"
            onChange={HandleInputChange}
            className="py-1.5 px-2.5 border rounded-md"
            placeholder="jhon@gmail.com"
          />
        </div>
        <div className="flex flex-col">
          <label>phone</label>
          <input
            type="number"
            name="phone"
            onChange={HandleInputChange}
            className="py-1.5 px-2.5 border rounded-md"
            placeholder="1234567890"
          />
        </div>
        <div className="flex flex-col">
          <label>Experience</label>
          <input
            type="number"
            name="experience"
            onChange={HandleInputChange}
            className="py-1.5 px-2.5 border rounded-md"
          />
        </div>
        <div className="flex flex-col">
          <label>speciality</label>
          <input
            type="text"
            name="speciality"
            onChange={HandleInputChange}
            className="py-1.5 px-2.5 border rounded-md"
            placeholder="General, surgen, etc"
          />
        </div>
        <div className="flex flex-col">
          <label>Image</label>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={handleFileChange}
            className="py-1.5 px-2.5 border rounded-md"
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
            Register
          </button>
        </div>

        <div className="w-full h-0.5 bg-black"></div>
        <div>
          New Doctor ?
          <NavLink
            to="/doctor/signin"
            className={({ isActive }) =>
              isActive ? "text-blue-500 font-bold" : "text-gray-500 ml-3"
            }
          >
            Sign In
          </NavLink>
        </div>
      </form>
    </div>
  );
};

export default Signup;
