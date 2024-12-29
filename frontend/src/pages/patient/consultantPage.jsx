import { useGetDoctorById } from '@/hooks/use-get-doctor-by-id'
import { useParams } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
// import QRCode from 'qrcode.react';
import ReactQRCode from 'react-qr-code';
import { CreateConsultation } from '@/actions/createConsultation';
import axios from 'axios';


const ConsultantPage = () => {
    const { doctorId } = useParams()
    const { doctor } = useGetDoctorById(doctorId)
    const user = JSON.parse(localStorage.getItem("authToken"))
    console.log("doctorId", doctor);

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
            console.log("data", data);

            let response = await axios.post(
                "http://localhost:8000/api/v1/consultation",
                data, {
                withCredentials: true
            }
            );
            console.log("response", response);

            alert("Form Submitted!");
            // return await response.data;
        } catch (error) {
            console.log(error);
        }

        // console.log(formData);
        // Handle form submission (e.g., send data to an API)
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


// const Step3 = ({ formData, prevStep, submitForm, setFormData }) => (

//     <div>
//         <h2 className="text-xl font-bold mb-4">Step 3: Payment</h2>

//         <div className="mb-4">
//             <label className="block mb-2">Payment QR Code</label>
//             <ReactQRCode value="https://www.example.com/payment" />
//         </div>

//         <div className="mb-4">
//             <label className="block mb-2">Transaction ID</label>
//             <input
//                 type="text"
//                 value={formData.transactionId}
//                 onChange={(e) => setFormData({ ...formData, transactionId: e.target.value })}
//                 className="p-2 border border-gray-300 rounded w-full"
//             />
//         </div>

//         <div className="flex justify-between">
//             <button
//                 onClick={prevStep}
//                 className="bg-gray-500 text-white py-2 px-4 rounded"
//             >
//                 Previous
//             </button>
//             <button
//                 onClick={submitForm}
//                 className="bg-green-500 text-white py-2 px-4 rounded"
//             >
//                 Submit
//             </button>
//         </div>
//     </div>
// );

// import React, { useState, useEffect } from 'react';
// import QRCode from 'qrcode.react';

export const Step3 = ({ formData, prevStep, submitForm, setFormData }) => {
    const [transactionId, setTransactionId] = useState('');

    // Generate a unique transaction ID (this can be fetched from the backend)
    useEffect(() => {
        const uniqueTransactionId = generateUniqueId();
        setTransactionId(uniqueTransactionId);
        // setFormData({ ...formData, transactionId: uniqueTransactionId });
    }, []);

    // Function to generate a unique ID (For demonstration purposes)
    const generateUniqueId = () => {
        return 'TRANS-' + Math.random().toString(36).substr(2, 9); // simple unique ID generator
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
                        // checked={formData.isDiabetic === true}
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
                        // checked={formData.isDiabetic === false}
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

