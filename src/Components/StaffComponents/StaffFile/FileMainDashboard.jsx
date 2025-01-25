import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import FileViewer from '../../../FileViewer'
import { backendurl } from '../../../../constants/backendurl';





const FileMainDashboard = () => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  const [fileType, setfileType] = useState('.txt, .pdf, .doc, .docx, .rtf, .ppt, .pptx')
  const [fileTitle, setfileTitle] = useState('')
  const [fileDescription, setfileDescription] = useState('')
  const [fileBase64, setfileBase64] = useState('')
  const [fileName, setfileName] = useState('')
  const selectFile =(e)=>{
    let selected = e.target.files[0]
    setfileName(selected.name)
    let reader = new FileReader();
    reader.readAsDataURL(selected)
    reader.onload =()=>{
      setfileBase64(reader.result)
    }
  }
  const uploadFile = async()=>{
    let fileDetails = {
      fileTitle,
      fileDescription,
      fileBase64,
      fileName,
      class: staffInfo.class,
      email: staffInfo.email,
      fileType
    }
    console.log(fileDetails);
    let fileEndpoint = `${backendurl}staff/upload`
    try {
      const response = await axios.post(fileEndpoint, fileDetails)
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <>
        <div className="FileMainDashboard middleDiv">
            {/* <FileView/> */}
            {/* type="application/pdf" can also be added */} 
            <div>

              <form action="" method="post">
                <label htmlFor="fileTitle">File Title</label>
                <input type="text" onKeyUp={(e)=>setfileTitle(e.target.value)} className=' my-1 w-full rounded-md p-2 focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-500' placeholder='File Title' />
                <label htmlFor="">File's Description</label>
                <textarea name="" id="" onKeyUp={(e)=>setfileDescription(e.target.value)} className=' my-1 w-full h-24 focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-500 p-2' placeholder='Post Describtion'></textarea>
                <label htmlFor="fileType">File Type</label>
                <select name="" id="" value=".txt, .pdf, .doc, .docx, .rtf, .ppt, .pptx" onChange={(e)=>{
                  setfileType(e.target.value);
                  setfileBase64('')
                }} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-full  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50 px-6 my-2'>
                  <option value=".mp4, .webm, .mpe, .mpv, .avi, .mpeg">Video</option>
                  <option value=".jpeg, .jpg, .gif, .tif, .psd">Image</option>
                  <option value=".mp4a, .flac, .mp4, .mp3, .wav">Audio</option>
                  <option value=".txt, .pdf, .doc, .docx, .rtf, .ppt, .pptx">Documents</option>
                </select>
                <label htmlFor="" className='w-full'>
                    <span className="sr-only">Choose Fil To Upload</span>
                    <input type="file" accept={fileType} onChange={(e)=>selectFile(e)} className=' w-full my-1 block text-sm text-slate-500 file:mr-4 file:py-2 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100' />
                </label>
                <div className=' w-full md:w-3/6 aspect-square block mx-auto'>
                  {fileBase64 && fileType?<>
                    <FileViewer fileLink={fileBase64} fileType={fileType} />
                  </>: <>
                    <div className=' bg-black flex w-full h-full items-center justify-center'>
                        <p className=' text-white text-center'>The Choosed File Wil Appear Here</p>
                    </div>
                  </>}
                </div>
                <button type='button' onClick={uploadFile} className=' w-3/6 block mx-auto p-2 my-1 bg-blue-600 hover:bg-blue-500 rounded-md'>Send File</button>
              </form>
              
            </div>
        </div>
    </>
  )
}

export default FileMainDashboard