import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStudentNotifications, setNotificationFetching } from '../../redux/studentInformation';
import axios from 'axios';
import { backendurl } from '../../../constants/backendurl';


const fetchStudentNotificationsCompo = () => {
  const studentInfo = useSelector((state) => state.studentInformation.studentInformation);
  const socket = useSelector((state) => state.socketIO.socket);
  const studentNotifications = useSelector((state) => state.studentInformation.studentNotifications);
  const notificationFetchingState = useSelector((state) => state.studentInformation.notificationFetchingState);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() { 
      try {
        if (Object.keys(studentInfo).length >= 1 && studentInfo.constructor === Object && Object.keys(studentNotifications).length === 0 && studentNotifications.constructor === Object) {
          const endpoint = `${backendurl}student/notifications`;
          const id = studentInfo._id;
          const res = await axios.post(endpoint, { id });

          if (res.status === 200) {
            dispatch(fetchStudentNotifications(res.data));
            dispatch(setNotificationFetching(false));
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [studentInfo]);

  return [studentNotifications, notificationFetchingState];
};

export default fetchStudentNotificationsCompo;
