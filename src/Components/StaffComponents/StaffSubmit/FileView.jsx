import React from 'react'

const FileView = () => {
  return (
    <>
        <object onChange={(e)=>alert('e')} data="port.pdf" type="application/pdf" width="100%" height="100%">
            <p>Alternative text - include a link <a href="port.pdf">to the PDF!</a></p>
        </object>
    </>
  )
}

export default FileView