import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import { fetchStudent, setFetched, fetchTermDetails, fetchClassTeachers } from '../../redux/studentInformation';
import { useNavigate } from 'react-router-dom';
import DisplayToast from '../DisplayToast';
import { backendurl } from '../../../constants/backendurl';


const fetchClassTeachersComp = () => {
  let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
  let classTeachers = useSelector((state) => state.studentInformation.classTeachers);


  useEffect(() => {
    async function fetchData() {
      if (Object.keys(studentInfo).length >= 1 && studentInfo.constructor === Object) {
        dispatch(setFetched(true))
        let endpoint = `${backendurl}student/class_teachers?studentClass=${studentInfo.class}`
        axios.get(endpoint)
          .then((res) => {
            if (res.status == 200) {
              dispatch(fetchClassTeachers(res.data))
              dispatch(setFetched(false))
            }
          })
      }

    }
    fetchData()
  }, [studentInfo])
  return [classTeachers];
};

export default fetchClassTeachersComp;
