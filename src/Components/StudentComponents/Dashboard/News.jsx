import React from 'react'

const News = ({data}) => {
  return (
    <>
      <div className='w-full border-2 my-2'>
        <div className='p-5 bg-red-300 shadow-lg'>
          <h3>{data.head}</h3>
        </div>
        <p className='p-1'>{data.body}</p>
      </div>
    </>
  )
}

export default News