import React, {useEffect, useState} from 'react'
import NewPasswordForm from './NewPasswordForm'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { backendurl } from '../../../../constants/backendurl';



const SetNewPasswordForm = ({token}) => {
  const navigate = useNavigate();
  const [userDetails, setuserDetails] = useState({})
  

  useEffect(()=>{
    axios.post(`${backendurl}student/check_password_link_validity`, {token})
    .then((res)=>{
      console.log(res)
      if(res.status==203){
        alert('Invalid or expired token')
        navigate('/signin')
        return;
      }
      setuserDetails(res.data.result)
    })
    .catch((error)=>{
      console.log(error)
    })
  },[])
  return (
    <div>
      <NewPasswordForm userDetails={userDetails} />
    </div>
  )
}

export default SetNewPasswordForm;