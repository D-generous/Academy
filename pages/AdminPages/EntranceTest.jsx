import React, {useState, useEffect} from 'react'
import Navbar from '../../src/Components/AdminComponents/NavBar/NavBar'
import SetQuestions from '../../src/Components/AdminComponents/EntranceTest/SetQuestions'
import ViewParticipant from '../../src/Components/AdminComponents/EntranceTest/ViewParticipant'
import ViewQuestions from '../../src/Components/AdminComponents/EntranceTest/ViewQuestions'
import axios from 'axios'
import FetchEntranceQuestions from '../../src/CustomHooks/AdminHooks/FetchAllEntranceQuestions'
import FetchAdminInfo from '../../src/CustomHooks/AdminHooks/FetchAdminInfo'



const AdminEntranceTestView = () => {
    const [viewing, setviewing] = useState('setQuestions');
    const [adminInfo, fetching] = FetchAdminInfo(); 
    let [entranceQuestions] = FetchEntranceQuestions();
    const changeViewing=(value)=>{
        setviewing(value)
    }
    

  return (
    <div>
        <Navbar/>
        <div className=' grid grid-cols-1 md:flex pt-10 px-2'>
            <div className=' order-3 md:order-none basis-full md:basis-4/6 overflow-x-auto'>
                {viewing=='viewParticipant' && <ViewParticipant/>}
                {viewing=='setQuestions' && <SetQuestions/>}
                {viewing=='viewQuestions' && <ViewQuestions entranceQuestions={entranceQuestions} />}
            </div>
            <div className=' order-1 md:order-none basis-full md:basis-2/6 p-5'>
                <p className='text-center'>Select Your Action</p>
                <div className="flex gap-2 justify-center items-center">
                    <button onClick={()=>changeViewing('setQuestions')} className='p-2 bg-blue-500 rounded-lg'>Set Questions</button>
                    <button onClick={()=>changeViewing('viewQuestions')} className='p-2 bg-blue-500 rounded-lg'>View Questions</button>
                    <button onClick={()=>changeViewing('viewParticipant')} className='p-2 bg-blue-500 rounded-lg'>View Participants</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AdminEntranceTestView