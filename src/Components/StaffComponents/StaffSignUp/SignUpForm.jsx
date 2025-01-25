import axios from 'axios';
import { useFormik, validateYupSchema } from 'formik';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import * as Yup from 'yup';
// import SnackBar from '../SnackBar'
import { useSelector, useDispatch } from 'react-redux';
import FetchStatesAndLGAs from '../../../CustomHooks/FetchStatesAndLGAs';
import FileViewer from '../../../FileViewer';
import DisplayToast from '../../../CustomHooks/DisplayToast';
import { updateAllStaffs, updateAStaff, setFetchingState } from '../../../redux/adminInformation';
import fetchBanksList from '../../../CustomHooks/fetchBanksList';
import { subjects } from '../../../../constants/subjects';
// import FetchAllStudentsAndStaffs from '../../CustomHooks/AdminHooks/FetchAllStudentsAndStaffs'
import { backendurl } from '../../../../constants/backendurl';
import { CircularProgress } from '@mui/material';




const SignUpForm = ({ type, data }) => {
  const dispatch = useDispatch();
  const [fileType, setfileType] = useState('.jpeg, .jpg, .gif, .tif, .psd');
  const [imageBase64, setimageBase64] = useState('');
  const [states, LGAs] = FetchStatesAndLGAs();
  const [banksList] = fetchBanksList();
  const [accountName, setaccountName] = useState('Account Name Will Show Here');
  const [submittingForm, setSubmittingForm] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: type == 'edit' ? data?.firstName : '',
      lastName: type == 'edit' ? data?.lastName : '',
      phoneNumber: type == 'edit' ? data?.phoneNumber : '',
      email: type == 'edit' ? data?.email : '',
      password: type == 'edit' ? 'nulljhjh' : '',
      accountName: type == 'edit' ? data?.accountName : '',
      accountNumber: type == 'edit' ? data?.accountNumber : '',
      bankName: type == 'edit' ? data?.bankName : '',
      bankCode: type == 'edit' ? data?.bankCode : '',
      staffIndex: type == 'signup' ? null : 0,
      adminToken: '',
      class: 0,
      address: type == 'edit' ? data?.address : '',
      localGovernment: type == 'edit' ? data?.localGovernment : '',
      imageBase64: type == 'edit' ? data?.pictureUrl : 'ees',
      state: '',
    },
    validationSchema: Yup.object({
      firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
      phoneNumber: Yup.string().min(2, 'Invalid Phone Number').max(14, 'Invalid Phone Number').required('Required'),
      email: Yup.string().email('Invalid email').required('Required'),
      password: type != 'edit' ? Yup.string().min(5, 'Too Short').max(40, 'Too Long').required('Required') : Yup.string(),
      address: Yup.string().min(2, 'Too Short').max(230, 'Too Long').required('Required'),
      // state: Yup.string().required('Please Select A State'),
      imageBase64: Yup.string().required('Please Select An Image'),
      // localGovernment: Yup.string().required('Please Select A Local Government'),
      adminToken: Yup.string().required('Admin token is required'),
      accountNumber: type == 'edit' ? Yup.string().matches(/^\d{10}$/, 'Account Number must be exactly 10 digits').required('Account Number Is Required') : Yup.string(),
      bankCode: type == 'edit' ? Yup.string().required('Please Select A Bank') : Yup.string(),
    }),
    onSubmit: (values) => {
      submit(values);
    },
  })

  const selectFile = (e) => {
    let selected = e.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(selected)
    reader.onload = () => {
      setimageBase64(reader.result)
      formik.setFieldValue('imageBase64', reader.result);
    }
  }

  const submit = (values) => {
    let details = {
      firstName: values.firstName,
      lastName: values.lastName,
      phoneNumber: values.phoneNumber,
      email: values.email,
      password: values.password,
      staffIndex: values.staffIndex,
      imageBase64,
      adminToken: values.adminToken,
      accountName: values.accountName,
      accountNumber: values.accountNumber,
      bankName: values.bankName,
      bankCode: values.bankCode,
      class: values.class,
      address: values.address,
      localGovernment: values.localGovernment,
      state: values.state,
      links: {
        facebook: '',
        twitter: '',
        whatsapp: '',
        other: ''
      },
      subjectInfo: {
        subjectName: subjects[values?.staffIndex],
        subjectDescription: '',
        subjectPicUrl: ''
      },
    }
    if (type == 'create' || type == 'signup') {
      let endpoint = `${backendurl}staff/signup`
      axios.post(endpoint, details)
        .then((res) => {
          if (res.status == 200) {
            DisplayToast('success', 'Account Created Successfully')
            formik.resetForm();
            if (type == 'signup') {
              navigate("/staff/signin")
            } else {
              dispatch(updateAllStaffs({ index: values.class, newData: values }))
            }
          }
        })
        .catch((err) => {
          console.log(err);
          if (res.status == 478) {
            DisplayToast('error', 'Email already exist')
            setsigningUp(false)
          } else if (res.status == 477) {
            DisplayToast('error', 'Invalid admin token')
            setsigningUp(false)
          } else {

          }
          DisplayToast('error', 'An Unknown Error Occurred, Please Try Again')
        })
    }
    if (type == 'edit') {
      let endpoint = `${backendurl}admin/update_staff`
      let { links, password, ...updateDetails } = details;
      axios.post(endpoint, updateDetails)
        .then((res) => {
          if (res.status == 200) {
            DisplayToast('success', 'Account Updated Successfully')
            formik.resetForm();
            if (type == 'signup') {
              navigate("/staff/signin")
            } else {
              dispatch(updateAStaff({ index: values.class, newData: { ...data, ...updateDetails, _id: data._id } }))
            }
          } else if (res.status == 11000) {
            DisplayToast('error', 'Email Already Exist')
            setsigningUp(false)
          } else if (res.status == 401) {
            DisplayToast('error', 'Error! Ensure You Fill All Reqired Informations Correctly')
            setsigningUp(false)
          } else {
            DisplayToast('error', 'An Error Occurred! Please Try Again')
          }
        })
        .catch((err) => {
          console.log(err);
          DisplayToast('error', 'An Error Occurred! Please Try Again')
          setsigningUp(false)
        })
    }
  }

  useEffect(() => {
    if (type == 'edit') {
      setimageBase64(data.pictureUrl)
    }
  }, [])

  const fetchAccountDetails = async () => {
    let bankCode = (JSON.parse(document.getElementById('bankCode').value)).value
    let accountNumber = document.getElementById('accountNumber').value
    if (accountNumber.length == 10 && bankCode != '') {
      setaccountName('Fetching Your Details...')
      let getAccountDetails = await axios.get(`https://hopeacademy.vercel.app/get_account_details?bankCode=${bankCode}&accountNumber=${accountNumber}`)
      if (getAccountDetails.status) {
        formik.setFieldValue('accountName', getAccountDetails.account_name)
        setaccountName(getAccountDetails.account_name)
      } else if (!getAccountDetails.status) {
        setaccountName('No Matching Details')
      }
    }
  }

  return (
    <>
      <div className='basis-2/5'>
        <form onSubmit={formik.handleSubmit} className="w-full px-5 h-auto block mx-auto">
          {type == 'signup' ? <h3 className='text-center text-blue-600 font-bold text-3xl'>Create An Account Form</h3> : null}
          <label htmlFor="" className='my-2 font-semibold'>First Name</label>
          <input type="text" required name='firstName' {...formik.getFieldProps('firstName')} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' placeholder='First Name' />
          <small className='text-red-500'>{formik.touched.firstName && formik.errors.firstName}</small><br />
          <label htmlFor="" className='my-2 font-semibold'>Last Name</label>
          <input type="text" required name='lastName' {...formik.getFieldProps('lastName')} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' placeholder='Last Name' />
          <small className='text-red-500'>{formik.touched.lastName && formik.errors.lastName}</small><br />
          <label htmlFor="" className='my-2 font-semibold'>Email</label>
          <input type="text" required name='email' {...formik.getFieldProps('email')} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' placeholder='Email' />
          <small className='text-red-500'>{formik.touched.email && formik.errors.email}</small><br />
          <label htmlFor="" className='my-2 font-semibold'>Phone Number</label>
          <input type="text" required name='phoneNumber' {...formik.getFieldProps('phoneNumber')} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' placeholder='Phone Number' />
          <small className='text-red-500'>{formik.touched.phoneNumber && formik.errors.phoneNumber}</small><br />
          {type != 'edit' && (<>
            <label htmlFor="">Password</label>
            <input type="password" required name='password' {...formik.getFieldProps('password')} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' placeholder='Staff Password' />
            <small className='text-red-500'>{formik.touched.password && formik.errors.password}</small><br />
          </>)}
          <label htmlFor="" className='my-2 font-semibold'>Class</label>
          <select name="class" id="class" required onChange={formik.handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
            <option value="0" selected={type != 'edit' ? true : data.class == 0 ? true : false}>JSS1</option>
            <option value="1">JSS2</option>
            <option value="2">JSS3</option>
            <option value="3">SSS1</option>
            <option value="4">SSS2</option>
            <option value="5">SSS3</option>
          </select>
          {type == 'create' && (<>
            <label htmlFor="staffIndex" className=''>Subject To Offer</label>
            <select name="staffIndex" onChange={formik.handleChange} id="staffIndex" className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              {subjects.map((subject, index) => (
                <option value={index} selected={subject.includes('MATHEMA') ? true : false}>{subject}</option>
              ))}
            </select>
          </>)}
          {type == 'edit' && (<>
            <label htmlFor="staffIndex" className='my-2 font-semibold'>Subject To Offer</label>
            <select name="staffIndex" onChange={formik.handleChange} id="staffIndex" className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              {subjects.map((subject, index) => (
                <option value={index} selected={data.subjectInfo.subjectName == subject ? true : false}>{subject}</option>
              ))}
            </select>
            <div className="mb-4">
              <label htmlFor="state" className='my-2 font-semibold'>  Select Your Bank</label>
              <select id="bankCode" name="bankCode" onChange={(e) => {
                formik.setFieldValue('bankCode', (JSON.parse(e.target.value)).value)
                formik.setFieldValue('bankName', (JSON.parse(e.target.value)).label)
                fetchAccountDetails()
              }} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                {banksList ? banksList.map((bankDetails) => (
                  <option value={JSON.stringify(bankDetails)}>{bankDetails.label}</option>
                )) : (<option value={null}>Fetching All Banks</option>)}
              </select>
              {formik.touched.bankCode && formik.errors.bankCode ? (<p className="mt-2 text-sm text-red-600">{formik.errors.bankCode}</p>) : null}
              <label htmlFor="" className='my-2 font-semibold'>Account Number</label>
              <input type="text" name='accountNumber' id='accountNumber' onChange={(e) => {
                formik.handleChange(e)
                fetchAccountDetails()
              }} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' placeholder='Account Number' />
              {formik.touched.accountNumber && formik.errors.accountNumber ? (<p className="mt-2 text-sm text-red-600">{formik.errors.accountNumber}</p>) : null}
              <p className='w-full h-12 my-2 rounded-md bg-white text-black p-2'>{accountName}</p>
            </div>
          </>)}
          <label htmlFor="" className='my-2 font-semibold'>Address</label>
          <input type="text" required name='address' {...formik.getFieldProps('address')} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' placeholder='Address' />
          <small className='text-red-500'>{formik.touched.address && formik.errors.address}</small><br />
          <div className="mb-4">
            <label htmlFor="state" className='my-2 font-semibold'>  State</label>
            <select id="state" name="state" onChange={(e) => {
              formik.handleChange(e);
              FetchStatesAndLGAs(e.target.value);
            }} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              {states ? states.map((state) => (
                <option value={state}>{state}</option>
              )) : (<option value={null}>Fetching All States</option>)}
            </select>
            {formik.touched.state && formik.errors.state ? (<p className="mt-2 text-sm text-red-600">{formik.errors.state}</p>) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="localGovernment" className='my-2 font-semibold'>  Local Government</label>
            <select id="localGovernment" name="localGovernment" onChange={formik.handleChange} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
              {LGAs ? LGAs.map((LGA) => (
                <option value={LGA}>{LGA}</option>
              )) : (<option value={null}>Fetching All Local Government</option>)}
            </select>
            {formik.touched.localGovernment && formik.errors.localGovernment ? (<p className="mt-2 text-sm text-red-600">{formik.errors.localGovernment}</p>) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="adminToken" className='my-2 font-semibold'> Admin Token</label>
            <input type="text" name='adminToken' id='adminToken' {...formik.getFieldProps('adminToken')} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' placeholder='Admin Token' />
            {formik.touched.adminToken && formik.errors.adminToken ? (<p className="mt-2 text-sm text-red-600">{formik.errors.adminToken}</p>) : null}
          </div>
          <div className="mb-4">
            <label htmlFor="" className='w-full'>
              <span className="sr-only">Choose File To Upload</span>
              <input type="file" accept={fileType} onChange={(e) => selectFile(e)} className=' w-full my-1 block text-sm text-slate-500 file:mr-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100' />
            </label>
            {formik.touched.imageBase64 && formik.errors.imageBase64 ? (<p className="mt-2 text-sm text-red-600">{formik.errors.imageBase64}</p>) : null}
          </div>
          <div className=' w-full md:w-3/6 aspect-square block rounded-lg mx-auto overflow-hidden'>
            {imageBase64 ? <>
              <FileViewer fileLink={imageBase64} fileType={fileType} />
            </> : <>
              <div className=' bg-black flex w-full h-full items-center justify-center'>
                <p className=' text-white text-center'>Profile Picture</p>
              </div>
            </>}
          </div>
          <input type="checkbox" className='accent-red-400' name="agreement" id="" /><small className='text-red-500'>Agreed to <Link to='/' className='inline'>Terms</Link> and <Link to='/' className='inline'>Conditions</Link></small>
          <button type='submit' disabled={submittingForm} className='block py-2 bg-blue-500 w-full rounded-md hover:bg-blue-600'>{(submittingForm) ? <CircularProgress color='inherit' size={30} /> : (type == 'create') ? 'Create Account' : (type == 'edit') ? 'Update Account' : 'Sign Up'}</button>
          <p>Already have an account? <Link className='inline text-blue-700' to='/staff/signin'>Sign In</Link></p>
        </form>
      </div>
    </>
  )
}

export default SignUpForm