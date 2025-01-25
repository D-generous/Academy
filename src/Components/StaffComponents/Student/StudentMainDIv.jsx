import React , {useState} from 'react'
import MessageStudent from './MessageStudent'
import StudentLastPerformance from './StudentLastPerformance'
import StudentScoreTable from './StudentScoreTable'
import { useSelector } from 'react-redux'
import ButtonComp from '../../ButtonComp'
import axios from 'axios'
import SnackBar from '../../SnackBar'
import { backendurl } from '../../../../constants/backendurl';




const StudentMainDIv = ({category, studentIndex, studentEmail, partnerName}) => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  let mainindex = staffInfo.class;
  const [assessment, setassessment] = useState({})
  const recieveAssessment = (value) => {
    setassessment(value)
  }
  const saveStudentsAssesment =()=>{
    console.log(assessment)
    let allAssessment = {...assessment, staffClass: Number(staffInfo.class), studentEmail: studentEmail, subjectIndex: Number(staffInfo.class) }
    let endpoint = `${backendurl}staff/submitstudentsassessment`
    axios.post(endpoint, allAssessment)
    .then((res)=>{
      console.log(res)
      setsnacksBarBody("Student's Assessments Updated Successfully")
      setsnacksBarType('info')
      showSnackBar()
    })
    .catch((err)=>{
      console.log(err)
      setsnacksBarBody("Error Updating Student's Assessments")
      setsnacksBarType('error')
      showSnackBar()
    })
  }
  const [snacksBarBody, setsnacksBarBody] = useState('Email')
  const [snacksBarType, setsnacksBarType] = useState('info')

  const showSnackBar = () => {
      var x = document.getElementById("snackbarContainer");
      x.className = "show";
    
      setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
  }
  return (
    <>
        <div className='StudentMainDIv middleDiv mt-16 md:mt-0 h-screen basis-full md:basis-7/12 px-5 overflow-y-auto border'>
            <h3 className=' text-center'>{staffInfo.lastName} {staffInfo.firstName}</h3>
            <div className="w-full overflow-x-scroll">
                <StudentScoreTable studentIndex={studentIndex} index={mainindex} func={recieveAssessment}/>
            </div>
            <StudentLastPerformance/>
            <ButtonComp onClick={saveStudentsAssesment} name={studentIndex?`Save ${partnerName}'s Data`:'Select A Students Name'}/>
            <MessageStudent category={category} mainindex={mainindex} studentEmail={studentEmail} partnerName={partnerName}/>
        </div>
        <div id='snackbarContainer'><SnackBar body={snacksBarBody} type={snacksBarType}/></div>
    </>
  )
}

export default StudentMainDIv