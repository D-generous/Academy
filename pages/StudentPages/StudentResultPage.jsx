import React , {useEffect, useState} from 'react'
import fetchStudentInfo from '../../src/CustomHooks/StudentHooks/fetchStudentInfo'
import fetchStudentAcademicResultsHook from '../../src/CustomHooks/StudentHooks/fetchStudentAcademicResultsHook'
import NavBar from '../../src/Components/StudentComponents/NavBar';
import ResultsMainDiv from '../../src/Components/StudentComponents/Results/ResultsMainDiv';
import ResultsOtherDiv from '../../src/Components/StudentComponents/Results/ResultsOtherDiv';
import { backendurl } from '../../constants/backendurl';
import checkStudentFeeStatus from '../../src/CustomHooks/StudentHooks/checkStudentFeeStatus';



const StudentResultPage = () => {
  const [studentInfo, fetching, termDetails] = fetchStudentInfo();  
  const [studentAcademicResults, fetchingResults] = fetchStudentAcademicResultsHook();
  const [localResults, setlocalResults] = useState();
  const [resultIndex, setresultIndex] = useState(0);


  checkStudentFeeStatus();
  useEffect(()=>{
    setlocalResults([...studentAcademicResults, ...studentAcademicResults, ...studentAcademicResults])
  }, [studentAcademicResults])
  return (
    <div id='pageContainer' className="grid w-screen h-screen md:flex md:flex-row bg-slate-300 relative ring-0">
        <NavBar/>
        {!fetching && !fetchingResults && <>
          <ResultsMainDiv studentInfo={studentInfo} studentAcademicResults={localResults} resultIndex={resultIndex} />
          <ResultsOtherDiv studentAcademicResults={localResults} setresultIndex={setresultIndex} />
        </>}
    </div>
  )
}

export default StudentResultPage;