import React from 'react'

const Stat = ({name, amount, icon}) => {
  return (
    <div className='flex gap-5 w-auto p-3 shadow-lg' >
        {(icon)}
        {/* <i className={`fa ${icon} my-auto`}></i> */}
        <div className='text-center my-auto'>
            <h5>{name}</h5>
            <p>{amount}</p>
        </div>
    </div>
  )
}

export default Stat