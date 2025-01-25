import React , {useState, useEffect}from 'react'
import DashboardNav from '../../src/Components/StaffComponents/StaffDashboard/DashboardNav'
import SettingMainDiv from '../../src/Components/StaffComponents/StaffSetting/SettingMainDiv'
import SettingOtherDiv from '../../src/Components/StaffComponents/StaffSetting/SettingOtherDiv'
import fetchStaffInfo from '../../src/CustomHooks/StaffHooks/fetchStaffInfo'
import Loader from '../../src/Loader'

const StaffSetting = () => {
  const [staffInfo, fetching, staffNotifications, notificationFetchingState] = fetchStaffInfo();

  const [displaying, setdisplaying] = useState('allSettings')
  const viewSetting=(response)=>{
    setdisplaying(response)
  }
  
  return (
    <>
        <div className='StaffSetting containerAll overflow-y-hidden'>
            <DashboardNav/>
            {fetching && <Loader/>}
            {fetching==false && <>
              <SettingMainDiv disp={displaying}/>
              <SettingOtherDiv func={viewSetting}/>
            </>}
        </div>
    </>
  )
}

export default StaffSetting