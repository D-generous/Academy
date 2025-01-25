import React, {useEffect} from 'react'

const SnackBar = ({type, body, display}) => {
    // const showSnackBar = () => {
    //     // Get the snackbar DIV
    //     var x = document.getElementById("snackbar");
    //     x.className = "show";
      
    //     setTimeout(()=>{ x.className = x.className.replace("show", ""); }, 3000);
    // }
    // useEffect(() => {
    //   if (display==true) {
    //     showSnackBar()
    //   }
    // }, [])
    
  return (
    <>
        <div id="snackbar" className={type=='info'?'bg-green-500':'bg-red-500'}> <i className={type=='info'?'fas fa-circle-check':'fas fa-warning'}></i>{body}</div>
    </>
  )
}

export default SnackBar