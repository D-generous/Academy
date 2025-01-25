import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Announcement from './Announcement'
import SubjectDiv from './SubjectDiv'
import { useDispatch, useSelector } from 'react-redux'
import fetchStudentInfo from '../../../CustomHooks/StudentHooks/fetchStudentInfo'
import { subjects } from '../../../../constants/subjects'
import FetchNoticesAndNews from '../../../CustomHooks/FetchNoticesAndNews'
import Notice from "./Notice";
import News from "./News";
import { CircularProgress, Dialog } from '@mui/material'
import { backendurl } from '../../../../constants/backendurl'
import Tasks from './Tasks'
import axios from 'axios'
import DisplayToast from '../../../CustomHooks/DisplayToast'
import { fetchStudent } from '../../../redux/studentInformation'

const StudentMainDiv = ({ welcomeNote }) => {
    const [studentInfo, fetching, termDetails] = fetchStudentInfo();
    const [noticesAndNews] = FetchNoticesAndNews();
    const [addingTask, setaddingTask] = useState(false);
    const dispatch = useDispatch();

    let studentSubject = [];
    let extractedNewAndNotices;
    if (!fetching) {
        studentInfo ? studentInfo.subjects.map((subject, index) => {
            if (index <= 5) {
                studentSubject.push(subject.subjectIndex)
            } else {
                return
            }
        }) : ''
        extractedNewAndNotices = noticesAndNews ? noticesAndNews.filter((annouce, index) => index <= 5) : ''
    }
    let term = [
        '1st Term',
        '2nd Term',
        '3rd Term'
    ]

    const closeAddToTask = () => {
        setOpen(false);
    }
    const openAddToTask = () => {
        setOpen(true);
    }

    const [open, setOpen] = useState(false);

    const addToTasks = () => {
        setaddingTask(true)
        let taskDetails = {
            taskDate: taskTime.value.split('T')[0],
            taskTime: taskTime.value.split('T')[1],
            taskBody: taskBody.value,
            class: Number(studentInfo.class),
            email: studentInfo.email,
            token: localStorage.getItem('studentToken')
        }
        let endpoint = `${backendurl}student/addtotask`
        axios.post(endpoint, taskDetails)
            .then((res) => {
                setaddingTask(false)
                closeAddToTask()
                DisplayToast('success', 'Task Added Successfully!');
                dispatch(fetchStudent(res.data))
                taskBody.value = ''
                taskTime.value = ''
            })
            .catch((error) => {
                setaddingTask(false)
                closeAddToTask()
                DisplayToast('error', 'Error Saving Your Task');
            })
    }

    return (
        <>
            <div className="basis-10/12 p-4">
                <div className="w-3/4 mx-auto bg-white shadow-lg rounded-lg p-4 flex flex-col md:flex-row justify-between">
                    <div>
                        <p className="text-xl font-semibold mb-4">Hi {studentInfo.firstName} {welcomeNote}</p>
                        <p className="mb-4">Matric Number: {studentInfo.entranceTest.score !== '' && studentInfo.entranceTest.score !== undefined ? studentInfo.matricNumber : (<span className='text-red-600'>You need to take your entrance test</span>)}</p>
                        {studentInfo.entranceTest.score === '' || studentInfo.entranceTest.score === undefined ?
                            <Link to='/entrance_test' className="w-full md:w-3/6 bg-yellow-500 text-white px-4 py-2 rounded-md mr-2 mb-2 hover:bg-yellow-600">Take Entrance Test</Link>
                            : ''}
                        <Link to='/student/profile' className=" w-24 bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600">Profile</Link>
                        <p>Term: {term[termDetails.term - 1]} | Session Year: {termDetails.year}</p>
                    </div>
                    <img src={studentInfo.pictureUrl} alt="Student Image" className='float-right h-32 w-32 rounded-full' />
                </div>
                <div className="w-full p-2 mt-4">
                    <h4 className="text-3xl font-semibold ms-4 mb-2">Subjects <Link className="float-right me-4 text-blue-500" to='/student/subjects'>See All</Link></h4>
                    <div className="flex flex-wrap items-center justify-start subjectsDiv">
                        {studentSubject ? studentSubject.map((subject, index) => (
                            <SubjectDiv key={index} subject={subjects[subject]} />
                        )) : ''}
                    </div>
                </div>
                <div className='inline-block topSpace taskDivv relative'>
                    <h4 className="text-3xl font-semibold ms-4 mb-2">Tasks</h4>
                    {studentInfo.tasks ? (
                        studentInfo.tasks.map((task, index) => <Tasks date={task.taskDate} index={index} task={task.taskBody} wholeTask={task} />)
                    ) : (
                        <Tasks date='07/02/2005' task='No Task Added Yet' empty={true} />
                    )}
                    <button className='p-2 bg-yellow-300 block mx-auto mt-2' onClick={openAddToTask}>
                        <i className='fa fa-plus'></i>
                        <span>Add New</span>
                    </button>
                </div>
                <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center popup' id='popup'>

                </div>
                <Dialog
                    open={open}
                    onClose={closeAddToTask}
                    PaperProps={{
                        component: 'form',
                        onSubmit: (event) => {
                            event.preventDefault();
                            closeAddToTask();
                        },
                    }}
                >
                    <div className='bg-white p-4 rounded-lg w-96'>
                        <button className='btn-close right-0 top-0 mt-2 mr-2' onClick={closeAddToTask}></button>
                        <textarea name='taskBody' id='taskBody' required className='w-full mb-4 h-32 p-2 border rounded' placeholder='Add Task ...'></textarea>
                        <input type='datetime-local' required className='w-full mb-4 p-2 border rounded' id='taskTime' />
                        <button
                            type='button'
                            disabled={addingTask ? true : false}
                            id='button1'
                            onClick={addToTasks}
                            className={`w-full p-2 rounded bg-blue-500 text-white ${addingTask ? 'cursor-not-allowed' : 'hover:bg-blue-600'}`}
                        >
                            {addingTask ? <div className='flex items-center justify-center flex-row'>
                                <CircularProgress color='inherit' size={30} />
                                <span>Adding</span>
                            </div> : 'Add Task'}
                        </button>
                    </div>
                </Dialog>
                <div className="announcementDiv mt-4">
                    <h3 className="text-xl font-semibold mb-2">Notices And News</h3>
                    {!fetching ? extractedNewAndNotices.length > 0 ? extractedNewAndNotices.map((value, index) => (
                        value.type == 'news' ? <News key={index} data={value} /> : <Notice key={index} data={value} />
                    )) : (<News data={{ head: 'Empty', type: 'blog', body: 'No News Or Notice Here Yet' }} />) : ''}
                </div>
            </div>
        </>

    )
}

export default StudentMainDiv