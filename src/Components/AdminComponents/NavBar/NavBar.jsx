import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DisplayToast from '../../../CustomHooks/DisplayToast';


const Navbar = () => {
  const navigate = useNavigate();
  const showNavBar =()=>{
    document.getElementById('adminNavBar').classList.toggle('responsive')
  }
  const showSubLink =(container)=>{
    document.getElementById(container).classList.toggle('responsive')
  }

  const logOut =()=>{
    localStorage.removeItem('adminToken')
    DisplayToast('success', 'Sign Out Successful')
    navigate('/admin/signin')
  }

  return (
    <nav className="bg-blue-700 p-4 text-white h-28 sticky top-0">
      <div className="flex justify-between items-center h-full p-5 relative">
        <img src="/school_logo.png" className='w-32 h-full' alt="" />
        <button onClick={showNavBar} className='p-2 border-2 rounded-lg md:hidden'><i className='fa fa-bars'></i></button>
        <div id='adminNavBar' className="md:flex md:space-x-10 h-screen md:h-full">
          <Link to="/admin/dashboard" className='my-auto'>Dashboard</Link>
          <div className="relative group my-auto">
            <span className='cursor-pointer' onClick={()=>showSubLink('accountSubLink')}>Account</span>
            <div id='accountSubLink' className="w-40 absolute hidden md:group-hover:block bg-white text-gray-800 p-2 rounded shadow-md">
              <Link to="/admin/account/new" className='block border-b-2 mb-3'>New Account</Link>
              {/* <Link to="/admin/account/edit" className='block border-b-2 mb-3'>Edit Account</Link> */}
              <Link to="/admin/account/staff" className='block border-b-2 mb-3'>Staffs Account</Link>
              <Link to="/admin/account/student" className='block border-b-2 mb-3'>Students Account</Link>
            </div>
          </div>
          <Link to="#" className='block my-auto'>Inbox</Link>
          <div className="relative group my-auto">
            <span className='cursor-pointer' onClick={()=>showSubLink('coursesSubLink')}>Courses</span>
            <div id='coursesSubLink' className="w-40 absolute hidden md:group-hover:block bg-white text-gray-800 p-2 rounded shadow-md">
              <Link to="/admin/course/new" className='block border-b-2 mb-3'>New Courses</Link>
              <Link to="/admin/course/all" className='block border-b-2 mb-3'>All Courses</Link>
            </div>
          </div>
          <div className="relative group my-auto">
            <span className='cursor-pointer' onClick={()=>showSubLink('othersSubLink')}>Others</span>
            <div id='othersSubLink' className="w-40 absolute hidden md:group-hover:block bg-white text-gray-800 p-2 rounded shadow-md">
              <Link to="/admin/entrance_test" className='block border-b-2 mb-3'>Entrance Test</Link>
              <Link to="/admin/new_term" className='block border-b-2 mb-3'>New Term</Link>
              <Link to="/admin/salary_payment" className='block border-b-2 mb-3'>Payments</Link>
            </div>
          </div>
          <Link to="/admin/news_and_notices" className='block my-auto'>News and Notices</Link>
          <button onClick={logOut} className='block my-auto'>Log Out</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
