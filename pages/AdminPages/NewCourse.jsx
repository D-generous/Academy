import React from 'react'
import Navbar from '../../src/Components/AdminComponents/NavBar/NavBar'
import CourseForm from '../../src/Components/AdminComponents/Courses/CourseForm'
import FetchAdminInfo from '../../src/CustomHooks/AdminHooks/FetchAdminInfo';


const NewCourse = () => {
  const [adminInfo, fetching] = FetchAdminInfo(); 
  return (
    <>
        <Navbar/>
        <CourseForm/>
    </>
  )
}

export default NewCourse