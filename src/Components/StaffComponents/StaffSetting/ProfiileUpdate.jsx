import React , {useState}from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { backendurl } from '../../../../constants/backendurl';




const ProfiileUpdate = () => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  const [firstName, setfirstName] = useState(staffInfo.firstName)
  const [lastName, setlastName] = useState(staffInfo.lastName)
  const [email, setemail] = useState(staffInfo.email)
  const [phoneNumber, setphoneNumber] = useState(staffInfo.phoneNumber)
  const [address, setaddress] = useState(staffInfo.address)
  const [localGovernment, setlocalGovernment] = useState(staffInfo.address)
  const [state, setstate] = useState(staffInfo.address)
  const updateInfo =()=>{
    let updateDetails = {
      firstName,
      lastName,
      email,
      class: staffInfo.class,
      phoneNumber,
      address,
      localGovernment,
      state
    }
    // let spread = {...updateDetails}
    console.log(updateDetails);
    let infoendpoint = `${backendurl}staff/updateinfo`
    axios.post(infoendpoint, updateDetails)
    .then((res)=>{
      console.log(res.data);
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  
  return (
    <>
        <div className="ProfiileUpdate">
            <h3>Edit Your Profile</h3>
            <label htmlFor='firstName'>First Name</label>
            <input type='text' defaultValue={staffInfo.firstName} onChange={(e)=>setfirstName(e.target.value)} className=' w-full p-2 text-slate-600 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-600' placeholder='First Name' id='firstName' />
            <label htmlFor='firstName'>Last Name</label>
            <input type='text' defaultValue={staffInfo.lastName} onChange={(e)=>setlastName(e.target.value)} className=' w-full p-2 text-slate-600 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-600' placeholder='First Name' id='lastName' />
            <label htmlFor='firstName'>Email</label>
            <input type='text' defaultValue={staffInfo.email} onChange={(e)=>setemail(e.target.value)} className=' w-full p-2 text-slate-600 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-600' placeholder='Email' id='email' />
            <label htmlFor='firstName'>Phone Number</label>
            <input type='text' defaultValue={staffInfo.phoneNumber} onChange={(e)=>setphoneNumber(e.target.value)} className=' w-full p-2 text-slate-600 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-600' placeholder='Phone Number' id='phoneNumber' />
            {/* <label htmlFor='password'>Password</label>
            <input type={showpassword?'text':'password'} onChange={(e)=>setpassword(e.target.value)} defaultValue={staffInfo.password} className=' w-full p-2 text-slate-600 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-600' placeholder='Password' id='password' />
            <input type="checkbox" style={{accentColor: 'blue'}} id='passwordShow' onChange={(e)=>setshowpassword(e.target.checked)} />
            <label htmlFor="passwordShow">Show password</label> <br /> */}
            <label htmlFor='firstName'>Address</label>
            <input type='text' defaultValue={staffInfo.address} onChange={(e)=>setaddress(e.target.value)} className=' w-full p-2 text-slate-600 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-600' placeholder='Address' id='address' />
            <label htmlFor='firstName'>Local Goverment</label>
            <input type='text' defaultValue={staffInfo.localGovernment} onChange={(e)=>setlocalGovernment(e.target.value)} className=' w-full p-2 text-slate-600 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-600' placeholder='Local Goverment' id='localStorage' />
            <label htmlFor='firstName'>State</label>
            <input type='text' defaultValue={staffInfo.state?staffInfo.state:''} onChange={(e)=>setstate(e.target.value)} className=' w-full p-2 text-slate-600 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-600' placeholder='State' id='state' />
            <button onClick={updateInfo} className='w-full bg-blue-600 hover:bg-blue-500 rounded-md p-2 my-2'>Update Profile</button>
            {/* <button className='w-full bg-blue-600 hover:bg-blue-500 rounded-md p-2 my-2'>Reset Information</button> */}
        </div>
    </>
  )
}

export default ProfiileUpdate