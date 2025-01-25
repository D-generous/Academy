import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import ResultsDisplay from './ResultsDisplay'
import SubjectPerformance from './SubjectPerformance'
import axios from 'axios'
import { subjects } from '../../../../constants/subjects';
import DisplayToast from '../../../CustomHooks/DisplayToast';
// import subjects from '../../subjectArray';
import { backendurl } from '../../../../constants/backendurl';



const PerformanceContainer = ({ subjectDetails }) => {
  let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
  let allStaffs = useSelector((state) => state.studentInformation.allStaffs);
  const [fileName, setfileName] = useState('')
  const [fileBase64, setfileBase64] = useState('')
  const selectFile = (e) => {
    let file = e.target.files[0]
    setfileName(file.name)
    let reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {
      setfileBase64(reader.result)
    }

  }
  const sendSubmit = () => {
    let submitDetails = {
      studentEmail: studentInfo.email,
      fileName,
      fileBase64,
      staffClass: Number(studentInfo.class),
      date: new Date().toLocaleDateString(),
      subjectName: subjects[subjectDetails?.subjectIndex],
      fileDescription: document.getElementById('fileDescription').value
    }
    let endpoint = `${backendurl}student/sendsubmit`
    // let {fileName, ...rest} = submitDetails
    axios.post(endpoint, submitDetails)
      .then((res) => {
        if (res.status == 200) {
          DisplayToast('success', 'Submit Sent')
        }
      })
      .catch((error) => {
        console.log(error);
        if (res.response.status == 402) {
          DisplayToast('error', 'An error occurred, try again')
        }
      })

  }

  return (
    <div className="w-full">
      <div className="resultDiv overflow-auto w-full">
        <ResultsDisplay subjectIndex={subjectDetails?.index} />
      </div>
      <div className="flex gap-2 text-center mt-3">
        <SubjectPerformance text='Classwork Performance' />
        <SubjectPerformance text='Assignment Performance' />
        <SubjectPerformance text='Exam Performance' />
      </div>
      <div>
        <h4>Submit Your Work to Your Teacher</h4>
        <label htmlFor="fileDescription">File Description</label>
        <input
          className="w-full px-3 py-2 border rounded my-2"
          type="text"
          id="fileDescription"
          placeholder="File Description"
        />
        <input
          onChange={(e) => selectFile(e)}
          className="w-full px-3 py-2 border rounded my-2"
          type="file"
          accept=".pdf, .docx, .txt"
        />
        <button
          onClick={sendSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded my-2"
        >
          Submit
        </button>
      </div>
    </div>
  )
}

export default PerformanceContainer