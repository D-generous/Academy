import React from 'react'

const FileViewer = ({fileLink, fileType, width, height}) => {
  return (
    <>
        <div className='FileViewer' style={{width, height}}>
            {fileType.includes('.docx')?
            <>
                <object data={fileLink} type="application/pdf" width="100%" height="100%">
                    <p>Alternative text - include a link <a href={fileLink} download>to the PDF!</a></p>
                </object>
            </>: ''}
            {fileType.includes('.mp3')?
            <>
                <audio width="100%" height="100%" src={fileLink} controls></audio>
            </>: ''}
            {fileType.includes('.mpeg')?
            <>
                <video className='w-full aspect-video' src={fileLink} controls></video>
            </>: ''}
            {fileType.includes('.jpeg')?
            <>
                <img src={fileLink} alt="" style={{width: '100%', height: '100%'}} />
            </>: ''}
        </div>
    </>
  )
}

export default FileViewer