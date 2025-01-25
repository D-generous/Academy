import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { fetchStudent, setFetched, fetchTermDetails } from '../../redux/studentInformation';
import { useNavigate } from 'react-router-dom';
import DisplayToast from '../DisplayToast';
import { backendurl } from '../../../constants/backendurl';


const fetchStudentInfo = () => {
  let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
  let fetching = useSelector((state) => state.studentInformation.studentFetchingState);
  let termDetails = useSelector((state) => state.studentInformation.termDetails);
  let socket = useSelector((state) => state.socketIO.socket);
  let dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      if (Object.keys(studentInfo).length === 0 && studentInfo.constructor === Object) {
        dispatch(setFetched(true))
        let endpoint = `${backendurl}student/dashboard`
        let token = localStorage.getItem('studentToken')
        axios.get(endpoint, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Toe": "application/json",
            "Accept": "application/json"
          }
        })
          .then((res) => {
            if (res.status == 200) {
              dispatch(fetchStudent(res.data))
              dispatch(setFetched(false))
              socket.emit('connectSocketId', res.data._id);
            }
          })
          .catch((err)=>{
            DisplayToast('error', 'Invalid Token')
            // navigate('/student/signin')
            console.log('error');
          })
      }

      let endpoint = `${backendurl}student/term_details`
      let getTermDetails = await axios.get(endpoint)
      if (getTermDetails.status == 200) {
        dispatch(fetchTermDetails(getTermDetails.data))
      }
    }
    fetchData()
  }, [socket])
  return [studentInfo, fetching, termDetails];
};

export default fetchStudentInfo;
