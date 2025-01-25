import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStaff, setFetching, fetchStaffNotifications, setNotificationFetching } from '../../redux/staffInformation';
import axios from 'axios';
import DisplayToast from '../DisplayToast';
import { useNavigate } from 'react-router-dom';
import { backendurl } from '../../../constants/backendurl';



const fetchStaffInfo = () => {
  const staffInfo = useSelector((state) => state.staffInformation.staffInformation);
  const fetching = useSelector((state) => state.staffInformation.staffFetchingState);
  const socket = useSelector((state) => state.socketIO.socket);
  const staffNotifications = useSelector((state) => state.staffInformation.staffNotifications);
  const notificationFetchingState = useSelector((state) => state.staffInformation.notificationFetchingState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let localStaffInfo = {};

  useEffect(() => {
    async function fetchData() {
      try {
        if (Object.keys(staffInfo).length === 0 && staffInfo.constructor === Object) {
          const endpoint = `${backendurl}staff/dashboard`;
          const token = localStorage.staffToken;
          const res = await axios.post(endpoint, { token });

          if (res.status === 200) {
            dispatch(fetchStaff(res.data));
            localStaffInfo = res.data;
            dispatch(setFetching(false));
            socket.emit('connectSocketId', res.data._id);
          } else if (res.response.status == 407) {
            DisplayToast('error', 'Invalid Or Expired Token')
            navigate('/staff/signin')
          }
        }
      } catch (error) {
        DisplayToast('error', 'Something went wrong, please try again later')
        navigate('/staff/signin')
        console.log(error);
      }

      try {
        if (Object.keys(staffNotifications).length === 0 && staffNotifications.constructor === Object) {
          const endpoint = `${backendurl}staff/notifications`;
          const id = staffInfo._id;
          const res = await axios.post(endpoint, { id });

          if (res.status === 200) {
            dispatch(fetchStaffNotifications(res.data));
            dispatch(setNotificationFetching(false));
            socket.emit('connectSocketId', res.data._id);
          } else if (res.status !== 200) {

          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [socket]);

  return [staffInfo, fetching, staffNotifications, notificationFetchingState];
};

export default fetchStaffInfo;


// import { useEffect, useState } from 'react';
// import {useSelector, useDispatch} from 'react-redux';
// import { fetchStaff, setFetching } from '../redux/staffInformation';
// import axios from 'axios'



// const fetchStaffInfo = () => {
//     let staffInfo = useSelector((state)=>state.staffInformation.staffInformation);
//     let fetching = useSelector((state)=>state.staffInformation.staffFetchingState);
//     let socket = useSelector((state)=>state.socketIO.socket);
//     let dispatch = useDispatch();

//     useEffect(()=>{
//         if (Object.keys(staffInfo).length === 0 && staffInfo.constructor === Object) {
//           let endpoint = `${backendurl}staff/dashboard`
//           let token = localStorage.token
//           axios.post(endpoint, {token})
//           .then((res)=>{
//               console.log(res)
//               if (res.status==200) {
//                 dispatch(fetchStaff(res.data))
//                 dispatch(setFetching(false))
//                 socket.emit('connectSocketId', res.data._id);
//               } else if(res.status != 200){
//                   state.staffInformation = 'error'
//               }
//           })
//           .catch((err)=>{
//               console.log(err);
//           })
//         }
//     }, [socket])
//   return [staffInfo, fetching];
// };

// export default fetchStaffInfo;
