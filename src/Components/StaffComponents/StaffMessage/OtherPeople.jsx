import React , {useState} from 'react'
import {useSelector , useDispatch } from 'react-redux'
// import { fetchAllStudents } from '../../redux/staffInformation'
import People from './People'

const OtherPeople = ({setPartner}) => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  let allStudentsInfo = useSelector((state)=>state.staffInformation.allStudents)
  const [viewing, setviewing] = useState(0)
  const dispatch = useDispatch()
  // console.log(allStudentsInfo[0][0].firstName)
  return (
    <>
        <div className="w-full p-2">
            <h3 className='text-center font-extrabold underline underline-offset-4'>Students</h3>
            <select onChange={(e)=>setviewing(e.target.value)} name="" id="" className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50 px-6 my-2'>
              <option value="0">JSS1</option>
              <option value="1">JSS2</option>
              <option value="2">JSS3</option>
              <option value="3">SSS1</option>
              <option value="4">SSS2</option>
              <option value="5">SSS3</option>
            </select>
            {allStudentsInfo.length>0?allStudentsInfo[viewing].length>0?allStudentsInfo[viewing].map((student, index)=>(
            <People key={index} mainindex={viewing} name={`${student.firstName} ${student.lastName}`} id={student._id} img={student.pictureUrl} email={student.email} setPartner={setPartner} identity='Student'/>
            )): <People name='No name' img='jkd' email='kkk'/>:''}
        </div>
    </>
  )
}

export default OtherPeople