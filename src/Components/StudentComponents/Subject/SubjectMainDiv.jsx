import React, { useEffect, useState } from 'react'
import ReceiverMessage from '../Inbox/ReceiverMessage'
import SenderMessage from '../Inbox/SenderMessage'
import ResultsDisplay from './ResultsDisplay'
import SubjectPerformance from './SubjectPerformance'
import './style.scss'
import SubjectResource from './SubjectResource'
import PerformanceContainer from './PerformanceContainer';
import ResourcesContainer from './ResourcesContainer';
import { useSelector } from 'react-redux';
import fetchClassTeachersComp from '../../../CustomHooks/StudentHooks/fetchClassTeachers'
import { subjects } from '../../../../constants/subjects'


const SubjectMainDiv = ({ func, subjectDetails }) => {
    let allStaffs = useSelector((state) => state.studentInformation.allStaffs);
    useEffect(() => {
        document.getElementById("subjectContainer").scrollTop = document.getElementById("subjectContainer").scrollHeight
    }, [])

    const [viewing, setviewing] = useState('Performance');
    const [studentResources, setstudentResources] = useState([]);
    const [classTeachers] = fetchClassTeachersComp();
    
    const setresources = (resources) => {
        setstudentResources(resources)
    }
    return (
        <>
            <div className='SubjectMainDivs basis-full md:basis-8/12 p-20 pt-4 md:pt-20 md:mt-10 overflow-auto'>
                <h3 className='top-0 text-center text-2xl font-bold'>{subjects[Number(subjectDetails.subjectIndex)]}<span id='toggleIcon' onClick={func} className='float-right border-2 p-2 rounded-3'><i className='fa fa-bars'></i></span></h3>
                <div className='w-full grid grid-cols-2 px-4 mt-3'>
                    <button className={`${viewing == "Performance" ? "bg-blue-400" : "bg-slate-200"} cursor-pointer border-l border-r p-2`} onClick={() => setviewing('Performance')}>C/A & Performance</button>
                    <button className={`${viewing == "Resources" ? "bg-blue-400" : "bg-slate-200"} cursor-pointer border-l border-r p-2`} onClick={() => setviewing('Resources')}>Resources</button>
                </div>
                <div id='subjectContainer' className='subjectContainer w-full mt-3'>
                    {viewing === 'Performance' ? <PerformanceContainer subjectDetails={subjectDetails} /> : ''}
                    {viewing === 'Resources' ? <ResourcesContainer func={setresources} studentResources={studentResources} subjectDetails={subjectDetails} /> : ''}
                </div>
            </div>
        </>

    )
}

export default SubjectMainDiv