import React, { useState } from 'react'
import ClassMainDiv from '../../src/Components/StaffComponents/Class/ClassMainDiv'
import ClassOtherDiv from '../../src/Components/StaffComponents/Class/ClassOtherDiv'
import DashboardNav from '../../src/Components/StaffComponents/StaffDashboard/DashboardNav'
import fetchStaffInfo from '../../src/CustomHooks/StaffHooks/fetchStaffInfo'
import Loader from '../../src/Loader'



const StudentClass = () => {
  const [staffInfo, fetching, staffNotifications, notificationFetchingState] = fetchStaffInfo();
  const [startClass, setstartClass] = useState(false);
  const [endClass, setendClass] = useState(false);

  return (
    <>
      <div className="flex w-screen flex-col md:flex-row bg-slate-300 relative ring-0">
        <DashboardNav />
        {fetching ? <Loader /> : <>
          <ClassMainDiv endClass={endClass} setendClass={setendClass} startClass={startClass} />
          <ClassOtherDiv setstartClass={setstartClass} setendClass={setendClass} />
        </>}


      </div>
    </>
  )
}

export default StudentClass