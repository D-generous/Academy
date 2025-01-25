import React , {useEffect, useState} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import DashboardOtherSide from '../../src/Components/StaffComponents/StaffDashboard/DashboardOtherSide'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import DashboardMainDiv from '../../src/Components/StaffComponents/StaffDashboard/DashboardMainDiv'
import DashboardNav from '../../src/Components/StaffComponents/StaffDashboard/DashboardNav'
import Loader from '../../src/Loader'
import fetchStaffInfo from '../../src/CustomHooks/StaffHooks/fetchStaffInfo'
import fetchSubjectStudents from '../../src/CustomHooks/StaffHooks/fetchSubjectStudents'


const StaffDashboard = () => {
  const [staffInfo, fetching, staffNotifications, notificationFetchingState] = fetchStaffInfo();
  const [classStudents] = fetchSubjectStudents();

  // https://res.cloudinary.com/dc9o9pwld/image/upload/q_50/cld-sample.jpg (quality)
  // https: r_max (rouded)

  let values = useParams()
  return (
    <>
        <div className="flex w-screen flex-col md:flex-row bg-slate-300 relative ring-0">
            <DashboardNav/>
            {fetching && <Loader/>}
            {!fetching && <>
              <DashboardMainDiv/>
              <DashboardOtherSide/>
            </>}
        </div>
    </>
  )
}

export default StaffDashboard