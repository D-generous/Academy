import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import NotificationOtherSide from '../../src/Components/StudentComponents/Notification/NotificationOtherSide';
import fetchStudentInfo from '../../src/CustomHooks/StudentHooks/fetchStudentInfo';
import {shownStudentNotifications} from '../../src/redux/studentInformation';
import NavBar from '../../src/Components/StudentComponents/NavBar';
import NotificationMainDiv from '../../src/Components/StudentComponents/Notification/NotificationMainDiv';
import { backendurl } from '../../constants/backendurl';
import checkStudentFeeStatus from '../../src/CustomHooks/StudentHooks/checkStudentFeeStatus';



const StudentNotificationsPage = () => {
  document.querySelector('title').innerText = 'Notifications | Student'; 
  const [studentInfo, fetching] = fetchStudentInfo();
  const[studentNotifications, notificationFetchingState] = fetchStudentInfo();
  const [notificationType, setnotificationType] = useState('all')
  const [notifications, setnotifications] = useState([]);
  const dispatch = useDispatch();
  checkStudentFeeStatus();
  useEffect(() => {
    const performOnload = async()=>{
      dispatch(shownStudentNotifications(0));
      const endpoint = `${backendurl}student/read_notifications`;
      if(studentInfo){
        await axios.post(endpoint, {id: studentInfo._id})
      }
      if (notificationType=='all') {
        setnotifications(studentNotifications)
      } else if (notificationType=='messages') {
        const filteredNotifications = studentNotifications.filter(notification => notification.type == 'message');
        setnotifications(filteredNotifications);
      } else if (notificationType=='submits') {
        const filteredNotifications = studentNotifications.filter(notification => notification.type == 'submit');
        setnotifications(filteredNotifications);
      }
    }
    performOnload();
  }, [notificationType, studentNotifications])
  const setNotificationType =(type)=>{
    setnotificationType(type)
  }
  const searchNotification = (params)=>{
    if (params.trim().length>0) {
      const filtered = studentNotifications.filter(notification => notification?.message?.includes(params) || notification?.date?.includes(params) || notification?.name?.includes(params));
      setnotifications(filtered);
    } else {
      setNotificationType('all')
    }
  }
  return (
    <>
        <div id='pageContainer' className="grid h-screen md:flex md:flex-row bg-slate-300 relative ring-0">
            <NavBar/>
            {!notificationFetchingState && <>
                <NotificationMainDiv notifications={notifications} />
                <NotificationOtherSide setNotificationType={setNotificationType} searchNotification={searchNotification}/>
            </>}
        </div>
    </>
  )
}

export default StudentNotificationsPage