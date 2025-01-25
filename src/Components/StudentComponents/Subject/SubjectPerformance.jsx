import React from 'react'

const SubjectPerformance = ({text}) => {
    return (
        <>
            <div className='w-full mb-4'>
                <h3 className='text-xl font-bold mb-2'>{text}</h3>
                {/* <div className='h-8 w-full bg-gray-300 rounded-full'>
                    <div className='h-8 bg-blue-500 rounded-full text-center text-white font-semibold flex items-center justify-center' style={{ width: '85%' }}>
                        85%
                    </div>
                </div>
                <h6 className='text-sm mt-2'>You performed excellently in your last classwork</h6> */}
            </div>
        </>
    )
}

export default SubjectPerformance