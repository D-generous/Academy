import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStaff, setFetching, fetchStaffNotifications, setNotificationFetching } from '../../redux/staffInformation';
import axios from 'axios';
import { backendurl } from '../../../constants/backendurl';



const fetchStaffNotificationsCompo = () => {
  const staffInfo = useSelector((state) => state.staffInformation.staffInformation);
  const fetching = useSelector((state) => state.staffInformation.staffFetchingState);
  const socket = useSelector((state) => state.socketIO.socket);
  const staffNotifications = useSelector((state) => state.staffInformation.staffNotifications);
  const notificationFetchingState = useSelector((state) => state.staffInformation.notificationFetchingState);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        if (Object.keys(staffInfo).length === 0 && staffInfo.constructor === Object) {
          const endpoint = `${backendurl}staff/dashboard'`;
          const token = localStorage.token;
          const res = await axios.post(endpoint, { token });

          if (res.status === 200) {
            dispatch(fetchStaff(res.data));
            dispatch(setFetching(false));
            socket.emit('connectSocketId', res.data._id);
          } else if (res.status !== 200) {
            
          }
        }
      } catch (error) {
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

export default fetchStaffNotificationsCompo;
