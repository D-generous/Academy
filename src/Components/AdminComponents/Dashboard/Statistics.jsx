import React, { useEffect, useState } from 'react'
import Stat from './Stat'
import { GiTeacher } from 'react-icons/gi';
import { IoIosPeople } from 'react-icons/io';
import { PiStudentDuotone, PiBooksLight } from 'react-icons/pi';
import FetchAllStudentsAndStaffs from '../../../CustomHooks/AdminHooks/FetchAllStudentsAndStaffs';

const Statistics = () => {
  const [allStudents, allStaffs] = FetchAllStudentsAndStaffs();
  const [allStudentsNumber, setallStudentsNumber] = useState(0)
  const [allStaffsNumber, setallStaffsNumber] = useState(0)

  useEffect(() => {
    let localAllStudentsNumber = 0;
    let localAllStaffsNumber = 0;
    allStudents.map((students)=>{
      localAllStudentsNumber = localAllStudentsNumber + Number(students.length)
    })
    setallStudentsNumber(localAllStudentsNumber)
    allStaffs.map((staffs)=>{
      localAllStaffsNumber = localAllStaffsNumber + Number(staffs.length)
    })
    setallStaffsNumber(localAllStaffsNumber)
  }, [allStudents, allStaffs])
  


  return (
    <div className='flex flex-wrap flex-row gap-5 my-2 justify-center mx-auto'>
        <Stat name='Classes' amount='12' icon={<IoIosPeople  size={30} color="#1DA1F2"/>}/>
        <Stat name='Courses' amount='460' icon={<PiBooksLight  size={30} color="#1DA1F2"/>}/>
        <Stat name='Teachers' amount={allStaffsNumber} icon={<GiTeacher  size={30} color="#1DA1F2"/>}/>
        <Stat name='Students' amount={allStudentsNumber} icon={<PiStudentDuotone  size={30} color="#1DA1F2"/>}/>
        {/* <Stat name='' amount='160' icon='fa-flag'/> */}
    </div>
  )
}

export default Statistics