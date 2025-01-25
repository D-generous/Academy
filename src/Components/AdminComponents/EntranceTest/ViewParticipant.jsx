import React, { useState } from 'react'
import FetchEntranceYearParticipants from '../../../CustomHooks/AdminHooks/FetchEntranceYearParticipants';
import Participant from './Participant'

const ViewParticipant = () => {
    const currentYear = new Date().getFullYear();
    let yearsLength = currentYear-2004;
    const years = Array.from(new Array(yearsLength), (_, index) => currentYear - index);
    const [year, setyear] = useState(currentYear)
    // console.log(year);
    const [participants] = FetchEntranceYearParticipants(year)
    console.log(participants)
  return (
    <div className='w-full overflow-x-auto'>
        <form action="w-full">
            <label htmlFor="" className='w-full'>Select Participants Year</label>
            <select name="" id="" onChange={(e)=>setyear(e.target.value)} className='w-full border-2 border-blue-400 p-2 focus:border-blue-400 focus:outline-blue-400'>
            {years.map((year) => (
                <option key={year} value={year}>
                {year}
                </option>
            ))}
            </select>
        </form>
        <table className='w-full overflow-y-auto'>
            <caption>2023 Participants</caption>
            <thead className='w-full'>
                <tr className='w-full'>
                    <td>Name</td>
                    <td>Email</td>
                    <td>Status</td>
                    <td>Score</td>
                </tr>
            </thead>
            <tbody className='w-full p-2'>
                {participants[year]?participants[year].map((participant)=>(
                    <Participant name={`${participant.firstName} ${participant.lastName}`} email={participant.email} status={participant.entranceTest?.score ? true : false} score={participant.entranceTest?.score} />
                )) :'No Entrance Test Participant For This Selected Year'}
            </tbody>
        </table>
    </div>
  )
}

export default ViewParticipant