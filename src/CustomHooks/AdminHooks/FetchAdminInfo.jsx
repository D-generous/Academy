import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAdminInfo, setFetchingState } from '../../redux/adminInformation';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DisplayToast from '../DisplayToast';
import { backendurl } from '../../../constants/backendurl';




const FetchAdminInfo = () => {
  const adminInfo = useSelector((state) => state.adminInformation.adminInformation);
  const fetching = useSelector((state) => state.adminInformation.staffFetchingState);
  const socket = useSelector((state) => state.socketIO.socket);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  let localadminInfo = {};

  useEffect(() => {
    async function fetchData() {
      try {
        if (Object.keys(adminInfo).length === 0 && adminInfo.constructor === Object) {
          dispatch(setFetchingState(true));
          const endpoint = `${backendurl}admin/dashboard`;
          const token = localStorage.adminToken;
          const res = await axios.post(endpoint, { token });
          
          if (res.status === 200) {
            dispatch(setAdminInfo(res.data));
            localadminInfo = res.data;
            dispatch(setFetchingState(false));
            socket.emit('connectSocketId', res.data._id);
          } else if (res.response.status == 407) {
            DisplayToast('error', 'Invalid or expired token')
            navigate('/admin/signin')
          }
        }
      } catch (error) {
          DisplayToast('error', 'Invalid or expired token')
          // navigate('/admin/signin')
          console.log(error);
      }

    //   try {
    //     if (Object.keys(staffNotifications).length === 0 && staffNotifications.constructor === Object) {
    //       const endpoint = `${backendurl}admin/notifications`;
    //       const id = localadminInfo._id;
    //       const res = await axios.post(endpoint, { id });

    //       if (res.status === 200) {
    //         dispatch(fetchStaffNotifications(res.data));
    //         dispatch(setNotificationFetching(false));
    //       } else if (res.status !== 200) {

    //       }
    //     }
    //   } catch (error) {
    //     console.log(error);
    //   }
    }

    fetchData();
  }, [socket]);

  return [adminInfo, fetching];
};

export default FetchAdminInfo;

