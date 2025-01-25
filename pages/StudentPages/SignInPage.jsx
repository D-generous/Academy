import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import DisplayToast from '../../src/CustomHooks/DisplayToast'
import LandingPageNav from '../../src/Components/LandingPageNav'
import LandingPageFooter from '../../src/Components/LandingPages/Footer'
import { backendurl } from '../../constants/backendurl';
import { CircularProgress } from '@mui/material'



const SignInPage = () => {
    document.querySelector('title').innerText = 'Sign In | Student';

    const [submittingForm, setSubmittingForm] = useState(false);

    const navigate = useNavigate()
    const formik = useFormik({
        initialValues: {
            password: '',
            class: 0,
            email: ''
        },
        onSubmit: (values) => {
            setSubmittingForm(true);
            let endpoint = `${backendurl}student/signin`
            axios.post(endpoint, values)
                .then((res) => {
                    console.log(res);
                    setSubmittingForm(false);
                    if (res?.status == 200) {
                        localStorage.studentToken = res.data.token
                        DisplayToast('success', 'Successfully Signed In')
                        navigate("/student/dashboard")
                    }
                })
                .catch((err) => {
                    setSubmittingForm(false);
                    if (err?.response?.status == 477) {
                        DisplayToast('error', 'Incorrect Password')
                    } else if (err?.response?.status == 478) {
                        DisplayToast('error', 'Invalid Email Address')
                    } else {
                        DisplayToast('error', 'Error Logging You In')
                    }
                })
        }
    })
    return (
        <>
            <LandingPageNav />
            <h3 className='text-center text-2xl bg-light m-0 p-3'>Welcome back to <span className='text-3xl font-bold text-blue-600'>HOPE Academy</span></h3>
            <div className="flex flex-col-reverse md:flex-row w-full p-4 topSpace bg-light gap-3 relative">
                <div className='basis-2/5 p-2 md:p-8 rounded-lg relative'>
                    <div className='absolute -z-10 left-0 right-0 top-0 bottom-0'>
                        <img src="/school_logo.png" alt="School Logo" className='sticky -z-10 top-32 w-full h-44' />
                    </div>
                    <form onSubmit={formik.handleSubmit} className="bg-white bg-opacity-75 flex flex-col gap-4">
                        <h3 className='text-center text-blue-600 font-bold text-3xl'>Student Sign In</h3>
                        <label htmlFor="class">Class</label>
                        <select name="class" id="class" {...formik.getFieldProps('class')} required className='form-select p-2 border-2 rounded-md'>
                            <option value={0}>JSS 1</option>
                            <option value={1}>JSS 2</option>
                            <option value={2}>JSS 3</option>
                            <option value={3}>SSS 1</option>
                            <option value={4}>SSS 2</option>
                            <option value={5}>SSS 3</option>
                        </select>
                        <label htmlFor="email">Student Email</label>
                        <input className='form-input p-2 mb-2 border-2 rounded-md' {...formik.getFieldProps('email')} id='email' name='email' type="email" placeholder='Student Email Address' />
                        <label htmlFor="password">Password</label>
                        <input className='form-input p-2 mb-2 border-2 rounded-md' {...formik.getFieldProps('password')} id='password' name='password' type="password" placeholder='Password' />
                        <button type='submit' className='btn bg-blue-500 text-white rounded p-2 hover:bg-blue-600 focus:outline-none'>
                            {submittingForm ?  <CircularProgress color='inherit' size={30} />  : <span>Sign In</span>}
                        </button>
                        <Link to='/student/forgottenpassword' className='text-red-500 hover:underline'>Forgotten Password?</Link>
                        <p>New here? <Link to='/student/signup' className='text-blue-500 hover:underline inline'>Sign Up</Link></p>
                    </form>
                </div>
                <div className="basis-3/5 order-2 rounded-5 relative">
                    <img src="/teachers/gallary6.jpg" className='w-full h-auto sticky top-10' alt="" />
                    <button className='absolute text-white top-0 right-0 m-2 w-24 px-3 py-2 rounded-full bg-blue-500 cursor-pointer hover:bg-blue-600'><Link to='/student/signup'>Sign Up</Link></button>
                </div>
            </div>
            <LandingPageFooter />
        </>

    )
}

export default SignInPage