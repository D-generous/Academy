import React, { useState } from 'react'
import Staffs from './Staffs'
import Students from './Students'
import Admins from './Admins'

const OtherUsers = ({ toggleSideNav, func2 }) => {
    const [viewing, setviewing] = useState('students')
    return (
        <div id='OtherStudents' className='basis-full md:basis-4/12 showNone pt-24 md:p-2'>
            <label htmlFor="selectClass" className='text-center text-2xl my-5 font-bold p-2'>
                Select a class to view students
                <span id='toggleIco' onClick={toggleSideNav} className='float-right md:hidden border-2 p-2 rounded'>
                    <i className='fa fa-close'></i>
                </span>
            </label>
            <div className='grid grid-cols-3'>
                <button className={`${viewing == "students" ? "bg-blue-500" : "bg-slate-300"} border-l border-r p-2`} onClick={() => setviewing('students')}>Students</button>
                <button className={`${viewing == "staffs" ? "bg-blue-500" : "bg-slate-300"} border-l border-r p-2`} onClick={() => setviewing('staffs')}>Staffs</button>
                <button className={`${viewing == "admins" ? "bg-blue-500" : "bg-slate-300"} border-l border-r p-2`} onClick={() => setviewing('admins')}>Admin</button>
            </div>
            <div className='w-full OtherStudentsDiv py-3 px-2 h-80vh overflow-y-auto'>
                {viewing === 'students' ? <Students func={func2} /> : ''}
                {viewing === 'staffs' ? <Staffs func={func2} /> : ''}
                {viewing === 'admins' ? <Admins func={func2} /> : ''}
            </div>
        </div>
    )
}

export default OtherUsers