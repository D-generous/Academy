import React from 'react'
import StudentSocialMedia from './StudentSocialMedia'
import StudentSubject from './StudentSubject'
import StudentProfileUpdate from './StudentProfileUpdate'
import StudentCalendar from './StudentCalendar'

const AllProfilesDiv = () => {
  return (
    <>
        <div className='AllSettingsDiv'>
            <StudentProfileUpdate/>
            <StudentSocialMedia/>
            <StudentSubject/>
            <StudentCalendar/>
        </div>
    </>
  )
}

export default AllProfilesDiv