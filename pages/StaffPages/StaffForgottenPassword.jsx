import React from 'react'
import { useLocation } from 'react-router-dom';
import LandingPageNav from '../../src/Components/LandingPageNav';
import SendPasswordLink from '../../src/Components/StaffComponents/StaffForgottenPassword/SendPasswordLink';
import SetNewPassword from '../../src/Components/StaffComponents/StaffForgottenPassword/SetNewPassword';

const StaffForgottenPassword = () => {
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
  return (
    <>
        <LandingPageNav/>
        <div className="h-screen flex justify-center items-center border border-solid border-3">
          {token == null || undefined ? <SendPasswordLink/> : <SetNewPassword token={token} />}
        </div>
    </>
  )
}

export default StaffForgottenPassword