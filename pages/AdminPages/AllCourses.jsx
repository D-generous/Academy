import React, {useState, useEffect} from 'react'
import Navbar from '../../src/Components/AdminComponents/NavBar/NavBar'
import Course from '../../src/Components/AdminComponents/Courses/Course'
import FetchAllStudentsAndStaffs from '../../src/CustomHooks/AdminHooks/FetchAllStudentsAndStaffs';
import FetchAllCourses from '../../src/CustomHooks/AdminHooks/FetchAllCourses';
import FetchAdminInfo from '../../src/CustomHooks/AdminHooks/FetchAdminInfo';




const AllCourses = () => {
    const [allCourses] = FetchAllCourses();
    const [courseClass, setcourseClass] = useState(0);
    const [courses, setcourses] = useState([]);
    const [allStudents, allStaffs] = FetchAllStudentsAndStaffs();
    const [adminInfo, fetching] = FetchAdminInfo(); 


    useEffect(()=>{
        if(allCourses[courseClass]?.courses){
            setcourses(allCourses[courseClass].courses)
        } else {
            setcourses(null)
        }
    }, [courseClass, allCourses])

  return (
    <>
        <Navbar/>
        <div className=' grid grid-cols-1 md:flex pt-10 px-2'>
            <div className=' order-3 md:order-none basis-full md:basis-4/6 overflow-x-auto'>
                <table className='w-full'>
                    <thead className='w-full'>
                        <tr>
                            <td className='border-2 py-1 px-2'>Subject Image</td>
                            <td className='border-2 py-1 px-2'>Subject Name</td>
                            <td className='border-2 py-1 px-2'>Subject Teacher</td>
                            <td className='border-2 py-1 px-2'>Teacher Email</td>
                            <td className='border-2 py-1 px-2'>Actions</td>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {courses != null ? courses.map((course) => {
                            const matchingStaff = allStaffs[courseClass]?.find((staff) => staff._id === course.staffId);
                            const teacherName = matchingStaff ? `${matchingStaff.firstName} ${matchingStaff.lastName}` : 'Unknown Teacher';
                            const email = matchingStaff ? matchingStaff.email : 'Unknown Teacher';
                            return (
                                <Course subjectImage={course.image} subjectName={course.courseName} teacherName={teacherName} email={email} id={course._id} courseClass={course.class} allCourses={allCourses} />
                            );
                        }) : <tr>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                                <td>Null</td>
                            </tr>}
                    </tbody>
                </table>
            </div>
            <div className=' order-1 md:order-none basis-full md:basis-2/6 p-5'>
                <form action="w-full">
                    <div>
                        <label htmlFor="" className='w-full block text-xl'>Select Class</label>
                        <select name="" id="" onChange={(e)=>setcourseClass(e.target.value)} className='block w-full text-black focus:border-blue-600 border-2 border-blue-300 h-12'>
                            <option value={0}>JSS 1</option>
                            <option value={1}>JSS 2</option>
                            <option value={2}>JSS 3</option>
                            <option value={3}>SSS 1</option>
                            <option value={4}>SSS 2</option>
                            <option value={5}>SSS 3</option>
                        </select>
                    </div>
                </form>
            </div>
        </div>        
    </>
  )
}

export default AllCourses