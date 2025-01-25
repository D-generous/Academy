import React from 'react'
import LandingPageNav from '../../src/Components/LandingPageNav';
import SignUpPage from '../../src/Components/StaffComponents/StaffSignUp/SignUpPage';
import MessageSchool from '../../src/Components/MessageSchool';
import LandingPageFooter from '../../src/Components/LandingPages/Footer';


const StaffSignUp = () => {
  return (
    <div className=''>
      <LandingPageNav/>
      <SignUpPage/>
      <LandingPageFooter/>
      <MessageSchool/>
    </div>
  )
}

export default StaffSignUp