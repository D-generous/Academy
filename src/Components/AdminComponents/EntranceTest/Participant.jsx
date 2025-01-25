import React from 'react'

const Participant = ({name, email, score, status}) => {
  return (
    <tr className='w-full'>
        <td>{name}</td>
        <td>{email}</td>
        <td>{status==true?<span className='text-green-600'>Taken</span>:<span className='text-red-600'>Pending</span>}</td>
        <td>{status==true?<span className='text-green-600'>{score}</span>:<span className='text-red-600'>Pending</span>}</td>
    </tr>
  )
}

export default Participant