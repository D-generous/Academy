import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import UploadedFile from './UploadedFile'
import ButtonComp from '../../ButtonComp'
import FileViewer from '../../../FileViewer'



const FileOtherDiv = () => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  let fetchingData = useSelector((state)=>state.staffInformation.staffFetchingState)
  const setHeight =(fileType)=>{
    if(fileType.includes('.docx')){
      return('250px')
    } else if(fileType.includes('.mp3')){
      return('70px')
    } else if(fileType.includes('.mpeg')){
      return('auto')
    } else if(fileType.includes('.jpeg')){
      return('250px')
    }
  }

  const  openFileView =(file)=>{
    document.getElementById("popup").classList.add("open-popup")
    console.log(document.getElementById("popup"))
    // document.getElementById("popup").innerHTML = file
  }
  const  closeFileView =()=>{
      document.getElementById("popup").classList.remove("open-popup")
  }
  const [fileLink, setfileLink] = useState('')
  const [fileType, setfileType] = useState('')
  const [fileTitle, setfileTitle] = useState('')
  const [fileIndex, setFileIndex] = useState('')
  const [fileDescription, setFileDescription] = useState('')
  window.closeFileView = closeFileView

  return (
    <>
        <div className="FileOtherDiv otherDiv">
            <h3 className=' text-center font-bold underline'>Upload Files</h3>
            <div className=''>
              {!fetchingData?staffInfo.files?.length>0?staffInfo.files.map((file, index) =>(<>
                <>
                  <div onClick={(e)=>{
                    setfileLink(file.fileLink);
                    setfileType(file.fileType);
                    setfileTitle(file.fileTitle);
                    setFileIndex(index);
                    setFileDescription(file.fileDescription);
                    openFileView()
                  }}>
                    <p align='center'>{file.fileTitle}</p>
                    <FileViewer fileLink={file.fileLink} fileType={file.fileType} width='100%' height={setHeight(file.fileType)} />
                  </div>
                </>
              </>)):'No file uploaded yet':''}
              {/* <div className=' overflow-hidden' style={{width: '100%', height: '200px'}}>
                <FileViewer fileLink='vite.svg' fileType='.jpeg, .pdf'/>
              </div> */}
            </div>
        </div>
        <div className="containerp">
          <div className="popup" id="popup">
              <button type="button" className=" ms-auto close-button my-2" onClick={()=>closeFileView()} aria-label="Close">X</button>
              {/* <object data="vid.mp4" controls type="video/webm" width="100%" height="100%">
                  <p>Alternative text - include a link <a href="port.pdf">to the PDF!</a></p>
              </object> */}
              <FileViewer fileLink={fileLink} fileType={fileType} width='100%' height='60%' />
              <div className=''>
                <label className=''>Title</label>
                <input type="text" defaultValue={fileTitle} placeholder='File Title' className='w-full h-12 border-2 rounded-md' />
              </div>
              <div className=''>
                <label>Description</label>
                <input type='text' defaultValue={fileDescription} placeholder='Fie Description' className='w-full h-12 border-2 rounded-md' />
              </div>
              {/* <p className=' text-right'><small>10:20PM</small></p> */}
              <ButtonComp onClick={()=>closeFileView()} name='Close'/>
              {/* <ButtonComp name='Update FIle Info'/> */}
          </div>
        </div>
    </>
  )
}

export default FileOtherDiv