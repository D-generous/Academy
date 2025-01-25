import React from 'react'
import ErrorMainDiv from '../../src/Components/ErrorPage/ErrorMainDiv'
import NavBar from '../../src/Components/StudentComponents/NavBar'


const StudentErrorPage = () => {
    document.querySelector("title").innerText = `404 - Error Page`
  return (
    <>
        <div id='pageContainer' className="grid h-screen md:flex md:flex-row bg-slate-300 relative ring-0">
          <NavBar/>
          <ErrorMainDiv/>
        </div>
    </>
  )
}

export default StudentErrorPage