import React from 'react'
import { useSelector } from 'react-redux';
import fetchStudentInfo from '../../../CustomHooks/StudentHooks/fetchStudentInfo.jsx';
import subjects from '../../../Subjects.js';
import Subject from './Subject'


const StudentSubject = () => {
    // document.querySelector("title").innerText = `404 - Error Page`
    // let  = useSelector((state) => state.studentInformation.studentInformation);
    const [studentInfo] = fetchStudentInfo()
    return (
        <>
            <div className="w-full md:w-1/2 lg:w-2/3 px-10 pb-5">
                <div className="mb-8">
                    <h3 className="text-xl font-semibold mb-4">Subjects You Are Offering</h3>
                    <select
                        disabled
                        name=""
                        id=""
                        multiple
                        className="h-40 w-full overflow-y-auto border rounded-md p-2"
                    >
                        {studentInfo.subjects && studentInfo?.subjects.map((subject, index) => (
                            <Subject key={index} name={subjects[subject.subjectIndex]} />
                        ))}
                    </select>
                </div>
                {/* <div>
                    <h3 className="text-xl font-semibold mb-4">Unoffered Subjects</h3>
                    <select
                        disabled
                        name=""
                        id=""
                        multiple
                        className="form-select h-40 overflow-y-auto border rounded-md p-2"
                    >
                        {subjects.map((unaddedSubject, index) => {
                            if (!studentInfo.subjects.includes(unaddedSubject)) {
                                return <Subject key={index} name={unaddedSubject} />;
                            }
                            return null;
                        })}
                    </select>
                </div> */}
            </div>
        </>
    )
}

export default StudentSubject