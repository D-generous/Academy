import axios from 'axios'
import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchStudent } from '../../../redux/studentInformation'
// import { , setFetched } from '../../redux/studentInformation'
import { backendurl } from '../../../../constants/backendurl';




const Tasks = ({ task, date, empty, wholeTask, index }) => {
    let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
    let dispatch = useDispatch();
    const deleteTask = () => {
        let endpoint = `${backendurl}student/deletetask`
        axios.post(endpoint, { token: localStorage.getItem('studentToken'), wholeTask })
            .then((res) => {
                console.log(res.data);
                dispatch(fetchStudent(res.data))
            })
            .catch((error) => {
                console.log(error);
            })
    }
    const updateTask = () => {
        let endpoint = `${backendurl}student/updatetask`
        let taskDetails = {
            taskDate: 'qwertyu',
            taskTime: 'qwertyu',
            taskBody: 'taskBody.value',
            class: Number(studentInfo.class),
            email: studentInfo.email,
            index: index
        }
        console.log(taskDetails)
        axios.post(endpoint, taskDetails)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }
    return (
        <>
            <div className="w-full bg-gray-100 rounded-lg px-4 py-3 my-1">
                <p className="text-base font-semibold">Task: {task} {!empty && <span className="ml-3 text-sm">Date: {date}</span>}
                    {!empty && (
                        <>
                            {/* <button onClick={updateTask} className="ml-2 text-blue-500 hover:text-blue-700 focus:outline-none">
                                <i className="fa fa-edit"></i>
                            </button> */}
                            <button onClick={deleteTask} className="ml-2 text-red-500 hover:text-red-700 focus:outline-none">
                                <i className="fa fa-trash"></i>
                            </button>
                        </>
                    )}
                </p>
            </div>
        </>

    )
}

export default Tasks