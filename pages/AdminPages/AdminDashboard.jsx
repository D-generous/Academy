import React, { useState, useEffect } from 'react';
import EventAndCalendar from '../../src/Components/AdminComponents/Dashboard/EventAndCalendar';
import Profile from '../../src/Components/AdminComponents/Dashboard/Profile';
import Statistics from '../../src/Components/AdminComponents/Dashboard/Statistics';
import NavBar from '../../src/Components/AdminComponents/NavBar/NavBar';
import FetchAdminInfo from '../../src/CustomHooks/AdminHooks/FetchAdminInfo';
import FetchAllStudentsAndStaffs from '../../src/CustomHooks/AdminHooks/FetchAllStudentsAndStaffs';
import FetchNoticesAndNews from '../../src/CustomHooks/FetchNoticesAndNews';

function AdminDashboard() {
    const [adminInfo, fetching] = FetchAdminInfo(); 
    const [allStudents, allStaffs] = FetchAllStudentsAndStaffs();
    const [noticesAndNews] = FetchNoticesAndNews();

    return (
        <>
            <div className=''>
                <NavBar/>
                <div className=' grid grid-cols-1 md:flex md:pt-10'>
                    <div className='border-0 md:border-b-2 order-3 md:order-none basis-full md:basis-4/6'>
                        <Statistics/>
                        <EventAndCalendar/>
                    </div>
                    <div className=' order-1 md:order-none basis-full md:basis-2/6'>
                        <Profile/>
                    </div>
                </div>
                {/* <div className="bg-blue-500 p-4">
                    <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                    <div className="mt-4">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-2">Essential Information</h2>
                            <div>
                                <p>Total Students: {studentCount}</p>
                                <p>Total Staff: {staffCount}</p>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <h2 className="text-lg font-semibold mb-2">Quick Access</h2>
                            <ul>
                                <li>
                                    <a href="/students">View Students</a>
                                </li>
                                <li>
                                    <a href="/staff">View Staff</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> */}
            </div>
        </>
    );
}

export default AdminDashboard;
