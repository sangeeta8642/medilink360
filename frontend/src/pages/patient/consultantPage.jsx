import { useGetDoctorById } from '@/hooks/use-get-doctor-by-id'
import { useNavigate, useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import ReactQRCode from 'react-qr-code';
import axios from 'axios';


const ConsultantPage = () => {
    const { doctorId } = useParams()
    const { doctor } = useGetDoctorById(doctorId)
    const nav = useNavigate()
   
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        illnessHistory: '',
        surgeryHistory: '',
        surgeryTimeSpan: '',
        isDiabetic: false,
        allergies: '',
        others: '',
        transactionId: ''
    });

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);
    const submitForm = async () => {

        const data = {
            doctorId,
            illness: formData.illnessHistory,
            recentSurgeryName: formData.surgeryHistory,
            recentSurgeryTimespan: formData.surgeryTimeSpan,
            isDiabetic: formData.isDiabetic,
            transitionId: formData.transactionId
        }

        try {
           
            let response = await axios.post(
                `${import.meta.env.VITE_BACKENDURL}/consultation`,
                data, {
                withCredentials: true
            }
            );
         
            alert("Form Submitted!");
            nav('/patient/consultations')
              } catch (error) {
            console.log(error);
        }

    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded">
            {step === 1 && (
                <Step1
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                />
            )}
            {step === 2 && (
                <Step2
                    formData={formData}
                    setFormData={setFormData}
                    nextStep={nextStep}
                    prevStep={prevStep}

                />
            )}
            {step === 3 && (
                <Step3
                    formData={formData}
                    prevStep={prevStep}
                    setFormData={setFormData}
                    submitForm={submitForm}
                />
            )}
        </div>
    );
}
export default ConsultantPage

export const Step3 = ({ formData, prevStep, submitForm, setFormData }) => {
    const [transactionId, setTransactionId] = useState('');

    useEffect(() => {
        const uniqueTransactionId = generateUniqueId();
        setTransactionId(uniqueTransactionId);
    }, []);

    const generateUniqueId = () => {
        return 'TRANS-' + Math.random().toString(36).substr(2, 9);
    };

    const handleInputChange = (event) => {
        setFormData({ ...formData, transactionId: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (formData.transactionId === transactionId) {
            submitForm();
        } else {
            alert('Invalid Transaction ID');
        }
    };

    return (
        <div>
            <h2 className="text-xl font-bold mb-4">Step 3: Payment</h2>

            <div className="mb-4">
                <label className="block mb-2">Payment QR Code</label>
                <ReactQRCode value={transactionId} size={256} />
            </div>

            <div className="mb-4">
                <label className="block mb-2">Transaction ID</label>
                <input
                    type="text"
                    value={formData.transactionId}
                    onChange={handleInputChange}
                    className="p-2 border border-gray-300 rounded w-full"
                />
            </div>

            <div className="flex justify-between">
                <button
                    onClick={prevStep}
                    className="bg-gray-500 text-white py-2 px-4 rounded"
                >
                    Previous
                </button>
                <button
                    onClick={handleSubmit}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    Submit
                </button>
            </div>
        </div>
    );
};



export const Step2 = ({ formData, setFormData, nextStep, prevStep }) => (
    <div>
        <h2 className="text-xl font-bold mb-4">Step 2: Family Medical History</h2>

        <div className="mb-4">
            <label className="block mb-2">Are you Diabetic?</label>
            <div className="flex items-center">
                <label className="mr-4">
                    <input
                        type="radio"
                        name="diabetic"
                        value={true}
                        onChange={(e) => setFormData({ ...formData, isDiabetic: e.target.value })}
                        className="mr-2"
                    />
                    Yes
                </label>
                <label>
                    <input
                        type="radio"
                        name="diabetic"
                        value={false}
                        onChange={(e) => setFormData({ ...formData, isDiabetic: e.target.value })}
                        className="mr-2"
                    />
                    No
                </label>
            </div>
        </div>

        <div className="mb-4">
            <label className="block mb-2">Any Allergies?</label>
            <input
                type="text"
                value={formData.allergies}
                onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-2">Other Medical Conditions?</label>
            <input
                type="text"
                value={formData.others}
                onChange={(e) => setFormData({ ...formData, others: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
            />
        </div>

        <div className="flex justify-between">
            <button
                onClick={prevStep}
                className="bg-gray-500 text-white py-2 px-4 rounded"
            >
                Previous
            </button>
            <button
                onClick={nextStep}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Next
            </button>
        </div>
    </div>
);



export const Step1 = ({ formData, setFormData, nextStep }) => (
    <div>
        <h2 className="text-xl font-bold mb-4">Step 1: Current Illness & Surgery History</h2>

        <div className="mb-4">
            <label className="block mb-2">Current Illness History</label>
            <textarea
                value={formData.illnessHistory}
                onChange={(e) => setFormData({ ...formData, illnessHistory: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                rows="4"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-2">Recent Surgery History</label>
            <textarea
                value={formData.surgeryHistory}
                onChange={(e) => setFormData({ ...formData, surgeryHistory: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
                rows="4"
            />
        </div>

        <div className="mb-4">
            <label className="block mb-2">Time Span of Surgery</label>
            <input
                type="text"
                value={formData.surgeryTimeSpan}
                onChange={(e) => setFormData({ ...formData, surgeryTimeSpan: e.target.value })}
                className="p-2 border border-gray-300 rounded w-full"
            />
        </div>

        <button
            onClick={nextStep}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
        >
            Next
        </button>
    </div>
);

