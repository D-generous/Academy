import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
// import { fetchStaff, fetchClassStudents, setFetching } from '../../redux/staffInformation'
import DashboardNav from '../../src/Components/StaffComponents/StaffDashboard/DashboardNav'
import StudentMainDIv from '../../src/Components/StaffComponents/Student/StudentMainDIv'
import StudentOtherDiv from '../../src/Components/StaffComponents/Student/StudentOtherDiv'
import { useParams } from 'react-router-dom'
import Loader from '../../src/Loader'
import fetchStaffInfo from '../../src/CustomHooks/StaffHooks/fetchStaffInfo'
import fetchSubjectStudents from '../../src/CustomHooks/StaffHooks/fetchSubjectStudents'
import { backendurl } from '../../constants/backendurl'



const Student = () => {
  const [staffInfo, fetching, staffNotifications, notificationFetchingState] = fetchStaffInfo();
  const [category, setcategory] = useState(null)
  const [mainindex, setmainindex] = useState(staffInfo?.class)
  const [studentIndex, setStudentIndex] = useState(0);
  const [studentEmail, setStudentEmail] = useState(null);
  const [partnerName, setpartnerName] = useState('')
  const dispatch = useDispatch()
  let paramsValue = useParams();
  const [classStudents] = fetchSubjectStudents();
  // let classStudents = useSelector((state)=>state.staffInformation.classStudents)
  const setViewingMessage =(cat, index, email)=>{    
    setcategory(cat);
    setStudentIndex(index);
    setStudentEmail(email)
  }

  useEffect(() => {
    // validateStaff()
    // console.log({class: Number(localStorage.getItem('staffclass')), subjectIndex: staffInfo.subjectIndex})
    setDefault()
    // if (classStudents.length==0 && Object.keys(staffInfo).length >= 1 && staffInfo.constructor === Object) {
      
    // }
  }, [staffInfo])
  const setPartnerName =(value)=>{
    setpartnerName(value);
  }

  const setDefault=()=>{
    if(paramsValue.email && Object.keys(staffInfo).length > 0 && staffInfo.constructor === Object){
      setcategory(0);
      setmainindex(staffInfo.class);
      setStudentIndex(paramsValue.email);
      console.log(classStudents.find((student, index)=>student.email==paramsValue.email).firstName)
      setpartnerName(classStudents.find((student, index)=>student.email==paramsValue.email).firstName)
    }
  }
  return (
    <>
        <div className=' relative flex w-screen h-screen flex-col md:flex-row bg-slate-300 ring-0'>
            <DashboardNav/>
            {fetching && <Loader/>}
            {fetching==false && <>
              <StudentMainDIv category={category} studentIndex={studentIndex} studentEmail={studentEmail} partnerName={partnerName} />
              <StudentOtherDiv func={setViewingMessage} func2={setPartnerName}/>
            </>}
        </div>
    </>
  )
}

export default Student