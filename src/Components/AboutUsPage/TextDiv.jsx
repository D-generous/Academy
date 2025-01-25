import React from 'react'

const TextDiv = ({head, body}) => {
  return (
    <>
        <div className='p-5'>
            <h3>{head}</h3>
            <p>{body}</p>
        </div>
    </>
  )
}

export default TextDiv