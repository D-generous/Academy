import { useFormik } from 'formik'
import React from 'react'
import axios from 'axios'
import { fetchStudent, setFetched } from '../../../redux/studentInformation'
import { useSelector, useDispatch } from 'react-redux'
import { backendurl } from '../../../../constants/backendurl';



const StudentProfileUpdate = () => {
    // document.querySelector("title").innerText = `404 - Error Page`
    let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
    const token = localStorage.token
    let dispatch = useDispatch();
    const formik = useFormik({
        initialValues: {
            firstName: studentInfo.firstName,
            lastName: studentInfo.lastName,
            phoneNumber: studentInfo.phoneNumber,
            email: studentInfo.email,
            address: studentInfo.address,
            localGovernment: studentInfo.localGovernment,
            state: studentInfo.state
        },
        onSubmit: async (values) => {
            let endpoint = `${backendurl}student/updateinfo`
            // const update = await axios.post(endpoint, {...values, token})
            axios.post(endpoint, { ...values, token })
                .then((res) => {
                    console.log(res)
                    if (res.status == 200) {
                        dispatch(fetchStudent(res.data))
                    } else {
                        console.log(res)
                    }
                })
                .catch((error) => {
                    console.log(error)
                })

            // update.status==200?dispatch(fetchStudent(update.data)):console.log(update)
        }
    })
    return (
        <>
            <div className='w-full px-4'>
                <h3 className='mb-4 text-2xl'>Edit Your Profile</h3>
                <form onSubmit={formik.handleSubmit} className='space-y-4'>
                    <div className='mb-4'>
                        <label htmlFor='firstName' className='block font-semibold'>First Name</label>
                        <input
                            disabled
                            type='text'
                            {...formik.getFieldProps('firstName')}
                            className='h-12 w-full p-2 my-1 border-2 rounded-md'
                            placeholder='First Name'
                            id='firstName'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='lastName' className='block font-semibold'>Last Name</label>
                        <input
                            disabled
                            type='text'
                            {...formik.getFieldProps('lastName')}
                            className='h-12 w-full p-2 my-1 border-2 rounded-md'
                            placeholder='Last Name'
                            id='lastName'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='email' className='block font-semibold'>Email</label>
                        <input
                            disabled
                            type='email'
                            {...formik.getFieldProps('email')}
                            className='h-12 w-full p-2 my-1 border-2 rounded-md'
                            placeholder='Email'
                            id='email'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='phoneNumber' className='block font-semibold'>Phone Number</label>
                        <input
                            disabled
                            type='tel'
                            {...formik.getFieldProps('phoneNumber')}
                            className='h-12 w-full p-2 my-1 border-2 rounded-md'
                            placeholder='Phone Number'
                            id='phoneNumber'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='address' className='block font-semibold'>Address</label>
                        <input
                            disabled
                            type='text'
                            {...formik.getFieldProps('address')}
                            className='h-12 w-full p-2 my-1 border-2 rounded-md'
                            placeholder='Address'
                            id='address'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='localGovernment' className='block font-semibold'>Local Government</label>
                        <input
                            disabled
                            type='text'
                            {...formik.getFieldProps('localGovernment')}
                            className='h-12 w-full p-2 my-1 border-2 rounded-md'
                            placeholder='Local Government'
                            id='localGovernment'
                        />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor='state' className='block font-semibold'>State</label>
                        <input
                            disabled
                            type='text'
                            {...formik.getFieldProps('state')}
                            className='h-12 w-full p-2 my-1 border-2 rounded-md'
                            placeholder='State'
                            id='state'
                        />
                    </div>
                    {/* <button type='submit' className='btn bg-blue-500 text-white py-2 w-full'>
                        Update Profile
                    </button> */}
                </form>
            </div>
        </>
    )
}

export default StudentProfileUpdate