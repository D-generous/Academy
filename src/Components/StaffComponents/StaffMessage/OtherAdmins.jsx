import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import People from './People'


const OtherAdmins = ({setPartner}) => {
  const dispatch = useDispatch()
  let allAdmins = useSelector((state)=>state.staffInformation.allAdmins)
  // console.log(allAdmins)
  const [viewing, setviewing] = useState(0)

  return (
    <>
        <div className="w-full p-2">
            <h3 className=' text-center font-extrabold underline underline-offset-4'>Admins</h3>
              {allAdmins.length>0?allAdmins.map((staff, index)=>(
              <People name={`${staff.firstName} ${staff.lastName}`} id={staff._id} img='/vite.svg' setPartner={setPartner} identity='Admin'/>
              )): <People name='No name' img='jkd' email='kkk' />}
            
        </div>
    </>
  )
}

export default OtherAdmins