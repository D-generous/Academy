import axios from 'axios';
import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import NotificationOtherSide from '../../src/Components/StaffComponents/StaffNotification/NotificationOtherDiv';
// import fetchStaffInfo from '../src/CustomHooks/fetchStaffInfo'
import fetchStaffInfo from '../../src/CustomHooks/StaffHooks/fetchStaffInfo';
import {shownStaffNotifications} from '../../src/redux/staffInformation';
import DashboardNav from '../../src/Components/StaffComponents/StaffDashboard/DashboardNav';
import NotificationMainDiv from '../../src/Components/StaffComponents/StaffNotification/NotificationMainDiv';
import { backendurl } from '../../constants/backendurl';

const StaffNotification = () => {
  const [staffInfo, fetching, staffNotifications, notificationFetchingState] = fetchStaffInfo();
  const [notificationType, setnotificationType] = useState('all')
  const [notifications, setnotifications] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const performOnload = async()=>{
      dispatch(shownStaffNotifications(0));
      const endpoint = `${backendurl}staff/read_notifications`;
      if(staffInfo){
        let readNotification = await axios.post(endpoint, {id: staffInfo._id})
      }
      if (notificationType=='all') {
        setnotifications(staffNotifications)
      } else if (notificationType=='messages') {
        const filteredNotifications = staffNotifications.filter(notification => notification.type == 'message');
        setnotifications(filteredNotifications);
      } else if (notificationType=='submits') {
        const filteredNotifications = staffNotifications.filter(notification => notification.type == 'submit');
        setnotifications(filteredNotifications);
      }
    }
    performOnload();
  }, [notificationType, staffNotifications])
  const setNotificationType =(type)=>{
    setnotificationType(type)
  }
  const searchNotification = (params)=>{
    if (params.trim().length>0) {
      const filtered = staffNotifications.filter(notification => notification?.message?.includes(params) || notification?.date?.includes(params) || notification?.name?.includes(params));
      setnotifications(filtered);
    } else {
      setNotificationType('all')
    }
  }
  return (
    <>
        <div id='pageContainer' className="grid w-screen md:flex md:flex-row bg-slate-300 relative ring-0">
            <DashboardNav/>
            {!notificationFetchingState && <>
                <NotificationMainDiv notifications={notifications} />
                <NotificationOtherSide setNotificationType={setNotificationType} searchNotification={searchNotification}/>
            </>}
        </div>
    </>
  )
}

export default StaffNotification