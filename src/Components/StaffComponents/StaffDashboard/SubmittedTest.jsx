import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import TestOverView from './TestOverView'
import TestOverViewNone from './TestOverViewNone'

const SubmittedTest = () => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  let fetchingData = useSelector((state)=>state.staffInformation.staffFetchingState)
  const [SubmittedWork, setSubmittedWork ] = useState();
  useEffect(()=>{
    setSubmittedWork(staffInfo.submittedWorks?.filter((submits, index)=>index<5));
  }, [staffInfo])
  return (
    <>
        <div className='w-full px-5 bg-white rounded-lg mt-5 py-5'>
            <h5>Submitted Tests</h5>
            <table className='w-full border-collapse border bottom-1 border-black'>
                <thead>
                    <tr className='text-center'>
                        <td  className='border-collapse border border-1 border-black md' style={{fontSize: '11px'}}>Email</td>
                        <td  className='border-collapse border border-1 border-black md' style={{fontSize: '11px'}}>Date Of Submission</td>
                        <td  className='border-collapse border border-1 border-black md' style={{fontSize: '11px'}}>File Name</td>
                        <td  className='border-collapse border border-1 border-black md' style={{fontSize: '11px'}}>Description</td>
                    </tr>
                </thead>
                <tbody>
                    {!fetchingData ? SubmittedWork?.length>0 ? SubmittedWork.map((work)=>(
                      <TestOverView work={work}/>)
                    ) : <TestOverViewNone/> : null }
                </tbody>
            </table>
        </div>
    </>
  )
}

export default SubmittedTest