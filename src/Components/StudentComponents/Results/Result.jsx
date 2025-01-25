import React from 'react'
import { subjects } from '../../../../constants/subjects'
import { stringClass } from '../../../../constants/stringClass'
import './style.scss'
import fetchStudentInfo from '../../../CustomHooks/StudentHooks/fetchStudentInfo'


const Result = ({ logoUrl, schoolName, address, contactNumber, studentName, studentPictureUrl, matricNumber, className, results }) => {
  const getRemark = (score) => {
    if (score >= 90 && score <= 100) {
      return 'Excellent';
    } else if (score >= 80 && score < 90) {
      return 'Very Good';
    } else if (score >= 70 && score < 80) {
      return 'Good';
    } else if (score >= 60 && score < 70) {
      return 'Satisfactory';
    } else if (score >= 50 && score < 60) {
      return 'Acceptable';
    } else if (score >= 0 && score < 50) {
      return 'Needs Improvement';
    } else {
      return 'Invalid Score';
    }
  }
  const [studentInfo, fetching, termDetails] = fetchStudentInfo();  

  let { term = '1st term', class: clas, year, ...result } = results || {};

  return (
    <div className='print:w-screen' style={{ textAlign: 'center'}}>
      <div className='flex gap-3'>
        <img className='basis-2/6' src={logoUrl} alt="School Logo" style={{ width: '100px', height: '100px' }} />
        <div className='basis-4/6 text-center'>
          <h2>{schoolName}</h2>
          <p>{address}</p>
          <p>Contact: {contactNumber}</p>
        </div>
      </div>
      <div style={{ margin: '20px auto' }}>
        <h3 className='border-2 border-gray-400'>Student Details</h3>
        <table className='w-full' style={{ margin: '0 auto' }}>
          <tbody>
            <tr>
              <td className='flex justify-center items-center'><img src={studentPictureUrl} alt="Student" style={{ width: '80px', height: '80px' }} /></td>
              <td>
                <p className='text-left px-3'><strong>Name:</strong><span className='float-right'> {studentName}</span></p>
                <p className='text-left px-3'><strong>Matric Number:</strong><span className='float-right'> {matricNumber}</span></p>
                <p className='text-left px-3'><strong>Class:</strong><span className='float-right'> {stringClass[clas]}</span></p>
                <p className='text-left px-3 flex'><strong>Session:</strong><span className='ms-auto'> {termDetails.term == 1 ? '1st' : termDetails.term ==2 ? '2nd' : '3rd'} Term </span><span className='float-right'>| Year: {termDetails.year}</span></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h3>Results</h3>
        <table className='w-full' style={{ margin: '0 auto' }}>
          <thead>
            <tr>
              <th>Subject</th>
              <th>CA</th>
              <th>Exam</th>
              <th>Remarks</th>
            </tr>
          </thead>
          {/* <tbody>
            {results.map((result, index) => (
              <tr key={index}>
                <td name='result' >{result.subject}</td>
                <td name='result' >{result.ca}</td>
                <td name='result' >{result.exam}</td>
                <td name='result' >{result.remarks}</td>
              </tr>
            ))}
          </tbody> */}
          <tbody>
            {Object.entries(result).map(([index, result]) => (
              <tr key={index}>
                <td name='result'>{subjects[index]}</td>
                <td name='result'>{result?.ca}</td>
                <td name='result'>{result?.exam}</td>
                <td name='result'><small>{getRemark(Number(result?.ca) + Number(result?.exam))}</small></td>
              </tr>
            ))}
        </tbody>

        </table>
      </div>
    </div>

  )
}

export default Result