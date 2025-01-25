import axios from 'axios'
import React , { useState, useEffect}from 'react'
import { useSelector } from 'react-redux'
import { backendurl } from '../../../../constants/backendurl';




const SocialMediaUpdate = () => {
  let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
  const [twitter, settwitter] = useState('')
  const [facebook, setfacebook] = useState('')
  const [whatsapp, setwhatsapp] = useState()
  const [other, setother] = useState('')
  useEffect(() => {
    if (Object.keys(staffInfo).length > 0 && staffInfo.links.constructor===Object) {
      settwitter(staffInfo.links.twitter)
      setfacebook(staffInfo.links.facebook)
      setwhatsapp(staffInfo.links.whatsapp)
      setother(staffInfo.links.other)
    }
  }, [])
  
  const updateMediaDetails =()=>{
    let updateDetails = {
      'links.twitter':twitter,
      'links.facebook':facebook,
      'links.whatsapp':whatsapp,
      'links.other':other,
      class: staffInfo.class,
      email: staffInfo.email
    }
    // console.log(updateDetails);
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
         <div className='w-100 SocialMediaUpdate'>
          <h3 classname='p-3'>Add Your Social Media Link</h3>
          <div className='w-100 px-4'>
            <label htmlFor='emailaddress'>Twitter Address</label>
            <input type='link' defaultValue={staffInfo.links?staffInfo.links.twitter:''} onChange={(e)=>settwitter(e.target.value)} className='p-2 text-slate-500 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-500 w-full md:w-3/6 block' placeholder='Twitter Address' id='twitteraddress' />
            <div className='block w-full md:w-3/6 ms-auto'>
                <label htmlFor='facebooklink'>Facebook Link</label>
                <input type='link' defaultValue={staffInfo.links?staffInfo.links.facebook:''} onChange={(e)=>setfacebook(e.target.value)} className='w-full block p-2 text-slate-500 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-500' placeholder='Facebook Link' id='facebooklink' />
            </div>
            <label htmlFor='whatsappNumber'>WhatsApp Link</label>
            <input type='tel' defaultValue={staffInfo.links?staffInfo.links.whatsapp:''} onChange={(e)=>setwhatsapp(e.target.value)} className='p-2 text-slate-500 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-500 w-full md:w-3/6 block' placeholder='WhatsApp Link' id='whatsapplink' />
            <div className='block w-full md:w-3/6 ms-auto'>
                <label htmlFor='otherLinks'>Other Link</label>
                <input type='link' defaultValue={staffInfo.links?staffInfo.links.other:''} onChange={(e)=>setother(e.target.value)} className='w-full block p-2 text-slate-500 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-500' placeholder='Other Link' id='otherlink' />
            </div>
          <button onClick={updateMediaDetails} className='w-full bg-blue-600 hover:bg-blue-500 rounded-md p-2 my-2'>Submit</button>
          </div>
        </div>
    </>
   
  )
}

export default SocialMediaUpdate