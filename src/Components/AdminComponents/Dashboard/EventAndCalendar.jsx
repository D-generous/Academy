import React from 'react'
import CalendarComp from './Calendar'
import UpcomingEvents from './UpcomingEvents'

const EventAndCalendar = () => {
  return (
    <div className='grid grid-cols-1 md:flex gap-2 my-5 pt-10 p-5'>
        <UpcomingEvents/>
        <CalendarComp/>
    </div>
  )
}

export default EventAndCalendar