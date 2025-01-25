import React from 'react'

const TopStudentView = ({name, image}) => {
  return (
    <>
        <div className="h-12 p-2 flex">
            <img src={image} className='h-10 w-10 rounded-full' alt={`${name}'s image`} />
            <div>
                <h3 className=' font-bold mb-1'>{name}</h3>
                {/* <h3 className=' text-red-600 mt-1 hidden md:hidden'>Allover: 90%</h3> */}
            </div>
        </div>
    </>
  )
}

export default TopStudentView