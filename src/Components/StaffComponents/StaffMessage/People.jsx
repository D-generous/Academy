import React from 'react'

const People = ({name, setPartner, id, identity}) => {
  return (
    <>
        <div onClick={()=>setPartner(name, id)} className='w-full cursor-pointer bg-white p-2 my-1 flex flex-row justify-between items-center rounded-md'>
            <img src="/school_logo.png" className='h-12 w-12 float-left' alt="" />
            <p>{name}</p>
            <p className='text-right text-green-500'><small>{identity}</small></p>
        </div>
    </>
  )
}

export default People