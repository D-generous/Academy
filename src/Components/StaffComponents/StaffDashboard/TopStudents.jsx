import React from 'react'
import TopStudentView from './TopStudentView'
import { useSelector } from 'react-redux'
import classes from '../../../Classes'


const TopStudents = () => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  return (
    <>
        <div className=' basis-full md:basis-2/6 flex flex-col p-3 space-y-2 bg-white rounded-md my-2'>
            <h3><span className="font-bold">Top Students</span> <span className=' float-right'>{classes[staffInfo.class]} Class</span></h3>
            <TopStudentView name='Lucas Jones' image='/teachers/gallary10.jpg'/>
            <TopStudentView name='Martins Sanya' image='/teachers/gallary8.jpg'/>
            {/* <TopStudentView/> */}
        </div>
    </>
  )
}

export default TopStudents