import axios from 'axios';
import DisplayToast from '../../../CustomHooks/DisplayToast';
import { useSelector, useDispatch } from 'react-redux';
import { addnoticesAndNews, updatenoticesAndNews } from '../../../redux/generalInformation';
import { useFormik, validateYupSchema } from 'formik';
import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import * as Yup from 'yup';
import { deletenoticesAndNews, } from '../../../redux/generalInformation';
import { backendurl } from '../../../../constants/backendurl';



const Form = ({type, data, closePopup }) => {
  const dispatch = useDispatch();
  console.log(typeof(closePopup), closePopup)
  const formik = useFormik({
    initialValues: {
      type: type=='edit'?data.type:'notice',
      body: type=='edit'?data.body:'',
      head: type=='edit'?data.head:'',
    },
    validationSchema: Yup.object({
      type: Yup.string().required('The Type Is Required'),
      body: Yup.string().required('The Body Is Required'),
      head: Yup.string().required('The Head Is Required'),
    }),
    onSubmit: async(values)=>{
      console.log(values)
      let addEndpoint = `${backendurl}admin/add_notices_and_news`;
      let editEndpoint = `${backendurl}admin/edit_notices_and_news`;
      if(type=='edit' && !data?._id){
        DisplayToast('error', 'You Cannot Update Or Delete Newly Added News Or Notice')
        return;
      }
      if(type=='edit'){
        let update = await axios.post(editEndpoint, {...values, id: data._id})
        if(update.status==200){
          dispatch(updatenoticesAndNews({newData: values, id: data._id}))
          closePopup()
          DisplayToast('success', 'Update Successful')
        } else{
          DisplayToast('error', 'An Error Occured, Please Try Again')
        }
      } else if(type=='add'){
        let add = await axios.post(addEndpoint, {...values})
        if(add.status==200){
          dispatch(addnoticesAndNews(values))
          closePopup()
          DisplayToast('success', `${values.type=='news'?'News':'Notice'} Added Successfully`)
          formik.resetForm()
        } else{
          DisplayToast('error', 'An Error Occured, Please Try Again')
        }
      }
    },
  })
  
  return (
    <form onSubmit={formik.handleSubmit} className='w-full my-2'>
        <div className="mb-4">
            <label htmlFor="type" className=''>  Select Type</label>
            <select id="type" name="type" {...formik.getFieldProps('type')} className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500">
                <option value='notice'>Notice</option>
                <option value='news'>News</option>
            </select>
            {formik.touched.type && formik.errors.type ? (<p className="mt-2 text-sm text-red-600">{formik.errors.type}</p>) : null}
        </div>
        <div className="mb-4">
        <label htmlFor="head" className=''>head: </label>
            <input type="text" name='head' id='head' {...formik.getFieldProps('head')} className='w-full h-12 border-slate-900 border-2 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' />
            {formik.touched.head && formik.errors.head ? (<p className="mt-2 text-sm text-red-600">{formik.errors.head}</p>) : null}
        </div>
        <div className="mb-4">
        <label htmlFor="body" className=''>Body: </label>
            <textarea type="text" name='body' id='body' {...formik.getFieldProps('body')} className='w-full h-24 border-slate-900 border-2 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-md  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50' ></textarea>
            {formik.touched.body && formik.errors.body ? (<p className="mt-2 text-sm text-red-600">{formik.errors.body}</p>) : null}
        </div>
        <div className='flex'><button type='submit' className='bg-blue-500 p-2 my-2 rounded-md ms-auto me-4'>{type=='edit'?'Update':'Add'}</button></div>
    </form>
  )
}

export default Form