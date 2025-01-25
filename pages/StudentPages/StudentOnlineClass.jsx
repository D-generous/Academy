import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import fetchStudentInfo from '../../src/CustomHooks/StudentHooks/fetchStudentInfo';
import NavBar from '../../src/Components/StudentComponents/NavBar';
import ClassMainDiv from '../../src/Components/StudentComponents/OnlineClass/ClassMainDiv';
import ClassSideDiv from '../../src/Components/StudentComponents/OnlineClass/ClassSideDiv';
import Loader from '../../src/Loader';
import checkStudentFeeStatus from '../../src/CustomHooks/StudentHooks/checkStudentFeeStatus';

const StudentOnlineClass = () => {
  document.querySelector('title').innerText = 'Online Class | Student'; 
  const [studentInfo, fetching, termDetails] = fetchStudentInfo();  
  const [notificationType, setnotificationType] = useState('all')
  const [notifications, setnotifications] = useState([]);
  const [startClass, setstartClass] = useState(false);
  const [classId, setclassId] = useState('');
  const dispatch = useDispatch();

  checkStudentFeeStatus();
  useEffect(()=>{
  }, [])


  const startClassFunction =(id)=>{
    setclassId(id);
    setstartClass(true);
  }
  
  return (
    <>
      <div id='pageContainer' className="h-screen flex md:flex-row bg-slate-300 relative ring-0">
        <NavBar />
        {fetching ? <Loader/> : <div className='basis-10/12 flex shrink-0 overflow-x-auto'>
          <ClassMainDiv startClass={startClass} classId={classId} setstartClass={setstartClass} />
          <ClassSideDiv startClassFunction={startClassFunction} />
        </div>}
      </div>
    </>
  )
}

export default StudentOnlineClass