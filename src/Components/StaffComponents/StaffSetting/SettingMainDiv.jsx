import React from 'react'
import ProfiileUpdate from './ProfiileUpdate'
import SocialMediaUpdate from './SocialMediaUpdate'
import SubjectSetting from './SubjectSetting'

const SettingMainDiv = ({disp}) => {
  return (
    <>
        <div className="SettingMainDiv middleDiv">
            {disp=='allSettings'?<><ProfiileUpdate/>
            <SocialMediaUpdate/>
            {/* <SubjectSetting/> */}
            </>: ''}
            {disp=='profile'?<ProfiileUpdate/>:''}
            {disp=='social'?<SocialMediaUpdate/>:''}
            {/* {disp=='subject'?<SubjectSetting/>:''} */}
        </div>
    </>
  )
}

export default SettingMainDiv