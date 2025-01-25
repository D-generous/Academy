import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchStaff, setFetching, fetchStaffNotifications, setNotificationFetching, fetchClassStudents } from '../../redux/staffInformation';
import axios from 'axios';
import { backendurl } from '../../../constants/backendurl';



const fetchSubjectStudents = () => {
  const staffInfo = useSelector((state) => state.staffInformation.staffInformation);
  const fetching = useSelector((state) => state.staffInformation.staffFetchingState);
  const socket = useSelector((state) => state.socketIO.socket);
  let classStudents = useSelector((state)=>state.staffInformation.classStudents)
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        if (classStudents.length == 0 && Object.keys(staffInfo).length >= 1 && staffInfo.constructor === Object) {
            let classStudentsEndpoint = `${backendurl}staff/fetchclassstudents`
            dispatch(setFetching(true))
            axios.post(classStudentsEndpoint, {class: Number(localStorage.getItem('staffclass')), staffIndex: Number(staffInfo.staffIndex)})
            .then((res)=>{
                if (res.status==200) {
                  dispatch(fetchClassStudents(res.data))
                  dispatch(setFetching(false))
                } else if(res.status != 200){
                    // state.staffInformation = 'error'
                }
            })
            .catch((err)=>{
                console.log(err);
            })
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [socket, staffInfo]);

  return [classStudents];
};

export default fetchSubjectStudents;
