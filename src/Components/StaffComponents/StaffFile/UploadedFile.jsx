import React , {useEffect} from 'react'
// import ButtonComp from '../../ButtonComp';



const UploadedFile = () => {
    
    useEffect(() => {
    //   document.getElementByI d('uploadedfile').pause = true
    }, [])
    
  return (
    <>
        <div className="UploadedFile my-2" >
            <h4 onClick={openFileView} className=' my-1'>Name: Lesson Note - Plant Cells</h4>
            {/* <object id='uploadedfile' data="vid.mp4" controls type="video/webm" pause='true' width="100%" height="100%">
                <p>Alternative text - include a link <a href="port.pdf">to the PDF!</a></p>
            </object> */}
            <video src="vid.mp4"  width="100%" className=' aspect-video' controls pause='true'></video>
            
        </div>
    </>
  )
}

export default UploadedFile