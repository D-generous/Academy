import React, { useState, useEffect } from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import FetchAllStudentsAndStaffs from '../../../CustomHooks/AdminHooks/FetchAllStudentsAndStaffs'
import axios from 'axios';
import { toast } from 'react-toastify';
import { backendurl } from '../../../../constants/backendurl';



const CourseForm = () => {
  const [allStudents, allStaffs] = FetchAllStudentsAndStaffs();
  const [staffs, setstaffs] = useState();
  const [staffsClass, setstaffsClass] = useState(0);
  useEffect(() => {
    if (allStaffs) {
      setstaffs(allStaffs[staffsClass])
    }
  }, [allStaffs, staffsClass])
  const displayToast = (type, message) => {
    if (type == 'success') {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: '#4caf50', // Background color of the toast
          color: '#ffffff', // Text color of the toast
          fontSize: '16px', // Font size
        },
      });
    } else {
      toast.error(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        style: {
          background: '#ff5252',
          color: '#ffffff',
          fontSize: '16px',
        },
      });
    }
  }
  const formik = useFormik({
    initialValues: {
      courseName: '',
      courseDescription: '',
      image: '',
      class: 0,
      staffId: ''
    },
    validationSchema: Yup.object({
      courseName: Yup.string().required('Course Name Is Required'),
      courseDescription: Yup.string().required('Course Description Is Required'),
      image: Yup.string().required('Please select an image'),
      class: Yup.string().required('Please select a class'),
      staffId: Yup.string().required('Please select a staff')
    }),
    onSubmit: (values) => {
      axios.post(`${backendurl}admin/create_course`, values)
        .then((res) => {
          if (res.status == 200) {
            displayToast('success', 'Course Added Successfully')
            formik.resetForm();
          }
        })
        .catch((error) => {
          console.log(error)
          if (error.response.status == 467) {
            displayToast('error', 'This Course Already Exist')
          } else if (error.response.status == 468) {
            displayToast('error', 'This STaff Has Been Assigned To A Subject')
          } else {
            displayToast('error', 'Error Occurred')
          }
        })

    },
    onError: (error) => {
      console.log(error)
    }
  });

  const selectFile = (e) => {
    let selected = e.target.files[0]
    let reader = new FileReader();
    reader.readAsDataURL(selected)
    reader.onload = () => {
      formik.setFieldValue('image', reader.result);
    }
  }

  return (
    <div className='p-5 bg-slate-300'>
      <h5 className='text-2xl my-5'>New Course</h5>
      <form action="" onSubmit={formik.handleSubmit} className='w-full p-2 bg-slate-50'>
        <div className='grid grid-cols-1 md:flex my-2 w-full gap-3'>
          <label htmlFor="courseName" className=' md:basis-1/6 text-xl'>Course Name</label>
          <div className='basis-5/6'>
            <input id='courseName' value={formik.values.courseName} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='h-12 w-full border-none outline-none ring focus:ring-blue-500' />
            {formik.touched.courseName && formik.errors.courseName ? (<p className="mt-2 text-sm text-red-600">{formik.errors.courseName}</p>) : null}
          </div>
        </div>
        <div className='grid grid-cols-1 md:flex my-2 w-full gap-3 '>
          <label htmlFor="courseDescription" className=' md:basis-1/6 text-xl'>Description</label>
          <div className='basis-5/6'>
            <textarea id='courseDescription' value={formik.values.courseDescription} onChange={formik.handleChange} onBlur={formik.handleBlur} type="text" className='h-24 w-full border-none outline-none ring focus:ring-blue-500' />
            {formik.touched.courseDescription && formik.errors.courseDescription ? (<p className="mt-2 text-sm text-red-600">{formik.errors.courseDescription}</p>) : null}
          </div>
        </div>
        <div className='grid grid-cols-1 md:flex my-2 w-full gap-3 '>
          <label htmlFor="image" className=' md:basis-1/6 text-xl'>Subject Image</label>
          <div className='basis-5/6'>
            <input id='image' onChange={(e) => selectFile(e)} onBlur={formik.handleBlur} type="file" accept='.jpg, .jpeg, .png' className='w-full file:mr-4 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-bold file:bg-blue-50 file:text-blue-700 hover:file:bg-violet-100 rounded-md p-2 h-12' />
            {formik.touched.image && formik.errors.image ? (<p className="mt-2 text-sm text-red-600">{formik.errors.image}</p>) : null}
          </div>
        </div>
        <div className='grid grid-cols-1 md:flex my-2 w-full gap-3 '>
          <label htmlFor="class" className=' md:basis-1/6 text-xl'>Assigned Class</label>
          <select name="class" id="class" value={formik.values.class} onChange={(e) => {
            setstaffsClass(e.target.value)
            formik.handleChange(e)
          }} onBlur={formik.handleBlur} className=' text-black focus:border-blue-600 border-2 border-blue-300 basis-5/6 h-12'>
            <option value={0}>JSS 1</option>
            <option value={1}>JSS 2</option>
            <option value={2}>JSS 3</option>
            <option value={3}>SSS 1</option>
            <option value={4}>SSS 2</option>
            <option value={5}>SSS 3</option>
          </select>
          {formik.touched.class && formik.errors.class ? (<p className="mt-2 text-sm text-red-600">{formik.errors.class}</p>) : null}
        </div>
        <div className='grid grid-cols-1 md:flex my-2 w-full gap-3 '>
          <label htmlFor="staffId" className=' md:basis-1/6 text-xl'>Assigned Class</label>
          <select name="staffId" id="staffId" value={formik.values.staffId} onChange={formik.handleChange} onBlur={formik.handleBlur} className=' text-black focus:border-blue-600 border-2 border-blue-300 basis-5/6 h-12'>
            {staffs?.length >= 1 ? staffs.map((staff, index) => (
              <option selected={index == 0} value={staff._id}>{`${staff.firstName} ${staff.lastName}`}</option>
            )) : <option>No Staff In This Class Yet</option>}
          </select>
          {formik.touched.staffId && formik.errors.staffId ? (<p className="mt-2 text-sm text-red-600">{formik.errors.staffId}</p>) : null}
        </div>
        <div className='flex'>
          <button type='submit' className='bg-blue-700 text-white ms-auto px-9 py-2 rounded-lg'>Add</button>
        </div>
      </form>
    </div>
  )
}

export default CourseForm