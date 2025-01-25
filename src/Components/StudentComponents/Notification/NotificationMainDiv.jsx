import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Notification from './Notification'


const NotificationMainDiv = ({notifications}) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [staffInfo, setstaffInfo] = useState(useSelector((state)=>state.staffInformation.staffInformation))
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  
  console.log(notifications)
  return (
    <>
        <div className='DashboardMainDiv order-5 md:order-none mt-16 md:mt-0 h-screen basis-full md:basis-7/12 p-5 overflow-y-auto'>
            {notifications?.length> 0? notifications.map((notification)=>(
                <Notification id={notification.senderId} name={notification.name} message={notification.message} type={notification.type || 'submit'}/>
            )): <Notification name='Empty Notification' message='You do not have any notification at the moment' type='empty'/>}
        </div>
    </>
  )
}

export default NotificationMainDiv