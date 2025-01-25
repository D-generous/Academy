import React, { useEffect, useState } from 'react'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


const CalendarComp = () => {
    
  return (
    <>
        <div className=' order-3 md:order-none basis-full md:basis-4/6'>
            <Calendar className='mx-auto'/>
        </div>
    </>
  )
}

export default CalendarComp