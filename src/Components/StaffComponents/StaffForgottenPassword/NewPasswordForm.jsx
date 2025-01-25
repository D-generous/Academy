import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendurl } from '../../../../constants/backendurl';
import DisplayToast from '../../../CustomHooks/DisplayToast';





const NewPasswordForm = ({ userDetails }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);
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
        axios.post(`${backendurl}staff/change_password`, {
            staffClass: userDetails.staffClass,
            email: userDetails.email,
            newPassword
        }).then((res) => {
            if (res.status == 200) {
                DisplayToast('success', 'Password changed successfully')
                navigate('/staff/signin')
            } else {
                DisplayToast('error', 'Error in saving your password, please try again')
            }
        })
        .catch((error) => {
            console.log(error);
            DisplayToast('error', 'Error in saving your password, please try again')
        })
    }

    return (
        <div>
            <h2 className="text-2xl font-semibold">Change Password</h2>
            <div className="mb-4">
                <label htmlFor="newPassword" className="block">New Password</label>
                <input
                    type="password"
                    className={`w-full px-3 py-2 border rounded-lg ${passwordsMatch ? '' : 'border-red-500'}`}
                    id="newPassword"
                    placeholder="Enter your new password"
                    value={newPassword}
                    onChange={handleNewPasswordChange}
                />
            </div>
            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block">Confirm Password</label>
                <input
                    type="password"
                    className={`w-full px-3 py-2 border rounded-lg ${passwordsMatch ? '' : 'border-red-500'}`}
                    id="confirmPassword"
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {!passwordsMatch && (
                    <p className="text-red-500">Passwords do not match.</p>
                )}
            </div>
            <button
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                onClick={saveNewPassword}
                disabled={!passwordsMatch}
            >
                Change Password
            </button>
        </div>

    );
};

export default NewPasswordForm;
