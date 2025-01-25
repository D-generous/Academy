import React from 'react';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


const Subject = ({name, subjectIndex, index, func, toggleSideNav}) => {
  return (
    <>
        <div onClick={()=>{
          func({subjectIndex, index})
          toggleSideNav()
        }} className='w-full p-2 my-2 gap-2 cursor-pointer'>
            <AutoGraphIcon className='text-blue-500' style={{ fontSize: '2.5rem' }}/>
            <h5 className='inline'>{name}</h5>
        </div>
    </>
  )
}

export default Subject