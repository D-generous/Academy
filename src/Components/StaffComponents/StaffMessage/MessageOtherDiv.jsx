import React, { useState } from 'react'
import OtherPeople from './OtherPeople'
import OtherStaff from './OtherStaff'
import OtherAdmins from './OtherAdmins'

const MessageOtherDiv = ({setPartner}) => {
  const [messaging, setmessaging] = useState('student')
  return (
    <>
        <div className=" MessageOtherDiv order-1 md:order-none md:basis-4/12 md:h-full bg-slate-300 overflow-y-auto mt-16 md:mt-0 border-2">
            <div className='flex w-full justify-center items-center space-x-2 mt-2'>
                <button onClick={()=>setmessaging('student')} className=' bg-blue-600 hover:bg-blue-500 rounded-md p-2'>Students</button>
                <button onClick={()=>setmessaging('staff')} className=' bg-blue-600 hover:bg-blue-500 rounded-md p-2'>Staff</button>
                <button onClick={()=>setmessaging('admin')} className=' bg-blue-600 hover:bg-blue-500 rounded-md p-2'>Admin</button>
            </div>
            {messaging=='student'?<OtherPeople setPartner={setPartner}/>: ''}
            {messaging=='staff'?<OtherStaff setPartner={setPartner}/>:''}
            {messaging=='admin'?<OtherAdmins setPartner={setPartner}/>:''}
        </div>
    </>
  )
}

export default MessageOtherDiv