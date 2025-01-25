import React from 'react'
import ButtonComp from '../../ButtonComp'
import FileView from './FileView'
import { useNavigate } from 'react-router-dom'
import FileViewer from '../../../FileViewer'


const SubmitMainDIv = ({studentSubmit}) => {
    const navigate = useNavigate();
    const messageStudent =()=>{
        if(Object.keys(studentSubmit).length >=1  && studentSubmit.constructor === Object){
            navigate(`/inbox/${studentSubmit.senderId}`)
        }
    }
    const gradeStudent =()=>{
        if(Object.keys(studentSubmit).length >=1  && studentSubmit.constructor === Object){
            navigate(`/student/${studentSubmit.studentEmail}`)
        }
    }
  return (
    <>
        <div className="SubmitMainDIv middleDiv relative">
            <button className=' bg-slate-500 p-2 w-auto h-auto rounded-md absolute top-2 right-2 opacity-25 hover:opacity-100'><i className=' fa fa-bars'></i></button>
            <div>
                <h3 className=' text-center font-bold underline'>PDF Title</h3>
                <h4 className=' text-center'>From: Adegbite Joshua</h4>
            </div>
            <div className='  h-3/6'>
                {/* <FileView/> */}
                {Object.keys(studentSubmit).length >=1  && studentSubmit.constructor === Object?<FileViewer fileType='.docx' fileLink={studentSubmit.fileLink} />:''}
                <ButtonComp onClick={messageStudent} name={`Message ${studentSubmit.studentName?studentSubmit.studentName:'Select A Submit'}`}/>
                <ButtonComp onClick={gradeStudent} name={`Grade ${studentSubmit.studentName?studentSubmit.studentName:'Select A Submit'}`} />
            </div>
        </div>
        
    </>
  )
}


export default SubmitMainDIv