import React from 'react'
import Subject from './Subject'
import { useSelector } from 'react-redux'
import { subjects } from '../../../../constants/subjects';


const SubjectSideDiv = ({ toggleSideNav, func2 }) => {
    let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
    let fetching = useSelector((state) => state.studentInformation.staffFetchingState);
    let studentSubject = [];
    if (!fetching) {
        studentInfo ? studentInfo.subjects.map((subject, index) => {
            studentSubject.push({ subject: Number(subject.subjectIndex), index: Number(index) })
        }) : ''
    }
    return (
        <div id='SubjectSideDiv' className='topSpace border basis-0 md:basis-4/12 overflow-y-auto'>
            <h3 className='text-center text-3xl font-bold my-5'>Subjects
                <span id='toggleIcon' onClick={toggleSideNav} className='float-right border-2 p-2 rounded-3'>
                    <i className='fa fa-close'></i>
                </span>
            </h3>
            <div className='w-full h-80vh SubjectSide'>
                {studentSubject.map((subject, index) => (
                    <Subject func={func2} subjectIndex={subject.subject} index={subject.index} name={subjects[subject.subject]} key={index} toggleSideNav={toggleSideNav} />
                ))}
            </div>
        </div>
    )
}

export default SubjectSideDiv