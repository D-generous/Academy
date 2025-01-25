import React from 'react'
import Group from './Group'

const StaffGroup = () => {
  return (
    <>
        <div className=" basis-full md:basis-4/6 my-2 rounded-md bg-white p-3">
            <h3><span className="font-bold">Groups</span> <span className=" float-right">View All</span></h3>
            <Group/>
            <Group/>
            <Group/>
        </div>
    </>
  )
}

export default StaffGroup