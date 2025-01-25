import React from 'react'

const OnlinePeople = ({name, func, id}) => {
  return (
    <>
        <div onClick={()=>func(name, id)} className='w-100 p-2 my-2'>
            <img src="/vite.svg" className='float-left' alt="" />
            <h5 className='d-inline'>{name} <i className='fab fa-creative-commons-by ms-3 text-green-500'></i></h5>
        </div>
    </>
  )
}

export default OnlinePeople