import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import People from './People'


const OtherStaff = ({setPartner}) => {
  const dispatch = useDispatch()
  let allStaffsInfo = useSelector((state)=>state.staffInformation.allStaffs)
  // console.log(allStaffsInfo)
  const [viewing, setviewing] = useState(0)

  return (
    <>
        <div className="w-full p-2">
            <h3 className=' text-center font-extrabold underline underline-offset-4'>Staff</h3>
            <select onChange={(e)=>setviewing(e.target.value)} name="" id="" className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50 px-6 my-2'>
              <option value={0}>JSS1</option>
              <option value={1}>JSS2</option>
              <option value={2}>JSS3</option>
              <option value={3}>SSS1</option>
              <option value={4}>SSS2</option>
              <option value={5}>SSS3</option>
            </select>          
              {allStaffsInfo.length>0?allStaffsInfo[viewing].length>0?allStaffsInfo[viewing].map((staff, index)=>(
              <People name={`${staff.firstName} ${staff.lastName}`} id={staff._id} img='/vite.svg' setPartner={setPartner} identity='Staff'/>
              )): <People name='No name' img='jkd' email='kkk' />:''}
            
        </div>
    </>
  )
}

export default OtherStaff