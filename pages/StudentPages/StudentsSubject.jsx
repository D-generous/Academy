import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SubjectMainDiv from '../../src/Components/StudentComponents/Subject/SubjectMainDiv'
import SubjectSideDiv from '../../src/Components/StudentComponents/Subject/SubjectSideDiv'
import fetchStudentInfo from '../../src/CustomHooks/StudentHooks/fetchStudentInfo'
import { fetchAllStaffs, fetchStudent, setFetched } from '../../src/redux/studentInformation'
import NavBar from '../../src/Components/StudentComponents/NavBar'
import Loader from '../../src/Loader'
import { backendurl } from '../../constants/backendurl';
import checkStudentFeeStatus from '../../src/CustomHooks/StudentHooks/checkStudentFeeStatus'




const StudentsSubject = () => {
    document.querySelector("title").innerText = `Subjects`
    const [subjectDetails, setsubjectDetails ] = useState({subjectIndex: 0, index: 0})
    const dispatch = useDispatch();
    const toggleSideNav =()=>{
        document.getElementById('SubjectSideDiv').classList.toggle('SubjectSideDiv')
    }

    const setVieingSubject =(subjectDetails)=>{
      setsubjectDetails(subjectDetails)
    }

    const [studentInfo, fetching, termDetails] = fetchStudentInfo();  
    let allStaffs = useSelector((state)=>state.studentInformation.allStaffs);
    
    checkStudentFeeStatus();
    useEffect(() => {
      // fetchStudentInformation()
      // validateStudent()
    }, [])
    const validateStudent =()=>{
      let token = localStorage.token
      let validateEndpoint = `${backendurl}student/validatedashboard`
      axios.get(validateEndpoint, {headers : {
        "Authorization": `Bearer ${token}`,
        "Content-Toe": "application/json",
        "Accept": "application/json"
      }})
      .then((res)=>{
        console.log(res);
        if (res.status != 200) {
          navigate('/signin')
        }
      })
      .catch((error)=>{
        navigate('/signin')
        console.log(error);
      })
    }
    const fetchStudentInformation =()=>{
      if(Object.keys(studentInfo).length === 0 && studentInfo.constructor === Object){
        dispatch(setFetched(true))
        let endpoint = `${backendurl}student/dashboard`
        let details = {
          class: Number(localStorage.getItem('studentclass')),
          password: localStorage.getItem('studentpassword'),
          matricNumber: localStorage.getItem('studentmatric')
        }
        axios.post(endpoint, details)
        .then((res)=>{
          if (res.status==200) {
            dispatch(fetchStudent(res.data))
            dispatch(setFetched(false))
          } else{
            console.log('error');
          }
        })
      }
      if(allStaffs.length==0){
        let staffEndPoint = `${backendurl}student/allstaffs`
        dispatch(setFetched(true))
        axios.get(staffEndPoint)
        .then((res)=>{
          console.log(res);
          dispatch(fetchAllStaffs(res.data))
          dispatch(setFetched(false))
        })
        .catch((err)=>{
          console.log(err);
        })
      }
    }
  return (
    <>
        <div className='shrink-0 h-screen flex md:flex-row bg-slate-300 relative ring-0'>
            <NavBar/>
            {fetching && <Loader/>}
            {fetching==false && <div className='basis-10/12 flex shrink-0 overflow-x-auto'>
              <SubjectMainDiv subjectDetails={subjectDetails} func={toggleSideNav}/>
              <SubjectSideDiv toggleSideNav={toggleSideNav} func2={setVieingSubject}/>
            </div>}
        </div>
    </>
  )
}

export default StudentsSubject