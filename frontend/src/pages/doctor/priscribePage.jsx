import { useGetconsultationById } from '@/hooks/use-get-consultation-by-id'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const PriscribePage = () => {
    const { id } = useParams()
    const nav = useNavigate()
    const user = JSON.parse(localStorage.getItem("authToken"))

    const { consultation } = useGetconsultationById(id)

    const [formData, setFormData] = useState({
        careToBeTaken: "",
        Medicines: "",
        consultationId: id,
        name: user.name,
        address: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`${import.meta.env.VITE_BACKENDURL}/prescription`,
                formData, { withCredentials: true })

            nav('/doctor')

        } catch (error) {
            console.log(error);

        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 shadow-lg rounded-md">
            <div className="mb-4">
                <h2 className='text-center text-3xl font-semibold'>Prescription form</h2>
                <label htmlFor="careToBeTaken" className="block text-lg font-medium mb-2">
                    Care to be Taken:
                </label>
                <textarea
                    id="careToBeTaken"
                    name="careToBeTaken"
                    value={formData.careToBeTaken}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter care instructions here..."
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="careToBeTaken" className="block text-lg font-medium mb-2">
                    Your address:
                </label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter care instructions here..."
                    required
                ></textarea>
            </div>
            <div className="mb-4">
                <label htmlFor="Medicines" className="block text-lg font-medium mb-2">
                    Medicines:
                </label>
                <textarea
                    id="Medicines"
                    name="Medicines"
                    value={formData.Medicines}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Enter prescribed Medicines here..."
                    required
                ></textarea>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
            >
                Submit
            </button>
        </form>
    );
}

export default PriscribePage