import React from 'react'
import axios from 'axios';
import DisplayToast from '../../../CustomHooks/DisplayToast';
import { useSelector, useDispatch } from 'react-redux';
import { updateAllCourses, setFetchingState } from '../../../redux/adminInformation';
import { backendurl } from '../../../../constants/backendurl';



const Course = ({subjectName, teacherName, email, subjectImage, id, courseClass, allCourses }) => {
  const dispatch = useDispatch();
  
  const deleteCourse = async()=>{
    let endpoint = `${backendurl}admin/delete_course`
    let deleted = await axios.post(endpoint, {courseId:id, class: courseClass})
    if (deleted.status==200) {
      let [show] = DisplayToast('success', 'Course Deleted Successfully')
      const remainingCourses = allCourses[courseClass].courses.filter((course)=>course._id != id);
      dispatch(updateAllCourses({index: courseClass, newData: remainingCourses}))

    } else {
      let [show] = DisplayToast('error', 'An Error Occur, Please Try Again')
    }
  }

  return (
    <tr className='w-full border-2'>
        <td className=' border-2 px-2'><img src={subjectImage} className='h-12 w-12 rounded-full' alt="" /></td>
        <td className=' border-2 px-2'>{subjectName}</td>
        <td className=' border-2 px-2'>{teacherName}</td>
        <td className=' border-2 px-2'>{email}</td>
        <td className='  px-2 flex gap-2 md:w-5 items-center'>
            {/* <button><i className='bg-blue-400 p-2 rounded-md fa fa-eye'></i></button> */}
            <button><i className='bg-green-400 p-2 rounded-md fa fa-edit'></i></button>
            <button onClick={()=>deleteCourse()}><i className='bg-red-400 p-2 rounded-md fa fa-trash'></i></button>
        </td>
    </tr>
  )
}

export default Course