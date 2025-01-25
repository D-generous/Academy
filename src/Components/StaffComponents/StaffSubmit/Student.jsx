import React from 'react'
import Icon from '../../Icon'

const Student = ({name, fileDescription, work, func}) => {
  return (
    <>
        <div onClick={()=>func(work)} className=' bg-white my-1 rounded-md p-2'>
            <Icon/>
            <h3>{fileDescription}</h3>
            <p className='text-right'><small>By {name}</small></p>
        </div>
    </>
  )
}

export default Student