import React, { useState } from 'react'
import { Link } from "react-router-dom";
import SignUpForm from './SignUpForm';


const SignUpPage = () => {

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row bg-slate-200">
        <SignUpForm type='signup' />
        <div className="basis-3/5 rounded-5 relative">
          <img src="/teachers/teacher4.jpg" className='w-full h-auto sticky top-10' alt="" />
          <span className='absolute top-0 right-0 m-2 px-3 py-2 rounded-md bg-blue-500 text-white'><Link to='/staff/signin'>Sign In</Link></span>
        </div>
      </div>
    </>
  )
}

export default SignUpPage