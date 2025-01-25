import React, { useEffect, useState, useRef } from 'react'
import {useSelector} from 'react-redux'


const ResultsDisplay = ({subjectIndex}) => {
    let studentInfo = useSelector((state)=>state.studentInformation.studentInformation);
    const [notFound, setnotFound] = useState(true)  
    let viewingSubject =  Object.keys(studentInfo).length>0?studentInfo.subjects[subjectIndex]:{}

  return (
    <>
        <table className='subjectTable'> {/* table table-bordered border-primary table-responsive*/}
            <thead>
                <tr>
                    <td>C/A</td>
                    <td>C/A</td>
                    <td>C/A</td>
                    <td>C/A</td>
                    <td>C/A</td>
                    <td>ASS</td>
                    <td>ASS</td>
                    <td>ASS</td>
                    <td>ASS</td>
                    <td>ASS</td>
                    <td>TEST</td>
                    <td>TEST</td>
                    <td>TEST</td>
                    <td>BONUS</td>
                    <td>BONUS</td>
                    <td>TOTAL</td>
                    <td>PERCENT</td>
                    <td>POSITION</td>
                </tr>
            </thead>
            <tbody>
              <tr>
                <td>{viewingSubject?.ca1?viewingSubject?.ca1:'00'}</td>
                <td>{viewingSubject?.ca2?viewingSubject?.ca2:'00'}</td>
                <td>{viewingSubject?.ca3?viewingSubject?.ca3:'00'}</td>
                <td>{viewingSubject?.ca4?viewingSubject?.ca4:'00'}</td>
                <td>{viewingSubject?.ca5?viewingSubject?.ca5:'00'}</td>
                <td>{viewingSubject?.ass1?viewingSubject?.ass1:'00'}</td>
                <td>{viewingSubject?.ass2?viewingSubject?.ass2:'00'}</td>
                <td>{viewingSubject?.ass3?viewingSubject?.ass3:'00'}</td>
                <td>{viewingSubject?.ass4?viewingSubject?.ass4:'00'}</td>
                <td>{viewingSubject?.ass5?viewingSubject?.ass5:'00'}</td>
                <td>{viewingSubject?.test1?viewingSubject?.test1:'00'}</td>
                <td>{viewingSubject?.test2?viewingSubject?.test2:'00'}</td>
                <td>{viewingSubject?.test3?viewingSubject?.test3:'00'}</td>
                <td>{viewingSubject?.bonus1?viewingSubject?.bonus1:'00'}</td>
                <td>{viewingSubject?.bonus2?viewingSubject?.bonus2:'00'}</td>
                <td>{viewingSubject?.total?viewingSubject?.total:'00'}</td>
                <td>{viewingSubject?.percent?viewingSubject?.percent:'00'}</td>
                <td>{viewingSubject?.position?viewingSubject?.position:'00'}</td>
              </tr>
            </tbody>
        </table>
    </>
  )
}

export default ResultsDisplay