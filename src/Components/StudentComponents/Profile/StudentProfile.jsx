import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'
import { fetchStudent, setFetched } from '../../redux/studentInformation'
import {useSelector, useDispatch} from 'react-redux'
import { backendurl } from '../../../../constants/backendurl';



const StudentProfileUpdate = () => {
    // document.querySelector("title").innerText = `404 - Error Page`
    let studentInfo = useSelector((state)=>state.studentInformation.studentInformation);
    const  token = localStorage.token
    let dispatch = useDispatch();
    const formik = useFormik({
      initialValues:{
        firstName: studentInfo.firstName,
        lastName: studentInfo.lastName,
        phoneNumber: studentInfo.phoneNumber,
        email: studentInfo.email,
        address: studentInfo.address,
        localGovernment:  studentInfo.localGovernment,
        state: studentInfo.state
      },
      onSubmit: async(values)=>{
        let endpoint = `${backendurl}student/updateinfo`
        // const update = await axios.post(endpoint, {...values, token})
        axios.post(endpoint, {...values, token})
        .then((res)=>{
          console.log(res)
          if(res.status==200){
            dispatch(fetchStudent(res.data))
          } else {
            console.log(res)
          }
        })
        .catch((error)=>{
          console.log(error)
        })
        
        // update.status==200?dispatch(fetchStudent(update.data)):console.log(update)
      }
    })
  return (
    <>
        <div className='w-100 px-4'>
          <h3>Edit Your Profile</h3>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor='firstName'>First Name</label>
            <input disabled type='text' {...formik.getFieldProps('firstName')} className='form-control' placeholder='First Name' id='firstName' />
            <label htmlFor='lastName'>Last Name</label>
            <input disabled type='text'{...formik.getFieldProps('lastName')} className='form-control' placeholder='Last Name' id='lastName' />
            <label htmlFor='email'>Email</label>
            <input disabled type='email' {...formik.getFieldProps('email')} className='form-control' placeholder='Email' id='email' />
            <label htmlFor='phoneNumber'>Phone Number</label>
            <input disabled type='tel' {...formik.getFieldProps('phoneNumber')} className='form-control' placeholder='Phone Number' id='phoneNumber' />
            <label htmlFor='address'>Address</label>
            <input disabled type='text' {...formik.getFieldProps('address')} className='form-control' placeholder='Address' id='address' />
            <label htmlFor='localGovernment'>Local Goverment</label>
            <input disabled type='text' {...formik.getFieldProps('localGovernment')} className='form-control' placeholder='Local Goverment' id='localGovernment' />
            <label htmlFor='state'>State</label>
            <input disabled type='text' {...formik.getFieldProps('state')} className='form-control' placeholder='State' id='state' />
            {/* <button type='submit' className='btn blue500 my-2 w-100'>Update Profile</button> */}
          </form>
        </div>
    </>
  )
}

export default StudentProfileUpdate