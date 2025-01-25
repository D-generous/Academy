import React from 'react'
import LandingPageNav from '../../src/Components/LandingPageNav'
import MessageSchool from '../../src/Components/MessageSchool'
import SignInPage from '../../src/Components/StaffComponents/StaffLogins/SignInPage'
import LandingPageFooter from '../../src/Components/LandingPages/Footer'


const StaffLogin = () => {
  return (
    <>
        <div className='w-100'>
          <LandingPageNav/>
          <SignInPage/>
          <LandingPageFooter/>
          <MessageSchool/>
        </div>
    </>
  )
}

export default StaffLogin