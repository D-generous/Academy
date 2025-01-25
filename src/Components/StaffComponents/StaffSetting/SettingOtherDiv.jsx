import React from 'react'

const SettingOtherDiv = ({func}) => {
  return (
    <>
        <div className='SettingOtherDiv otherDiv flex flex-col items-center space-x-2 space-y-2 '>
          <h5 onClick={()=>func('allSettings')} className=' text-center cursor-pointer'>General</h5>
          <h5 onClick={()=>func('profile')} className=' text-center cursor-pointer'>Edit Profile</h5>
          {/* <h5 onClick={()=>func('subject')} className=' text-center cursor-pointer'>Subjects</h5> */}
          <h5 className=' text-center cursor-pointer'>Calendar</h5>
          <h5 onClick={()=>func('social')} className=' text-center cursor-pointer'>Social Media</h5>
        </div>
    </>
    
  )
}

export default SettingOtherDiv