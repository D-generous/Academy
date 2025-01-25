import React, { useEffect, useState, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import Loader from '../../src/Components/StudentComponents/Loader'
import { fetchStudent, setFetched } from '../../src/redux/studentInformation'
import DisplayToast from '../../src/CustomHooks/DisplayToast'
import StudentMainDiv from '../../src/Components/StudentComponents/Dashboard/StudentMainDiv'
import NavBar from '../../src/Components/StudentComponents/NavBar'
import Tasks from '../../src/Components/StudentComponents/Dashboard/Tasks'
import fetchStudentInfo from '../../src/CustomHooks/StudentHooks/fetchStudentInfo'
import checkStudentFeeStatus from '../../src/CustomHooks/StudentHooks/checkStudentFeeStatus'
import FetchNoticesAndNews from '../../src/CustomHooks/FetchNoticesAndNews'
import { backendurl } from '../../constants/backendurl';




const StudentDashboard = () => {
    document.querySelector('title').innerText = 'Dashboard | Student'; 
    const [studentInfo, fetching, termDetails] = fetchStudentInfo();  
    const [noticesAndNews] = FetchNoticesAndNews();  
    let dispatch = useDispatch();
    const navigate = useNavigate();
    document.querySelector("title").innerText = `Dashboard`;
    let values = useParams()
    let socket = useSelector((state)=>state.socketIO.socket);
    checkStudentFeeStatus();

    
    const showLink =()=>{
      console.log(`${studentInfo.pictureUrl.split('upload/')[0]}upload/r_max,q_50/${studentInfo.pictureUrl.split('upload/')[1]}`)
    }

  return (
    <>
      <div className='overflow-y-auto flex md:flex allWrap border-2 md:h-screen'>
        <NavBar />
        {fetching && <Loader />}
        {!fetching && (
          <StudentMainDiv />
        )}
      </div>
    </>
  )
}

export default StudentDashboard