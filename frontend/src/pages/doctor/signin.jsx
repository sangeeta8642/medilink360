import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Signin = () => {
    const navigate = useNavigate()
    const [DoctorLoginData, setDoctorLoginData] = useState({
        email: "",
        password: "",
    });

    const HandleLoginDoctor = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:8000/api/v1/doctor/login`,
                DoctorLoginData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Login Successful:", response.data);

            localStorage.setItem("authToken", response.data.token);

            navigate("/doctor");
        } catch (error) {
            // Handle errors
            alert("An unexpected error occurred. Please try again.");
        }
    };

    const HandleInputChange = async (e) => {
        const { name, value } = e.target;
        setDoctorLoginData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    return (
        <div className="flex justify-center items-center mt-40">
            <form onSubmit={HandleLoginDoctor} className="flex flex-col gap-6">
                <div className="text-xl font-bold tracking-wider text-center">
                    Doctor Signin
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
                <div >
                    New Doctor ?
                    <NavLink
                        to="/doctor/signup"
                        className={({ isActive }) =>
                            isActive ? "text-blue-500 font-bold" : "text-gray-500 ml-3"
                        }
                    >
                        Sign Up as Doctor
                    </NavLink>
                </div>
            </form>
        </div>
    );
};

export default Signin;
