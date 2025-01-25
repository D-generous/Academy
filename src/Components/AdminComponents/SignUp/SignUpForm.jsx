import React, {useEffect, useState} from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import FileViewer from '../../../FileViewer';
import {useNavigate} from 'react-router-dom';
import DisplayToast from '../../../CustomHooks/DisplayToast';
import { backendurl } from '../../../../constants/backendurl';



const SignUpForm = () => {
  document.querySelector('title').innerText = 'Sign Up | Admin'; 
  const navigate = useNavigate();
  const [fileType, setfileType] = useState('.jpeg, .jpg, .gif, .tif, .psd')
  const [imageBase64, setfileBase64] = useState('')
  const [states, setstates] = useState([]);
  const [LGAs, setLGAs] = useState([]);
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: '',
      phoneNumber: '',
      dateOfBirth: '',
      state: '',
      localGovernment: '',
      imageBase64: '',
      adminToken: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
      address: Yup.string().required('Address is required'),
      phoneNumber: Yup.string().required('Phone Number is required'),
      dateOfBirth: Yup.date().required('Date of Birth is required'),
      adminToken: Yup.string().required('Existing Admin Token Is Required To Sign Up'),
      state: Yup.string().required('Please select state'),
      localGovernment: Yup.string().required('Please select local government'),
      imageBase64: Yup.string().required('Please select an image'),
    }),
    onSubmit: (values) => {
      axios.post(`${backendurl}admin/sign_up`, values)
      .then((res)=>{
        DisplayToast('success', 'Signup successful!')
        navigate('/admin/signin');
      })
      .catch((error)=>{
        if (error.response.status==408) {
          DisplayToast('error', 'Email Already Exist');
        } else if (error.response.status==408) {
          DisplayToast('error', 'Invalid Admin Sign Up Token');
        } else {
          DisplayToast('error', 'An Error Occurred, Please Try Again');
        }
      })
      
    },
    onError: (error) => {
      console.log(error)
    }
  });

  useEffect(()=>{
    fetchStates()
    fetchLGA()
  },[])

  const selectFile =(e)=>{
    let selected = e.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(selected)
    reader.onload =()=>{
      setfileBase64(reader.result);
      formik.setFieldValue('imageBase64', reader.result);
    }
  }

  const fetchStates = async()=>{
    let states = await axios.get('https://nga-states-lga.onrender.com/fetch')
    setstates(states.data)
  }

  const fetchLGA = async(value='Oyo')=>{
    const LGAS = await axios.get(`https://nga-states-lga.onrender.com/?state=${value}`)
    setLGAs(LGAS.data)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Admin Sign Up</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="firstName" className="text-gray-600">  First Name</label>
              <input id="firstName" name="firstName" placeholder='First Name' type="text" autoComplete="firstName" value={formik.values.firstName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              {formik.touched.firstName && formik.errors.firstName ? (<p className="mt-2 text-sm text-red-600">{formik.errors.firstName}</p>) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="lastName" className="text-gray-600">  Last Name</label>
              <input id="lastName" name="lastName" placeholder='Last Name' type="text" autoComplete="lastName" value={formik.values.lastName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              {formik.touched.lastName && formik.errors.lastName ? (<p className="mt-2 text-sm text-red-600">{formik.errors.lastName}</p>) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-gray-600">  Email</label>
              <input id="email" name="email" type="email" placeholder='Email' autoComplete="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              {formik.touched.email && formik.errors.email ? (<p className="mt-2 text-sm text-red-600">{formik.errors.email}</p>) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="text-gray-600">  Phone Number</label>
              <input id="phoneNumber" name="phoneNumber" type="tel" placeholder='Phone Number' autoComplete="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              {formik.touched.phoneNumber && formik.errors.phoneNumber ? (<p className="mt-2 text-sm text-red-600">{formik.errors.phoneNumber}</p>) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="dateOfBirth" className="text-gray-600">  Date Of Birth</label>
              <input id="dateOfBirth" name="dateOfBirth" type='date' autoComplete="dateOfBirth" value={formik.values.dateOfBirth} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (<p className="mt-2 text-sm text-red-600">{formik.errors.dateOfBirth}</p>) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="text-gray-600"> Password</label>
              <input id="password" name="password" type="password" placeholder='Password' autoComplete="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              {formik.touched.password && formik.errors.password ? (<p className="mt-2 text-sm text-red-600">{formik.errors.password}</p>) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="address" className="text-gray-600">  Address</label>
              <input id="address" name="address" type="address" placeholder='Address' autoComplete="address" value={formik.values.address} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              {formik.touched.address && formik.errors.address ? (<p className="mt-2 text-sm text-red-600">{formik.errors.address}</p>) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="state" className="text-gray-600"> State</label>
              <select id="state" name="state" onChange={(e)=>{
                fetchLGA(e.target.value);
                formik.handleChange(e);
              }} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                {states?states.map((state)=>(
                    <option value={state}>{state}</option>
                )):(<option value={null}>Fetching All States</option>)}
              </select>
              {formik.touched.state && formik.errors.state ? (<p className="mt-2 text-sm text-red-600">{formik.errors.state}</p>) : null}
            </div>
            <div className="mb-4">
              <label htmlFor="localGovernment" className="text-gray-600">  Local Government</label>
              <select id="localGovernment" name="localGovernment" onChange={formik.handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                {LGAs?LGAs.map((LGA)=>(
                    <option value={LGA}>{LGA}</option>
                )):(<option value={null}>Fetching All Local Government</option>)}
              </select>
              {formik.touched.localGovernment && formik.errors.localGovernment ? (<p className="mt-2 text-sm text-red-600">{formik.errors.localGovernment}</p>) : null}
            </div>        
            <div className="mb-4">
              <label htmlFor="adminToken" className="text-gray-600">  Existing Admin Token</label>
              <input id="adminToken" name="adminToken" type="text" placeholder='Admin Token' autoComplete="adminToken" value={formik.values.adminToken} onChange={formik.handleChange} onBlur={formik.handleBlur} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/>
              {formik.touched.adminToken && formik.errors.adminToken ? (<p className="mt-2 text-sm text-red-600">{formik.errors.adminToken}</p>) : null}
            </div>
            <div className="mb-4">
            <label htmlFor="" className='w-full'>
              <span className="sr-only">Choose File To Upload</span>
              <input type="file" accept={fileType} onChange={(e) => selectFile(e)} className=' w-full my-1 block text-sm text-slate-500 file:mr-4 file:py-2 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100' />
            </label>
              {formik.touched.imageBase64 && formik.errors.imageBase64 ? (<p className="mt-2 text-sm text-red-600">{formik.errors.imageBase64}</p>) : null}
            </div>
            
            <div className=' w-full md:w-3/6 aspect-square block mx-auto'>
                {imageBase64 && fileType ? <>
                    <FileViewer fileLink={imageBase64} fileType={fileType} />
                </> : <>
                    <div className=' bg-black flex w-full h-full items-center justify-center'>
                        <p className=' text-white text-center'>Profile Picture</p>
                    </div>
                </>}
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="group relative w-full flex justify-center my-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
