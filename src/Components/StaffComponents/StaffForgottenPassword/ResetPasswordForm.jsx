import React, { useState } from 'react';
import axios from 'axios'
import { backendurl } from '../../../../constants/backendurl';




const ResetPasswordForm = () => {
    const [email, setEmail] = useState('');
    const [staffClass, setstaffClass] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(`${backendurl}staff/send_password_link`, { email, staffClass })
            .then((res) => {
                console.log(res)
                if (res.status == 200) {
                    alert('Email sent')
                    setEmail('')
                    setstaffClass('')
                } else if (res.status == 403) {
                    alert('Invalid Student Information')
                }
            })
            .catch((error) => {
                console.log(error)
            })

    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg shadow-md">
            <p className="text-center mb-4">
                Are you sure you want to proceed with resetting your password? A reset email will be sent to your registered email address.
            </p>
            <div className="mb-4">
                <label htmlFor="clas" className="block">Class</label>
                <select
                    onChange={(e) => setstaffClass(e.target.value)}
                    required
                    className="w-full p-2 border rounded-lg"
                >
                    <option value={0} selected>JSS1</option>
                    <option value={1}>JSS2</option>
                    <option value={2}>JSS3</option>
                    <option value={3}>SSS1</option>
                    <option value={4}>SSS2</option>
                    <option value={5}>SSS3</option>
                </select>
            </div>
            <div className="mb-4">
                <label htmlFor="email" className="block">Email address:</label>
                <input
                    type="email"
                    className="w-full p-2 border rounded-lg"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">
                Reset Password
            </button>
        </form>

    );
};

export default ResetPasswordForm;
