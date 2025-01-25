import React from 'react'
import DashboardNav from '../StaffDashboard/DashboardNav'
import ClassMainDiv from './ClassMainDiv'



const JoinedStudent = () => {
  return (
    <>
       <div className=' w-16 md:w-44  h-full relative rounded-md overflow-hidden border-2 border-green-300 shrink-0'>
            <img src='/vite.svg' className='w-full h-full'/>
            <p className='absolute top-0 bg-white w-full text-center'>Adegbite Joshua <i className='fa fa-trash'></i></p>
       </div>
    </>
  )
}

export default JoinedStudent