import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllStudents, setAllStaffs, setFetchingState } from '../../redux/adminInformation';
import axios from 'axios';
import { backendurl } from '../../../constants/backendurl';



const FetchAllStudentsAndStaffs = () => {
  const allStudents = useSelector((state) => state.adminInformation.allStudents);
  const allStaffs = useSelector((state) => state.adminInformation.allStaffs);
  const adminInfo = useSelector((state) => state.adminInformation.adminInformation);
  const dispatch = useDispatch();
  let localadminInfo = {};

  useEffect(() => {
    async function fetchData() {
      try {
        if (allStudents.length == 0 && Object.keys(adminInfo).length != 0 && adminInfo.constructor === Object) {
          dispatch(setFetchingState(true));
          const endpoint = `${backendurl}admin/all_students`;
          const res = await axios.get(endpoint);
          
          if (res.status == 200) {
            dispatch(setAllStudents(res.data));
            localadminInfo = res.data;
            dispatch(setFetchingState(false));
          } else {
            connsole.log(res)
          }
        }
      } catch (error) {
        console.log(error);
      }

      try {
        if (allStaffs.length == 0) {
          const endpoint = `${backendurl}admin/all_staffs`;
          const res = await axios.get(endpoint);
          
          if (res.status == 200) {
            dispatch(setAllStaffs(res.data));
            localadminInfo = res.data;
            dispatch(setFetchingState(false));
          } else {
            console.log(res)
          }
        }
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, [adminInfo]);

  return [allStudents, allStaffs];
};

export default FetchAllStudentsAndStaffs;

