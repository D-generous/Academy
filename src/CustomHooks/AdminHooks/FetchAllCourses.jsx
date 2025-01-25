import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllCourses, setFetchingState } from '../../redux/adminInformation';
import axios from 'axios';
import { backendurl } from '../../../constants/backendurl';



const FetchAllCourses = () => {
  const allCourses = useSelector((state) => state.adminInformation.allCourses);
  const adminInfo = useSelector((state) => state.adminInformation.adminInformation);
  const fetching = useSelector((state) => state.adminInformation.staffFetchingState);
  const socket = useSelector((state) => state.socketIO.socket);
  
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        if (allCourses.length === 0 && Object.keys(adminInfo).length != 0 && adminInfo.constructor === Object) {
          dispatch(setFetchingState(true));
          const endpoint = `${backendurl}admin/all_courses`;
          const res = await axios.get(endpoint);
          
          if (res.status === 200) {
            dispatch(setAllCourses(res.data));
            dispatch(setFetchingState(false));
          } else if (res.status !== 200) {
            
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [adminInfo]);

  return [allCourses];
};

export default FetchAllCourses;

