import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEntranceParticipants, setFetchingState } from '../../redux/adminInformation';
import axios from 'axios';
import { backendurl } from '../../../constants/backendurl';



const FetchEntranceYearParticipants = (year) => {
  const entranceParticipants = useSelector((state) => state.adminInformation.entranceParticipants);
  const adminInfo = useSelector((state) => state.adminInformation.adminInformation);
  
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        if (!entranceParticipants[year] && Object.keys(adminInfo).length != 0 && adminInfo.constructor === Object) {
          dispatch(setFetchingState(true));
          const endpoint = `${backendurl}admin/get_entrance_year_participants`;
          const res = await axios.post(endpoint, {year});
          
          if (res.status === 200) {
            dispatch(setEntranceParticipants({year,participants: res.data}));
            dispatch(setFetchingState(false));
          } else if (res.status !== 200) {
            
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [adminInfo, year]);

  return [entranceParticipants];
};

export default FetchEntranceYearParticipants;

