import React from 'react'
import Calendar from 'react-calendar'
import StaffCalendar from './StaffCalendar'
import StaffInformation from './StaffInformation'
import StaffTimeline from './StaffTimeline'
import 'react-calendar/dist/Calendar.css';

const DashboardOtherSide = () => {
  return (
    <>
        <div className="otherDiv basis-full md:basis-4/12 md:h-screen block bg-white overflow-y-auto mt-16 md:mt-0">
            <StaffInformation/>
            <hr className='my-2' />
            <div className="flex w-full items-center justify-center">
                <Calendar/>
            </div>
            {/* <StaffTimeline/> */}
        </div>
    </>
  )
}

export default DashboardOtherSide