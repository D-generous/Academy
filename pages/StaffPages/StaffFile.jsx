import React, {useEffect, useState} from 'react'
import DashboardNav from '../../src/Components/StaffComponents/StaffDashboard/DashboardNav'
import { useDispatch } from 'react-redux'
import fetchStaffInfo from '../../src/CustomHooks/StaffHooks/fetchStaffInfo'
import FileMainDashboard from '../../src/Components/StaffComponents/StaffFile/FileMainDashboard'
import FileOtherDiv from '../../src/Components/StaffComponents/StaffFile/FileOtherDiv'


const StaffFile = () => {
  let [staffInfo, fetching, staffNot, notificationFetchingState] = fetchStaffInfo();
  
  
  return (
    <>
        <div className='StaffFile containerAll'>
            <DashboardNav/>
            <FileMainDashboard/>
            <FileOtherDiv/>
        </div>
    </>
  )
}

export default StaffFile