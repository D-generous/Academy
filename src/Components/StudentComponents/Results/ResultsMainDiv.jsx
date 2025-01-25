import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Result from './Result'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
// import { renderToStaticMarkup } from 'react-dom/server';
// import { PDFViewer } from '@react-pdf-viewer/react-to-pdf';
// import jsPDF from 'jspdf';

const ResultsMainDiv = ({studentInfo, studentAcademicResults, resultIndex}) => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  const [results, setresults] = useState({})
  useEffect(() => {
    studentAcademicResults?.length>=1?setresults(studentAcademicResults[resultIndex]):null
  }, [studentAcademicResults, resultIndex])
  
  const school = {
    logoUrl: '/school_logo.png',
    name: 'HOPE Academy',
    address: 'Ogbomoso, Oyo State, Nigeria',
    email: 'adegbitejoshua07@gmail.com',
    contactNumber: '+234701586456',
  };

  const student = {
    ...studentInfo,
    name: `${studentInfo?.firstName} ${studentInfo?.lastName}`,
    matricNumber: studentInfo?.matricNumber,
  };

  const generatePdf = () => {
    const input = document.getElementById('pdf-content');
    const options = {
      margin: 10,
      filename: `${studentInfo?.firstName} ${studentInfo?.lastName}_report_sheet${Math.floor(Math.random()*100)}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

    html2pdf(input, options);
  };
  return (
    <>
        <div className='DashboardMainDiv relative order-5 md:order-none mt-16 md:mt-0 h-screen basis-full md:basis-7/12 p-5 overflow-y-auto'>
            <button onClick={generatePdf} className=' print:hidden sticky top-2 left-full bg-blue-200 p-2 rounded-md' >Download Result </button>
            <div id="pdf-content">
              <Result results={results} studentName={student.name} studentPictureUrl={student.pictureUrl} matricNumber={student.matricNumber} schoolName={school.name} address={school.address} contactNumber={school.contactNumber} logoUrl={school.logoUrl}/>
            </div>
            {/* {results?.length> 0? results.map((notification)=>(
                // <Notification id={notification.senderId} name={notification.name} message={notification.message} type={notification.type || 'submit'}/>
            )): <Notification name='Empty Notification' message='You do not have any notification at the moment' type='empty'/>} */}
        </div>
    </>
  )
}

export default ResultsMainDiv