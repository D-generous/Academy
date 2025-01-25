import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const NavBar = () => {
    const navigate = useNavigate();
    const openNavPop = () => {
        document.getElementById('mySidenav').classList.toggle('responsive')
    }

    const signOut = () => {
        navigate('/student/signin')
        localStorage.removeItem('studentToken')
    }
    return (
        <div id="mySidenav" className="basis-2/12 z-50 sticky top-0 bg-blue-600 text-center flex flex-col items-center justify-center px-5">
            <img src="/school_logo.png" className='h-16 w-16 mr-2' alt="" />
            <h3 className='text-white font-semibold text-xl'>HOPE Academy</h3>
            <NavLink className={({ isActive }) => isActive ? 'border-b-4 font-bold text-white' : 'text-white'} to='/student/dashboard'><span className='flex items-center'><i className='hidden fas fa-home mr-2'></i>Dashboard</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'border-b-4 font-bold text-white' : 'text-white'} to='/student/inbox'><span className='flex items-center'><i className='hidden fas fa-inbox mr-2'></i>Inbox</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'border-b-4 font-bold text-white' : 'text-white'} to='/student/subjects'><span className='flex items-center'><i className='hidden fas fa-book mr-2'></i>Subjects</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'border-b-4 font-bold text-white' : 'text-white'} to='/student/class'><span className='flex items-center'><i className='hidden fas fa-book mr-2'></i>Class</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'border-b-4 font-bold text-white' : 'text-white'} to='/student/results'><span className='flex items-center'><i className='hidden fas fa-bell mr-2'></i>Results</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'border-b-4 font-bold text-white' : 'text-white'} to='/student/notifications'><span className='flex items-center'><i className='hidden fas fa-calendar mr-2'></i>Notifications</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'border-b-4 font-bold text-white' : 'text-white'} to='/student/feepayment'><span className='flex items-center'><i className='hidden fas fa-dollar-sign mr-2'></i>Payments</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? 'border-b-4 font-bold text-white' : 'text-white'} to='/student/profile'><span className='flex items-center'><i className='hidden fas fa-cog mr-2'></i>Profile</span></NavLink>
            <button onClick={signOut}><span className='flex items-center bg-red-500 p-2 rounded-md'><i className='hidden fas fa-sign-out-alt mr-2'></i>Sign Out</span></button>
            <span id='openPop' className='p-2 rounded-md border-2 border-white md:hidden' onClick={openNavPop}>
                <i className='fa fa-bars text-white'></i>
            </span>
        </div>
    )
}

export default NavBar