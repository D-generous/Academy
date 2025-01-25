import axios from 'axios'
import React , {useEffect, useState}from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ButtonComp from '../../ButtonComp'
import FileViewer from '../../../FileViewer'
import { fetchStaff } from '../../../redux/staffInformation'
import { backendurl } from '../../../../constants/backendurl';



const SubjectSetting = () => {
    // const setSubject =()=>{document.getElementById('staffIndex')[staffInfo.staffIndex].selected = 'true'}
    const subjects = [
        'MATHEMATICS',
        'ENGLISH LANGUAGE',
        'YORUBA',
        'CIVIC EDUCATION',
        'COMPUTER STUDIES',
        'GEOGRAPHY',
        'ECONOMICS',
        'PHYSICS',
        'CHEMISTRY',
        'BIOLOGY',
        'ANIMAL HUSBANDRY',
        'FURTHER MATHEMATICS',
        'TECHNICAL DRAWING '
      ]
      const dispatch = useDispatch()
      let staffInfo = useSelector((state)=>state.staffInformation.staffInformation)
      
      const fetchStaffInformation = ()=>{
        let endpoint = `${backendurl}staff/dashboard`
        let staffEmail = localStorage.getItem('staffemail')
        let staffPassword = localStorage.getItem('staffpassword')
        let staffClass = localStorage.getItem('staffclass')
        let details = {
            staffClass,
            staffEmail,
            staffPassword
        }
        axios.post(endpoint, details)
        .then((res)=>{
            console.log(res)
            if (res.status==200) {
              dispatch(fetchStaff(res.data))
              // console.log(staffInfo);
                // Object.assign(state.staffInformation=res.data)
                // state.staffInformation = res.data
            } else if(res.status != 200){
                state.staffInformation = 'error'
            }
        })
        .catch((err)=>{
            console.log(err);
        })
        // console.log(staffInfo);
        // if (staffInfo == 'error') {
        //   navigate('/signin')
        // }
      }
      const validateStaff =()=>{
        let token = localStorage.token
        let validateEndpoint = `${backendurl}staff/validatetoken`
        axios.get(validateEndpoint, {headers : {
          "Authorization": `Bearer ${token}`,
          "Content-Toe": "application/json",
          "Accept": "application/json"
        }})
        .then((res)=>{
          console.log(res);
          if (res.status == 200) {
            fetchStaffInformation()
          } else{
            navigate('/signin')
          }
        })
        .catch((error)=>{
          navigate('/signin')
          console.log(error);
        })
      }
      useEffect(() => {
        validateStaff()
      }, [])

      const [staffIndex, setstaffIndex] = useState(staffInfo.staffIndex)
      const [subjectDescription, setsubjectDescription] = useState(staffInfo.subjectDescription)
      const [imageBase64, setimageBase64] = useState('')
    //   const [subjectName, setsubjectName] = useState(staffInfo.subjectInfo.subjectName)
      const [file, setfile] = useState('')

    //   const [imageUrl, setimageUrl] = useState(staffInfo.subjectInfo.subjectPicUrl)
      const updateSubjectInfo =()=>{
        let details = {
            staffIndex,
            subjectDescription,
            imageBase64,
            imageName: file.name,
            class: staffInfo.class,
            email: staffInfo.email,
            subjectName: subjects[staffIndex]
        }
        // console.log(details);
        let endpoint = `${backendurl}staff/updatesubject`
        axios.post(endpoint, details)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            console.log(error);
        })
      }
      const selectPicture = (e)=>{
        setfile(e.target.files[0])
        let file = e.target.files[0]
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload =()=>{
            setimageBase64(reader.result)
        }
      }
   
  return (
    <>
        <div className="SubjectSetting w-full ">
            <label htmlFor="subjectName">Change Subject</label>
            {/* <input type="text" className='w-full block p-2 text-slate-500 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-500' defaultValue='Mathematics' /> */}
            <select disabled name="staffIndex" id="staffIndex" onChange={(e)=>setstaffIndex(e.target.value)} className='w-full border-slate-900 focus:ring-4 focus:ring-purple focus:outline-none p-2 hover:boder-0 focus:ring-0 rounded-full  placeholder-slate-400 contrast-more:border-slate-400 contrast-more:placeholder-slate-50 px-6'>
                {subjects.map((subject, index) =>(
                    <option  value={index} selected={index==staffInfo.staffIndex?'true': 'false'}>{subject}</option>
                ))}
            </select>
                {/* {setSubject} */}
            <label htmlFor="subjectTeacher">Change Subject Information</label>
            <input disabled type="text" onChange={(e)=>setsubjectDescription(e.target.value)} className='w-full block p-2 text-slate-500 rounded-md focus:outline-0 focus:ring focus:ring-2 focus:ring-violet-500' defaultValue='' />
            <div className=' w-full md:w-3/6 aspect-square block mx-auto'>
                {imageBase64?<> <FileViewer fileLink={imageBase64} fileType='.jpeg'/> </>:<>
                    <div className=' bg-black flex w-full h-full items-center justify-center'>
                        <p className=' text-white'>The Choosed File Wil Appear Here</p>
                    </div>
                </>}
            </div>
            <label htmlFor="" className='w-full'>
                <span className="sr-only">Choose Fil To Upload</span>
                <input disabled type="file" onChange={(e)=>selectPicture(e)} accept='.jpeg, .jpg' className=' w-full my-1 block text-sm text-slate-500 file:mr-4 file:py-2 file:rounded-full file:border-0 file:text-sm file:font-bold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100' />
            </label>
            <ButtonComp onClick={updateSubjectInfo} name='Update Subject Info'/>
        </div>
    </>
  )
}

export default SubjectSetting