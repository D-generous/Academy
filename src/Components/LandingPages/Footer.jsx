import React from 'react';
import { Link } from 'react-router-dom';

const LandingPageFooter = () => {
  return (
    <>
      <div className='grid grid-cols-3 bg-gray-100 gap-2 py-2 px-24'>
        <div className="p-8 ms-auto">
          <img src="/school_logo.png" alt="School logo" className='w-full h-32' />
          <h3 className="text-2xl">Every Child Deserves a Little HOPE...</h3>
        </div>
        <div className="p-8">
            <h3 className='text-2xl font-semibold mb-2'>Overview</h3>
            <Link className='text-blue-400' to='/'>Home</Link>
            <Link className='text-blue-400' to='/entrance_test'>Entrance Exam</Link>
            <Link className='text-blue-400' to='/student/signin'>Student Sign In</Link>
            <Link className='text-blue-400' to='/staff/signin'>Staff Sign In</Link>
            <Link className='text-blue-400' to='/admin/signin'>Admin Sign In</Link>
            <Link className='text-blue-400' to='/about_us'>About Us</Link>
            <Link className='text-blue-400' to='/contact_us'>Contact Us</Link>
        </div>
        <div className="p-8">
            <h3 className='text-2xl font-semibold mb-2'>Contact Us</h3>
            <p className='text-sm mb-2'>Ogbomoso, Oyo State.</p>
            <p className='text-sm mb-2'>Nigeria</p>
            <p className='text-sm mb-2'>Phone: <small><a href="tel:+2347015886456" className="text-blue-500 inline"> +2347015886456</a></small></p>
            <p className='text-sm mb-2'>Email: <small><a className='inline text-blue-500' href="mailto:adegbitejoshua07@gmail.com"> adegbitejoshua07@gmail.com</a></small></p>
        </div>
      </div>
      <div className='bg-light py-2 px-5 flex flex-col md:flex-row items-center justify-between'>
        <p className='text-sm md:ms-5'><small>HOPE Academy | Copyright © 2024</small></p>
        <a href='https://github.com/Adegbite-Joshua' target='blank' className='block text-sm md:me-5'><small>Website by <a href="https://github.com/Adegbite-Joshua" className='inline text-blue-400 font-bold'>PROADE</a></small></a>
      </div>
    </>
  );
};

export default LandingPageFooter;
