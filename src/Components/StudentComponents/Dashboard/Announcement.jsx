import React from 'react'

const Announcement = ({ announce }) => {
    return (
        <>
            <div className='rounded-md bg-gray-100 p-4 my-1 flex items-center'>
                <img src="/vite.svg" className='w-6 h-6 mr-2' alt="" />
                <p className='text-base'>{announce}</p>
            </div>
        </>
    )
}

export default Announcement