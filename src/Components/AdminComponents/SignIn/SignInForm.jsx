import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import OTPInput from 'react-otp-input';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import DisplayToast from '../../../CustomHooks/DisplayToast';
import { backendurl } from '../../../../constants/backendurl';




const SignInForm = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);


  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: (values) => {
      signIn(values)
    },
    onError: (error) => {
      console.log(error)
    }
  });


  const signIn = async(values)=>{
    if (!otpSent) {
        axios.post(`${backendurl}admin/send_otp`, {email: values.email})
        .then((res)=>{
          if (res.status==200) {
            setOtp(res.data.otp)
            setOtpSent(true);
          }
        })
        .catch((error)=>{
          DisplayToast('error', 'Invalid Login Details')
          console.log(error)
        })
    } else {
        if(otp==otpInput) {
          console.log('hi')
          axios.post(`${backendurl}admin/sign_in`, {...values})
          .then((res)=>{
            if (res.status==200) {
              localStorage.setItem('adminToken', res.data.token)
              DisplayToast('success', 'Signin successful!')
              navigate('/admin/dashboard')
              return;
            }
          })
          .catch((error)=>{
            DisplayToast('error', 'Incorrect Password')
            setOtpSent(false);
          })          
        } else {
          DisplayToast('error', 'Incorrect OTP')
        }
      }
  }

  const renderInput = (value, index) => {
    return (
      <input
        // key={index}
        type="number"
        // value={value}
        // onChange={() => {}}
        // onFocus={() => {}}
        // onBlur={() => {}}
        maxLength={1} // Set the maximum length of the input to 1 character
        // className="otp-input" // Apply any additional styling classes as needed
      />
    );
  };
  


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign In</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            {otpSent && (
              <div className="mb-4">
                <label htmlFor="otp" className="text-gray-600 block">
                  Enter OTP sent to email address
                </label>
                {/* <OTPInput
                  id="otp"
                  name="otp"
                  numInputs={6}
                  value={otp}
                  onChange={(otp) => setOtp(otp)}
                  isInputNum
                  renderInput={renderInput}
                /> */}
                <input type="number" onChange={(e)=>setOtpInput(e.target.value)} className='w-full h-12 p-2 border-2 rounded-lg border-black' name="" id="" />
              </div>
            )} 

            {!otpSent && (<>
              <div className="mb-4">
              <label htmlFor="email" className="text-gray-600">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>
              )}
            </div>

            <div className="my-4">
              <label htmlFor="password" className="text-gray-600">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {formik.touched.password && formik.errors.password && (
                <p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>
              )}
            </div>
            </>)}

            <div className="my-4 flex justify-center gap-2">
              {otpSent && <button onClick={()=>setOtpSent(false)} className=' basis-2 my-2 px-2 rounded-md bg-red-400' type='button'>Cancel</button>}
              <button
                type="submit"
                className="group relative basis-4/6 flex justify-center my-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {!otpSent ? 'Sign In' : 'Verify OTP'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignInForm;
