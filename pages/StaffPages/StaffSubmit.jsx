import React , {useEffect, useState} from 'react'
import DashboardNav from '../../src/Components/StaffComponents/StaffDashboard/DashboardNav'
import SubmitMainDIv from '../../src/Components/StaffComponents/StaffSubmit/SubmitMainDIv'
import SubmitOtherDiv from '../../src/Components/StaffComponents/StaffSubmit/SubmitOtherDiv'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { fetchClassStudents, fetchStaff, setFetching } from '../../src/redux/staffInformation'
import Loader from '../../src/Loader'
import fetchStaffInfo from '../../src/CustomHooks/StaffHooks/fetchStaffInfo'


const StaffSubmit = () => {
  const [staffInfo, fetching, staffNotifications, notificationFetchingState] = fetchStaffInfo();
  // let classStudents = useSelector((state)=>state.staffInformation.classStudents)

  const [studentSubmit, setstudentSubmit] = useState({})
  const setViewingSubmit =(work)=>{
    setstudentSubmit(work)
  }
  return (
    <>
        <div className=' StaffSubmit containerAll h-screen'>
            <DashboardNav/>
            {fetching && <Loader/>}
            {fetching==false && <>
              <SubmitMainDIv studentSubmit={studentSubmit} />
              <SubmitOtherDiv func={setViewingSubmit}/>
            </>}
        </div>
    </>
  )
}

export default StaffSubmit