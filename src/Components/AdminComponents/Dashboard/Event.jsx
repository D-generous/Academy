import React from 'react'

const Event = ({data}) => {
  return (
    <div className='my-2 p-2 bg-slate-300'>
        <p>{data.head}</p>
        <p>{data.body}</p>
    </div>
  )
}

export default Event