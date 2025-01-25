import React from 'react'
import FetchAdminInfo from '../../../CustomHooks/AdminHooks/FetchAdminInfo'


const Profile = () => {
  const [adminInfo, fetching] = FetchAdminInfo();

  return (
    <div className='p-5 mx-auto'>
        <img src='/school_logo.png' className='mx-auto h-32 md:h-40' alt="" />
        <h4 className='text-4xl text-center'>{`${adminInfo.firstName} ${adminInfo.lastName}`}</h4>
        <p className='text-center'>Authorization token: <h4 className='text-4xl inline'>{adminInfo.firstName}</h4></p>
    </div>
  )
}

export default Profile