import React, { Component } from 'react'

const SettingsOtherDiv = ({func, func2}) => {
  return (
    <>
        <div id='SettingsOtherDiv' className='SettingsOtherDiv topSpace'>
          <p className='text-center'><span id='toggleIcon' onClick={func} className='float-end border-2 p-2 rounded-3'><i className='fas fa-close'></i></span></p>
          <h5 className='p-2 bg-light rounded-5' onClick={()=>func2('AllProfilesDiv')}>General</h5>
          <h5 className='p-2 bg-light rounded-5' onClick={()=>func2('StudentProfileUpdate')}>Edit Profile</h5>
          <h5 className='p-2 bg-light rounded-5' onClick={()=>func2('StudentSubject')}>Subjects</h5>
          <h5 className='p-2 bg-light rounded-5' onClick={()=>func2('StudentCalendar')}>Calendar</h5>
          <h5 className='p-2 bg-light rounded-5' onClick={()=>func2('StudentSocialMedia')}>Social Media</h5>
          <h5 className='p-2 bg-light rounded-5'>Sign Out</h5>
        </div>
    </>
  )
}

export default SettingsOtherDiv