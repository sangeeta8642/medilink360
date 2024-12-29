import React, { useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const signup = () => {
    const [PatientRegisterData, setPatientRegisterData] = useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        age: null,
        file: "",
    });

    const HandleRegisterPatient = async (e) => {
        e.preventDefault();
        console.log(PatientRegisterData);
        try {
            const response = await axios.post(
                `${import.meta.env.VITE_BACKENDURL}/patient/register`,
                PatientRegisterData,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            console.log("Register Successful:", response.data);
            toast.success("Register Successful");

            localStorage.setItem("authToken", response.data.token);

            navigate("/dashboard");
        } catch (error) {
            // Handle errors
            alert("An unexpected error occurred. Please try again.");
        }
    };

    const HandleInputChange = async (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            if (!/^\d{0,10}$/.test(value)) {
                alert("Phone number must be 10 digits and numeric.");
            }
        }
        setPatientRegisterData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    
    return (
        <div className="flex justify-center items-center mt-14">
            <form onSubmit={HandleRegisterPatient} className="flex flex-col gap-2">
                <div className="text-xl font-bold tracking-wider text-center">
                    Patient SignUp
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
                    <label>Age</label>
                    <input
                        type="number"
                        name="age"
                        onChange={HandleInputChange}
                        className="py-1.5 px-2.5 border rounded-md"
                    />
                </div>
                <div className="flex flex-col">
                    <label>Image</label>
                    <input
                        type="file"
                        name="profilePic"
                        onChange={HandleInputChange}
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
                    New Patient ?
                    <NavLink
                        to="/patient/signin"
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

export default signup;
