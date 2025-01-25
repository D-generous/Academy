import React from 'react'

const NotificationOtherSide = ({setNotificationType, searchNotification}) => {
  return (
    <>
        <div className="otherDiv order-3 md:order-none basis-full md:basis-4/12 md:h-screen block bg-white overflow-y-auto mt-16 md:mt-0 p-5">
          <div className='flex w-full justify-center items-center space-x-2 mt-2'>
              <button onClick={()=>setNotificationType('all')} className=' bg-blue-600 hover:bg-blue-500 rounded-md p-2'>All</button>
              <button onClick={()=>setNotificationType('messages')} className=' bg-blue-600 hover:bg-blue-500 rounded-md p-2'>Message</button>
              <button onClick={()=>setNotificationType('submits')} className=' bg-blue-600 hover:bg-blue-500 rounded-md p-2'>Submits</button>
          </div>
          <input type="search" onKeyUp={(e)=>searchNotification(e.target.value)} className='w-full my-3 border-1 border-slate-400 focus:border-0 focus:outline-2 focus:outline-blue-600 rounded-lg h-12 p-2 ' />
        </div>
    </>
  )
}

export default NotificationOtherSide