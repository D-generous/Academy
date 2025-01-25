import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendurl } from '../../../../constants/backendurl';
import DisplayToast from '../../../CustomHooks/DisplayToast';
import { CircularProgress } from '@mui/material';



const NewPasswordForm = ({ userDetails }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
    const [submittingForm, setSubmittingForm] = useState(false);
    const navigate = useNavigate();


    const handleNewPasswordChange = (e) => {
        const newPasswordValue = e.target.value;
        setNewPassword(newPasswordValue);
        setPasswordsMatch(newPasswordValue === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        const confirmPasswordValue = e.target.value;
        setConfirmPassword(confirmPasswordValue);
        setPasswordsMatch(newPassword === confirmPasswordValue);
    };

    const saveNewPassword = () => {
        setSubmittingForm(true);
        axios.post(`${backendurl}student/change_password`, {
            studentClass: userDetails.studentClass,
            email: userDetails.email,
            newPassword
        }).then((res) => {
            setSubmittingForm(false);
            if (res.status == 200) {
                DisplayToast('success', 'Password changed successfully');
                navigate('/student/signin');
            } else {
                DisplayToast('error', 'Error in saving your password, please try again');
            }
        })
            .catch((error) => {
                console.log(error);
                setSubmittingForm(false);
                DisplayToast('error', 'Error in saving your password, please try again');
            })
    }


    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
            <div className="mb-4">
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-600">
                    New Password
                </label>
                <input
                    type="password"
                    className="mt-1 p-2 w-full border rounded focus:outline-none focus:border-blue-500"
                    id="newPassword"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-600">
                    Confirm Password
                </label>
                <input
                    type="password"
                    className={`mt-1 p-2 w-full border rounded focus:outline-none ${passwordsMatch ? 'border-gray-300' : 'border-red-500'}`}
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {!passwordsMatch && (
                    <p className="text-red-500 text-sm mt-1">Passwords do not match.</p>
                )}
            </div>
            <button
                className={`w-full bg-blue-500 text-white p-2 rounded ${passwordsMatch ? 'hover:bg-blue-600' : 'cursor-not-allowed opacity-50'}`}
                onClick={saveNewPassword}
                disabled={!passwordsMatch || submittingForm }
            >
                {submittingForm ?  <CircularProgress color='inherit' size={30} /> : <span>Change Password</span> }
            </button>
        </div>
    );
};

export default NewPasswordForm;
