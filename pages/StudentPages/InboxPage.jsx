import React, { useCallback, useEffect, useState } from 'react'
import InboxMainDiv from '../../src/Components/StudentComponents/Inbox/InboxMainDiv'
import OtherUsers from '../../src/Components/StudentComponents/Inbox/OtherUsers'
// import './style.scss'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { fetchAllAdmins, fetchAllStaffs, fetchAllStudents, fetchStudent, setFetched } from '../../src/redux/studentInformation'
// import Loader from '../../Loader'
import fetchStudentInfo from '../../src/CustomHooks/StudentHooks/fetchStudentInfo'
import NavBar from '../../src/Components/StudentComponents/NavBar'
import Loader from '../../src/Components/StudentComponents/Loader'
import { backendurl } from '../../constants/backendurl';
import checkStudentFeeStatus from '../../src/CustomHooks/StudentHooks/checkStudentFeeStatus'




const InboxPage = () => {
    document.querySelector("title").innerText = `Inbox | Student`
    const toggleSideNav =()=>{
        document.getElementById('OtherStudents').classList.toggle('OtherStudents')
    }
    const dispatch = useDispatch()
    
    const [studentInfo, fetching, termDetails] = fetchStudentInfo();  
    let allStaffs = useSelector((state)=>state.studentInformation.allStaffs);
    let allStudents = useSelector((state)=>state.studentInformation.allStudents);
    let allAdmins = useSelector((state)=>state.studentInformation.allAdmins);
    let socket = useSelector((state)=>state.socketIO.socket);    
    const [partnerId, setpartnerId] = useState('')
    const [partnerName, setpartnerName] = useState('')
    const [partnerCommonId, setpartnerCommonId] = useState('')
    let commonId = '';
    const [messages, setmessages] = useState([]);
    const [allMessages, setallMessages] = useState({})
    let chatId = {};



    const fetchAll =()=>{
      let studentEndpoint = `${backendurl}student/allstudents`;
      let staffEndPoint = `${backendurl}student/allstaffs`;
      let adminEndPoint = `${backendurl}student/alladmins`;
        if(allStaffs.length==0){
          dispatch(setFetched(true))
          axios.get(staffEndPoint)
          .then((res)=>{
            dispatch(fetchAllStaffs(res.data))
            dispatch(setFetched(false))
          })
          .catch((err)=>{
            console.log(err);
          })
        }
        if (allStudents.length==0) {
          dispatch(setFetched(true))
          axios.get(studentEndpoint)
          .then((res)=>{
            dispatch(fetchAllStudents(res.data))
            dispatch(setFetched(false))
          })
          .catch((err)=>{
            console.log(err);
          })
        }
        if (allAdmins.length==0) {
          dispatch(setFetched(true))
          axios.get(adminEndPoint)
          .then((res)=>{
            dispatch(fetchAllAdmins(res.data))
            dispatch(setFetched(false))
          })
          .catch((err)=>{
            console.log(err);
          })
        }

    }
    
    checkStudentFeeStatus();

    useEffect(() => {
      fetchAll();
      const handleMessage = (messageDetails) => {
        if(allMessages[messageDetails.senderId]!=undefined){
          setallMessages((prevAllMessages) => {
              let newAll = { ...prevAllMessages };
              newAll[messageDetails.senderId] = [...newAll[messageDetails.senderId], messageDetails]
              return newAll;
          });
        }
      };

      const handleNotification = (notificationDetails) => {
        console.log(notificationDetails);
      };

      socket.on('getMessage', handleMessage);
      socket.on('getNotification', handleNotification);

      return () => {
          socket.off('getMessage');
          socket.off('getNotification');
      };
  }, [socket, allMessages]);

    const setAll =(partnerName, partnerId)=>{
      setpartnerId(partnerId)
      setpartnerName(partnerName)
      chatId = {
        firstId: partnerId,
        secondId: studentInfo._id
      }
      if (allMessages[partnerId]==undefined || allMessages[partnerId]==null) {
        axios.post(`${backendurl}student/createchat`, chatId)
        .then((res)=>{
          console.log(res.data.created._id);
          setpartnerCommonId(res.data.created._id);
          commonId = partnerId
          setallMessages(
            (prevAllMessages) => {
              let newAll = { ...prevAllMessages };
              newAll[commonId] = res.data.chats
              return newAll;
            }
          );
          toggleSideNav();
        })
        .catch((error)=>{
          console.log(error);
        })
      } else {
        toggleSideNav();
      }
    }

    const sendMessage =(message)=>{
      let messageDetails = {
          messageDate: new Date().toLocaleDateString(),
          messageTime: new Date().toLocaleTimeString(),
          message: message,
          senderId: studentInfo._id,
          partnerCommonId: partnerCommonId 
      }
      let endpoint = `${backendurl}send_message`
      axios.post(endpoint, {messageDetails, partnerId})
      socket.emit('sendMessage', messageDetails, partnerId)
      setallMessages((prevAllMessages) => {
        let newAll = { ...prevAllMessages };
        newAll[partnerId] = [...newAll[partnerId], messageDetails]
        return newAll;
      });
    }

  return (
    <>
        <div className='flex flex-col md:flex-row h-screen overflow-hidden'>
            <NavBar/>
            {fetching==true && (<Loader/>)}
            {fetching==false && (<div className='basis-10/12 flex shrink-0 overflow-x-auto'>
              <InboxMainDiv messages={allMessages[partnerId]} toggleSideNav={toggleSideNav} sendMessage={sendMessage} partnerName={partnerName} partnerCommonId={partnerCommonId} />
              <OtherUsers  toggleSideNav={toggleSideNav} func2={setAll}/>
            </div>)}
        </div>
    </>
  )
}

export default InboxPage

