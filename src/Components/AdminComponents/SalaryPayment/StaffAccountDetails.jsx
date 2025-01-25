import React from 'react'

const StaffAccountDetails = ({name, bankName, accountNumber, accountName}) => {
  return (
    <tr className='w-full border-2'>
        <td className='text-center border-2 px-2'>{name}</td>
        <td className='text-center border-2 px-2'>{bankName}</td>
        <td className='text-center border-2 px-2'>{accountNumber}</td>
        <td className='text-center border-2 px-2'>{accountName}</td>
    </tr>
  )
}

export default StaffAccountDetails