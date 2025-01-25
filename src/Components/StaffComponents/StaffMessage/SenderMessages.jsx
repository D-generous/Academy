import React from 'react'

const SenderMessages = ({message, date, src}) => {
  return (
    <>
        <div className=' w-64 md:w-96 rounded-lg rounded-tr-none overflow-visible bg-slate-300 block ms-auto p-2 my-1'>
            <div className=' m-1 p-2 rounded-md'>
            <img src="/school_logo.png"  className='h-12 w-12 float-left' alt="" />
            <p>{message}</p>
            <p className='text-right'><small>{date}</small></p>
            </div>
        </div>
    </>
  )
}

export default SenderMessages