import React from 'react'
import { useSelector } from 'react-redux'
import { subjects } from '../../../../constants/subjects'

const StaffInformation = () => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  return (
    <>
        <div className="w-full flex items-center space-x-3 relative">
            <img src={staffInfo?.pictureUrl} alt="" className=" h-20 w-20 rounded-full" />
            <div className=''>
                <h3>{staffInfo.lastName} {staffInfo.firstName}</h3>
                <h5 className='text-slate-500'>{staffInfo.subjectInfo.subjectName} TEACHER</h5>
                <span className=' absolute top-0 right-0 '><span className='text-green-500'>Online</span></span>
            </div>
        </div>
    </>
  )
}

export default StaffInformation