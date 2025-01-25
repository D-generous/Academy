import axios from 'axios'
import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import SnackBar from './SnackBar'
import { backendurl } from '../../constants/backendurl';



const ValidateToken = () => {
    const navigate = useNavigate()
    const [snacksBarBody, setsnacksBarBody] = useState('')
    const [snacksBarType, setsnacksBarType] = useState('info')
    const [display, setdisplay] = useState('false')
    
    const showSnackBar = () => {
        setdisplay(true)
        setTimeout(()=>setdisplay(false), 3000);
    }

    useEffect(() => {
        validateStaff()
    }, [])

    const validateStaff =()=>{
        let token = localStorage.token
        let validateEndpoint = `${backendurl}staff/validatetoken`
        axios.get(validateEndpoint, {headers : {
          "Authorization": `Bearer ${token}`,
          "Content-Toe": "application/json",
          "Accept": "application/json"
        }})
        .then((res)=>{
          console.log(res);
          if (res.status == 200) {
            // fetchStaffInformation()
          } else{
            setsnacksBarBody('Invalid Acesss Token')
            setsnacksBarType('error')
            showSnackBar()
            setTimeout(() => navigate('/signin'), 3000);
          }
        })
        .catch((error)=>{
          setsnacksBarBody('Invalid Acesss Token')
          setsnacksBarType('error')
          showSnackBar()
          setTimeout(() => navigate('/signin'), 3000);
          console.log(error);
        })
      }
  return (
    <>
        <div style={{display: display?'block':'none'}}><SnackBar body={snacksBarBody} type={snacksBarType}/></div>
    </>
  )
}

export default ValidateToken