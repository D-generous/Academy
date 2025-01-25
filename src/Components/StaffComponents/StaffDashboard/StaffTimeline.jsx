import React from 'react'
import { useSelector } from 'react-redux'
import Timeline from './Timeline'

const StaffTimeline = () => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  let fetchingData = useSelector((state)=>state.staffInformation.staffFetchingState)
  return (
    <>
        <div className=' w-100 px-3'>
            <h3 className=' font-bold sticky top-0'>Timeline</h3>
            {!fetchingData?staffInfo.timelines?.lenght>0? staffInfo.timelines.map((timeline, index)=>(<>
              <Timeline/>
              <Timeline/>
              <Timeline/>
              <Timeline/>
            </>)): <Timeline/>:''}
        </div>
    </>
  )
}

export default StaffTimeline