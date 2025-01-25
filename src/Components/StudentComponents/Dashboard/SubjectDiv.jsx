import React from 'react'
import AutoGraphIcon from '@mui/icons-material/AutoGraph';


const SubjectDiv = ({ subject }) => {
    return (
        <div className='text-center relative bg-gray-100 bg-opacity-50 shadow-lg rounded-lg p-2'>
            <h4 className="font-semibold">{subject}</h4>
            <p className="text-gray-600">Lorem ipsum dolor sit amet.</p>
            <AutoGraphIcon className='absolute -z-10 top-0 left-0 text-blue-500' style={{ fontSize: '4rem' }}/>
        </div>

    )
}

export default SubjectDiv