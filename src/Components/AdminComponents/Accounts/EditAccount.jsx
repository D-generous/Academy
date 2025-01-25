import React, { useState } from 'react'
import SignUpForm from '../../StaffComponents/StaffSignUp/SignUpForm'
import Navbar from '../NavBar/NavBar'

const EditAccount = () => {
    const [accountType, setaccountType] = useState('student')
    const chooseAccountType =(type)=>{
        setaccountType(type)
    }
    
  return (
    <>
        <Navbar/>
        <div className=' grid grid-cols-1 md:flex'>
            <div className=' order-3 md:order-none basis-full md:basis-4/6'>
                <SignUpForm type='edit' />
            </div>
            <div className=' mb-2 order-1 md:order-none basis-full md:basis-2/6'>
                <p className='text-center my-2'>Edit account for:</p>
                <div className='flex gap-3'>
                    <button className=' p-2 rounded-lg ms-auto bg-blue-500' onClick={()=>chooseAccountType('student')}>Student</button>
                    <button className=' p-2 rounded-lg me-auto bg-blue-500' onClick={()=>chooseAccountType('staff')}>Staff</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default EditAccount;