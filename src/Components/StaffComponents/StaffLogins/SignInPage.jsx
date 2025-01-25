import React, { useState } from 'react'
import { Formik, useFormik } from 'formik'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import * as Yup from 'yup';
import DisplayToast from '../../../CustomHooks/DisplayToast';
import { backendurl } from '../../../../constants/backendurl';
import { CircularProgress } from '@mui/material';




const SignInPage = () => {
  const navigate = useNavigate();
  const [submittingForm, setSubmittingForm] = useState(false)
  const formik = useFormik({
    initialValues: {
      email: '',
      class: 0,
      password: ''
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    }),
    onSubmit: (values) => {
      setSubmittingForm(true);      
      let endpoint = `${backendurl}staff/signin`
      axios.post(endpoint, values)
        .then((res) => {
          console.log('success');
          console.log(res);
          if (res.status == 200) {
            localStorage.setItem('staffToken', res.data.token)
            setSubmittingForm(false)
            navigate("/staff/dashboard");
            DisplayToast('success', 'Successfully Signed In')
          }
        })
        .catch((err) => {
          if (err?.response?.status == 477) {
            DisplayToast('error', 'Invalid Login Email')
          } else if (err?.response?.status == 478) {
            DisplayToast('error', 'Wrong Password')
          } else {
            DisplayToast('error', 'An Error Occurred, Plases Try Again')
          }
          setSubmittingForm(false);
        })
    }
  })

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row gap-2 h-screen">
        <div className='basis-2/5 bg-slate-200 pt-24 p-3 flex justify-center items-center '>
          <form onSubmit={formik.handleSubmit} className="h-auto mx-auto">
            <h3 className='text-center text-blue-600 font-bold text-3xl'>Staff Log In</h3>
            <label htmlFor="" className=''>Email</label>
            <input onChange={formik.handleChange} type="text" className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' placeholder='Email' name='email' />
            <label htmlFor="">Class</label>
            <select name="class" id="class" required onChange={formik.handleChange} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50'>
              <option value={0} selected>JSS 1</option>
              <option value={1}>JSS 2</option>
              <option value={2}>JSS 3</option>
              <option value={3}>SSS 1</option>
              <option value={4}>SSS 2</option>
              <option value={5}>SSS 3</option>
            </select>
            <label htmlFor="">Password</label>
            <input onChange={formik.handleChange} type="password" className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' placeholder='Staff Password' name='password' />
            <div className='my-3'>
              <label htmlFor="rememberMe">
                <input type="checkbox" className='accent-blue-600' name="rememberMe" id="rememberMe" />
                <small className='text-blue-400'>Remember me</small>
              </label>
            </div>
            <button type='submit' disabled={submittingForm} className='block py-2 bg-blue-500 w-full rounded-md hover:bg-blue-600'>
              {submittingForm ?  <CircularProgress color='inherit' size={30} /> : <span>Sign In</span> }
            </button>
            <p>New here? <Link to='/staff/signin' className='inline text-blue-500  hover:underline'>Sign Up</Link></p>
            <p>Forgotten Password? <Link to='/staff/forgottenpassword' className='inline text-red-500  hover:underline'>Reset</Link></p>
          </form>
        </div>
        <div className='basis-3/5 hidden md:block rounded-4 relative'>
          <img src="/teachers/teacher4.jpg" className='w-full h-auto sticky top-52  mt-54 md:mt-0' alt="" />
          <span className='absolute top-0 right-0 m-2 px-3 py-2 rounded-pill bg-blue-500 text-white rounded-md'><Link to='/staff/signin'>Sign Up</Link></span>
        </div>
      </div>
    </>
  )
}

export default SignInPage