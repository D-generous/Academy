import React, { useEffect, useState } from 'react'
import Navbar from '../NavBar/NavBar'
import Account from './Account'
import FetchAllStudentsAndStaffs from '../../../CustomHooks/AdminHooks/FetchAllStudentsAndStaffs';
import PopUp from '../../PopUp';
import axios from 'axios';
import DisplayToast from '../../../CustomHooks/DisplayToast';
import { useSelector, useDispatch } from 'react-redux';
import { deleteAStudent, setFetchingState } from '../../../redux/adminInformation';
import { backendurl } from '../../../../constants/backendurl';



const StudentAccount = () => {
    const [allStudents, allStaffs] = FetchAllStudentsAndStaffs();
    const [studentClass, setstudentClass] = useState(0);
    const [students, setstudents] = useState([])
    const [viewingIndex, setviewingIndex] = useState(0);
    const dispatch = useDispatch();
    
    const searchStudent =(params)=>{
        if (params.trim().length>0) {
            const filtered = students.filter(user => user?.firstName?.includes(params) || user?.lastName?.includes(params) || user?.email?.includes(params));
            setstudents(filtered);
          } else {
            setstudents(allStudents[studentClass])
          }
    }

    useEffect(() => {
        if(allStudents.length>=1){
          setstudents(allStudents[studentClass])
        }
      }, [allStudents, studentClass])
  
      const [isOpen, setIsOpen] = useState(false);
  
      const openPopup = (index) => {
          setIsOpen(true);
          setviewingIndex(index)
      };
  
      const closePopup = () => {
          setIsOpen(false);
      };

      const deleteAccount =(id, name)=>{
        let confirmDelete = confirm(`Are You Sure You Want To Delete Account For ${name}`)
        if(!confirmDelete){
            const [show] = DisplayToast('success', 'Operation Cancelled')    
            return;
        }
        let endpoint = `${backendurl}admin/delete_account`;
        let details = {
            accountClass:studentClass, 
            type:'student',
            id
        }
        axios.post(endpoint, details)
        .then((res)=>{
            if(res.status==200){
                dispatch(deleteAStudent({index:studentClass, id}))
                const [show] = DisplayToast('success', 'Account Deleted Successfully')    
            } else {
                const [show] = DisplayToast('error', 'An Error Occurred, Please Try Again')    
            }
        })
        .catch((error)=>{
            const [show] = DisplayToast('error', 'An Error Occurred, Please Try Again')    
            console.log(error)
        })
      }
    
  return (
    <>
        <Navbar/>
        <div className=''>
            <div className='flex items-center flex-col'>
                <label htmlFor="selectClass">Select Class</label>
                <select name="" onChange={(e)=>setstudentClass(e.target.value)} className=' w-40 h-12 bg-blue-100 border-0' id="">
                    <option value={0}>JSS 1</option>
                    <option value={1}>JSS 2</option>
                    <option value={2}>JSS 3</option>
                    <option value={3}>SSS 1</option>
                    <option value={4}>SSS 2</option>
                    <option value={5}>SSS 3  </option>
                </select>
                <p className='my-1'>Search for student by name, email</p>
                <input type="search" onKeyUp={(e)=>searchStudent(e.target.value)} className=' w-32 h-12 border-2 border-blue-400 rounded-lg focus:outline-0 p-2' />
            </div>
            <div className='w-full overflow-y-auto'>
                <table className='w-full overflow-y-auto'>
                    <caption className='my-2'>Student Accounts</caption>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Email</td>
                            <td>Fees Status</td>
                            <td>Actions</td>
                        </tr>
                    </thead>
                    <tbody className='w-full'>
                        {students.map((user, index)=>(
                            <Account name={user.firstName + ' ' + user.lastName} index={index} id={user._id} email={user.email} other={
                                user?.currentSchoolFee?.fullPayment>0?<span className='text-green-800'>Full Payment</span>:user?.currentSchoolFee?.partPayment>0?<span className='text-green-400'>Half Payment</span>:<span className='text-red-600'>Indebt</span>
                            } openPopup={openPopup} deleteAccount={deleteAccount}/>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
        <PopUp isOpen={isOpen} onClose={closePopup}>
            {/* <SignUpForm type='edit' data={staffs[viewingIndex]} /> */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam, explicabo.
        </PopUp>
    </>
  )
}

export default StudentAccount