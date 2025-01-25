import React, {useEffect, useState} from 'react'
import FetchNoticesAndNews from '../../../CustomHooks/FetchNoticesAndNews';
import Event from './Event'

const UpcomingEvents = () => {
  const [noticesAndNews] = FetchNoticesAndNews();
  const [miniNoticesAndNews, setminiNoticesAndNews] = useState([])
  useEffect(() => {
    setminiNoticesAndNews(noticesAndNews.slice(0, 4))
  }, [noticesAndNews])
  
  return (
    <>
        <div className=' order-1 md:order-none basis-full md:basis-2/6'>
            <h3 className='m-3'>Upcoming Event</h3>
            <div className='m-3'>
                {noticesAndNews?.length>=1?
                  noticesAndNews.map((item)=>(
                    <Event data={item}/>
                  ))
                :<Event data={{head: 'Empty', body: 'No News Or Notice Yet'}}/>}
            </div>
        </div>
    </>
    
  )
}

export default UpcomingEvents