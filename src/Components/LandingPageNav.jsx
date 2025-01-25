import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion } from "framer-motion";


const LandingPageNav = () => {
    const showSubLink = (container) => {
        document.getElementById(container).classList.toggle('responsive')
    }

    const showNavBar = () => {
        document.getElementById('adminNavBar').classList.toggle('responsive')
    }
    const [percentage, setpercentage] = useState(0)
    window.onscroll = () => setpercentage((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)

    const containerVariants = {
        hidden: { opacity: 0, y: -100 },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: 'easeInOut',
          },
        },
      };
      
    return(
    <motion.nav initial="hidden" whileInView="visible" variants={containerVariants} className='sticky top-0 z-50'>
        <div className="bg-blue-700 p-4 text-white h-28 ">
            <div className="flex justify-between items-center h-full p-5 relative">
                <Link to='/' className='h-full flex md:flex-row justify-center items-center gap-3'>
                    <img src="/school_logo.png" className='w-32 h-full' alt="" />
                    <h6>HOPE Academy</h6>
                </Link>
                <button onClick={showNavBar} className='p-2 border-2 rounded-lg md:hidden'><i className='fa fa-bars'></i></button>
                <div id='adminNavBar' className="md:flex md:space-x-10 h-screen md:h-full">
                    <Link to="/" className='my-4 md:my-auto'>Home</Link>
                    <div className=" my-5 py-4 md:py-0 relative group md:my-auto">
                        <span className='cursor-pointer' onClick={() => showSubLink('signUpSubLink')}>Sign Up</span>
                        <div id='signUpSubLink' className="w-40 absolute hidden md:group-hover:block bg-white text-white md:text-blue-800 p-2 rounded shadow-md">
                            <Link to="/student/signup" className='block border-b-2 mb-3'>Student</Link>
                            <Link to="/staff/signup" className='block border-b-2 mb-3'>Staff</Link>
                            <Link to="/admin/signup" className='block border-b-2 mb-3'>Admin</Link>
                        </div>
                    </div>
                    <div className=" my-5 relative group md:my-auto">
                        <span className='cursor-pointer' onClick={() => showSubLink('signInSubLink')}>Sign In</span>
                        <div id='signInSubLink' className="w-40 absolute hidden md:group-hover:block bg-white text-white md:text-blue-800 p-2 rounded shadow-md">
                            <Link to="/student/signin" className='block border-b-2 mb-3'>Student</Link>
                            <Link to="/staff/signin" className='block border-b-2 mb-3'>Staff</Link>
                            <Link to="/admin/signin" className='block border-b-2 mb-3'>Admin</Link>
                        </div>
                    </div>
                    <Link to="/contact_us" className=' my-5 md:my-auto'>Contact Us</Link>
                    <Link to="/about_us" className=' my-5 md:my-auto'>About Us</Link>
                </div>
            </div>
        </div>
        <div className='w-full bg-red-600' style={{ height: '8px' }}>
            <div style={{ width: `${percentage}%` }} className='h-full bg-yellow-500'>
            </div>
        </div>
    </motion.nav>
    )
}

export default LandingPageNav