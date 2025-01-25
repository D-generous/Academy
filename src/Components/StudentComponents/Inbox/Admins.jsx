import React, { useState } from 'react'
import OnlinePeople from './OnlinePeople'
import {useSelector} from 'react-redux'


const Admins = ({func}) => {
    let allAdmins = useSelector((state)=>state.studentInformation.allAdmins);    
  return (
    <>
        {allAdmins?allAdmins.map((admin, index) =>(
            <OnlinePeople func={func} id={admin._id} name={`${admin.firstName} ${admin.lastName}`}/>
        )): ''}
    </>
  )
}

export default Admins