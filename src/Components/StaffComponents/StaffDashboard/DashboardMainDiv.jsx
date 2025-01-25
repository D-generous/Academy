import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import SubmittedTest from './SubmittedTest'
import TopStudents from './TopStudents'

const DashboardMainDiv = () => {
  // const [staffInfo, setstaffInfo] = useState(useSelector((state)=>state.staffInformation.staffInformation))
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation);

  const getTimeOfDay = () => {
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
  
    const morningStart = 5;
    const afternoonStart = 12;
    const nightStart = 18;
  
    if (currentHour >= morningStart && currentHour < afternoonStart) {
      return 'Morning';
    } else if (currentHour >= afternoonStart && currentHour < nightStart) {
      return 'Afternoon';
    } else {
      return 'Evening';
    }
  };
  
  // Example usage
  const timeOfDay = getTimeOfDay();
  
  return (
    <>
        <div className='DashboardMainDiv mt-16 md:mt-0 h-screen basis-full md:basis-7/12 px-5 overflow-y-auto'>
            <h1 className='font-bold m-3 text-center'>Good {timeOfDay}, {staffInfo.lastName}</h1>
            <div className='w-100 h-32 bg-blue-700 rounded-3xl mx-5 flex justify-center items-center text-white'>
                <h3 className=' text-center'>Your students are doing great, <span className='font-semibold'>60%</span> has complete their test</h3>
            </div>
            <SubmittedTest/>
            <div className='w-full flex flex-col md:flex-row space-x-3'>
                <TopStudents/>
                {/* <StaffGroup/> */}
            </div>
        </div>
    </>
  )
}

export default DashboardMainDiv