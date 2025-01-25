import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import NavBar from '../../src/Components/StudentComponents/NavBar'
import fetchStudentInfo from '../../src/CustomHooks/StudentHooks/fetchStudentInfo'
import checkStudentFeeStatus from '../../src/CustomHooks/StudentHooks/checkStudentFeeStatus'
import { backendurl } from '../../constants/backendurl';


const SchoolFeePayment = () => {
    document.querySelector('title').innerText = 'Fee Payment | Student'; 
    const [studentInfo, fetching, termDetails] = fetchStudentInfo();
    const [paymentType, setPaymentType] = useState("");
    const [paymentAmount, setPaymentAmount] = useState(0);
    const [fullAmount, setfullAmount] = useState(0);
    const [paymentDisplayOption] = checkStudentFeeStatus();

    useEffect(() => {
      setfullAmount(termDetails.schoolFees);
    }, [termDetails])
    

    const handlePaymentTypeChange = (type) => {
        setPaymentType(type);
        setPaymentAmount(type === "full" ? fullAmount : fullAmount / 2);
    };

    const initializePayment = async () => {
        var handler = PaystackPop.setup({
            key: 'pk_test_020bedb6004bb3a95bb5589b33405add7e4e79a2',
            email: studentInfo.email,
            amount: paymentAmount * 100,
            currency: 'NGN',
            ref: 'HopeAcademyPayment' + Math.floor(Math.random() * 1000000000 + 1),
            callback: function (response) {
                var reference = response.reference;
                console.log({
                    type: paymentType,
                    amount: paymentAmount,
                    ref: reference,
                    studentClass: studentInfo.class,
                    email: studentInfo.email
                });
                axios.post(`${backendurl}student/fee_payment`, {
                    type: paymentType,
                    amount: paymentAmount,
                    ref: reference,
                    studentClass: studentInfo.class,
                    email: studentInfo.email
                })
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            },
            onClose: function () {
                alert('Transaction was not completed, window closed.');
            },
        });
        handler.openIframe();
    };


    return (
        <>
            <div className="flex allWrap h-screen">
                <NavBar />
                {paymentDisplayOption !== 'full' && (
                    <div className="container h-full flex justify-center items-center mt-5 mx-auto">
                        <div className="w-96 mx-auto bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-2xl font-bold text-center mb-4">School Fees Payment</h2>
                            <div className="mb-4">
                                <label className="font-bold block">Payment Instructions:</label>
                                <p className="text-sm">
                                    1. Select your payment type (Full or Half Payment).
                                    <br />
                                    2. Click the "Pay Now" button to proceed with the payment through Paystack.
                                </p>
                            </div>
                            <div className="mb-4">
                                <label className="font-bold block">Select Payment Option:</label>
                                {paymentDisplayOption === 'indebt' && (
                                    <div className="flex justify-center space-x-2">
                                        <button
                                            className={`p-2 rounded-md ${paymentType == 'full' ? 'bg-green-500' : 'bg-red-400'} text-white`}
                                            onClick={() => handlePaymentTypeChange('full')}
                                        >
                                            Full Payment
                                        </button>
                                        <button
                                            className={`p-2 rounded-md ${paymentType == 'half' ? 'bg-green-500' : 'bg-red-400'} text-white`}
                                            onClick={() => handlePaymentTypeChange('half')}
                                        >
                                            Half Payment
                                        </button>
                                    </div>
                                )}
                                {paymentDisplayOption === 'half' && (
                                    <button
                                        className="block p-2 rounded-md bg-yellow-400 text-white mt-2"
                                        onClick={() => handlePaymentTypeChange('otherhalf')}
                                    >
                                        Second Part Payment
                                    </button>
                                )}
                            </div>
                            <div className="mb-4">
                                <label className="font-bold block">Payment Amount:</label>
                                <input
                                    type="number"
                                    value={paymentAmount}
                                    readOnly
                                    className="form-control"
                                />
                            </div>
                            <div className="text-center">
                                <button
                                    className={`p-2 rounded-md text-white ${paymentType === '' ? 'bg-red-400 cursor-not-allowed' : 'bg-green-500'}`}
                                    onClick={initializePayment}
                                    disabled={paymentType === ''}
                                >
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    </div>
                )}
                {paymentDisplayOption === 'full' && (
                    <div className="container mt-5 mx-auto flex justify-center items-center h-screen">
                        <div className="text-center">
                            <i style={{ fontSize: '80px' }} className="fa fa-check-circle text-green-500"></i>
                            <h2 className="text-2xl font-bold text-green-500 mt-4">Payment Completed</h2>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default SchoolFeePayment;
