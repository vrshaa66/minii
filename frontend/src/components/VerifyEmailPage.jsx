// import React from "react";

// const VerifyEmail = () => {
//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//                 <h2 className="text-2xl font-bold text-center mb-4">Verify Your Email</h2>
//                 <p className="text-center">
//                     Please check your email for a verification link to activate your account.
//                 </p>
//             </div>
//         </div>
//     );
// };

// export default VerifyEmail; 

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const VerifyEmailPage = () => {
    const { token } = useParams();
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await fetch(`http://localhost:5000/verify?token=${token}`);
                const data = await response.text(); // Or response.json() if your backend sends JSON
                setMessage(data);
                if (response.ok) {
                    setTimeout(() => navigate('/login'), 3000); // Redirect after a delay
                }
            } catch (error) {
                console.error('Verification error:', error);
                setMessage('An error occurred during verification.');
            }
        };

        verifyEmail();
    }, [token, navigate]);

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-2xl font-bold mb-4">Verify Email</h2>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default VerifyEmailPage;

