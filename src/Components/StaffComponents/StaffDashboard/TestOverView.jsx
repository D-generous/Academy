import React from 'react'

const TestOverView = ({work}) => {
  const fileDescription = work.fileDescription.slice(0, 15);
  const fileName = work.fileName.slice(0, 10);
  return (
     <>
        <tr className='text-center'>
            <td  className='border-collapse border border-1 border-black'>{work.studentEmail}</td>
            <td  className='border-collapse border border-1 border-black'>{work.date}</td>
            <td  className='border-collapse border border-1 border-black'>{fileName}</td>
            <td  className='border-collapse border border-1 border-black'>{fileDescription}</td>
        </tr>
    </>
  )
}

export default TestOverView