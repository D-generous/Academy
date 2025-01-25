import React, { useState } from 'react'
import OnlinePeople from './OnlinePeople'
import { useSelector } from 'react-redux'


const Staffs = ({ func }) => {
    let allStaffs = useSelector((state) => state.studentInformation.allStaffs);
    const [viewing, setviewing] = useState(0)

    return (
        <>
            <select
                name=""
                id="selectClass"
                onChange={(e) => setviewing(e.target.value)}
                className="w-full h-12 p-2 rounded-md border-2"
            >
                <option value="0">JSS 1</option>
                <option value="1">JSS 2</option>
                <option value="2">JSS 3</option>
                <option value="3">SSS 1</option>
                <option value="4">SSS 2</option>
                <option value="5">SSS 3</option>
            </select>
            {allStaffs[viewing] ? (
                allStaffs[viewing].map((staff, index) => (
                    <div key={staff._id} className="my-2">
                        <OnlinePeople func={func} id={staff._id} email={staff.email} name={`${staff.firstName} ${staff.lastName}`} />
                    </div>
                ))
            ) : (
                <p>No staff available for the selected class.</p>
            )}
        </>

    )
}

export default Staffs