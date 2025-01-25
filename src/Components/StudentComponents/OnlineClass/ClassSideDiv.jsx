import { useSelector, useDispatch } from 'react-redux'
import React, { useState } from 'react'
import { subjects } from '../../../../constants/subjects';

const ClassSideDiv = ({startClassFunction }) => {
    let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
    let allStaffs = useSelector((state) => state.studentInformation.allStaffs);
    let allStudents = useSelector((state) => state.studentInformation.allStudents);
    let fetching = useSelector((state) => state.studentInformation.staffFetchingState);
    const handleClick = (id) =>{
        let confirmMessage = confirm('Are you sure you want to join this class');
        if (confirmMessage) {
            startClassFunction(id)
        }
    }
    return (
        <>
            <div id='OtherStudents' className=' showNone pt-24 md:p-2'>
                <label htmlFor="selectClass" className='text-center text-light font-bold p-2'>
                    Select subject to join the class if available
                    <span id='toggleIco' onClick={()=>console.log('func')} className='float-right md:hidden border-2 p-2 rounded'>
                        <i className='fa fa-close'></i>
                    </span>
                </label>
                <div className='px-2 md:px-5'>
                    {studentInfo?.subjects.map((subject, index) => (
                        <button key={index} onClick={()=>handleClick(subject.subject)} className='block my-2 p-2 text-center bg-blue-300 w-full rounded-5' >{subjects[subject.subject]}</button>
                    ))}
                </div>
                <div className='w-full OtherStudentsDiv py-3 px-2 h-80vh overflow-y-auto'>
                    {/* {viewing === 'students' ? <Students func={()=>console.log('func2')} /> : ''}
                    {viewing === 'staffs' ? <Staffs func={()=>console.log('func2')} /> : ''} */}
                </div>
            </div>
        </>
    )
}

export default ClassSideDiv