import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MessageMainDiv from '../../src/Components/StaffComponents/StaffMessage/MessageMainDiv'
import MessageOtherDiv from '../../src/Components/StaffComponents/StaffMessage/MessageOtherDiv'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import DashboardNav from '../../src/Components/StaffComponents/StaffDashboard/DashboardNav'
import { fetchStaff, fetchAllStaffs, fetchAllStudents, fetchAllAdmins, setFetching } from '../../src/redux/staffInformation'
import Loader from '../../src/Loader'
import fetchStaffInfo from '../../src/CustomHooks/StaffHooks/fetchStaffInfo'
import { backendurl } from '../../constants/backendurl'



const StaffMessage = () => {
  let paramsValue = useParams();
  const dispatch = useDispatch();
  const [staffInfo, fetching, staffNotifications, notificationFetchingState] = fetchStaffInfo();
  let socket = useSelector((state) => state.socketIO.socket);
  let allStaffs = useSelector((state) => state.staffInformation.allStaffs)
  let allStudents = useSelector((state) => state.staffInformation.allStudents)
  let allAdmins = useSelector((state) => state.staffInformation.allAdmins)

  const [partnerId, setpartnerId] = useState('')
  const [partnerName, setpartnerName] = useState('')
  const [partnerCommonId, setpartnerCommonId] = useState('')
  let commonId = '';
  const [messages, setmessages] = useState([]);
  const [allMessages, setallMessages] = useState({})
  let chatId = {};


  useEffect(() => {
    setDefault()
    fetchAll()
    const handleMessage = (messageDetails) => {
      if (allMessages[messageDetails.senderId] != undefined) {
        setallMessages((prevAllMessages) => {
          let newAll = { ...prevAllMessages };
          newAll[messageDetails.senderId] = [...newAll[messageDetails.senderId], messageDetails]
          return newAll;
        });
      }
    };

    socket.on('getMessage', handleMessage);

    return () => {
      socket.off('getMessage');
    };
  }, [socket, allMessages])

  const fetchAll = () => {
    let studentEndpoint = `${backendurl}student/allstudents`;
    let staffEndPoint = `${backendurl}student/allstaffs`;
    let adminEndPoint = `${backendurl}student/alladmins`;
    if (allStaffs.length == 0) {
      dispatch(setFetching(true))
      axios.get(staffEndPoint)
        .then((res) => {
          console.log('fetched staff', res)
          dispatch(fetchAllStaffs(res.data))
          dispatch(setFetching(false))
        })
        .catch((err) => {
          console.log(err);
        })
    }
    if (allStudents.length == 0) {
      dispatch(setFetching(true))
      axios.get(studentEndpoint)
        .then((res) => {
          console.log('fetched students', res)
          dispatch(fetchAllStudents(res.data))
          dispatch(setFetching(false))
        })
        .catch((err) => {
          console.log(err);
        })
    }
    if (allAdmins.length == 0) {
      dispatch(setFetching(true))
      axios.get(adminEndPoint)
        .then((res) => {
          console.log('fetched admin', res)
          dispatch(fetchAllAdmins(res.data))
          dispatch(setFetching(false))
        })
        .catch((err) => {
          console.log(err);
        })
    }
  }

  const sendMessage = (message) => {
    let messageDetails = {
      messageDate: new Date().toLocaleDateString(),
      messageTime: new Date().toLocaleTimeString(),
      message: message,
      senderId: staffInfo._id,
      senderName: `${staffInfo.firstName} ${staffInfo.lastName}`,
      partnerCommonId: partnerCommonId
    }
    let endpoint = `${backendurl}send_message`
    axios.post(endpoint, { messageDetails, partnerId })
    socket.emit('sendMessage', messageDetails, partnerId)
    setallMessages((prevAllMessages) => {
      let newAll = { ...prevAllMessages };
      newAll[partnerId] = [...newAll[partnerId], messageDetails]
      return newAll;
    });
  }

  const setPartner = (partnerName, partnerId) => {
    setpartnerId(partnerId)
    setpartnerName(partnerName)
    chatId = {
      firstId: partnerId,
      secondId: staffInfo._id
    }

    if (allMessages[partnerId] == undefined || allMessages[partnerId] == null) {
      axios.post(`${backendurl}staff/createchat`, chatId)
        .then((res) => {
          setpartnerCommonId(res.data.created._id);
          commonId = partnerId
          setallMessages(
            (prevAllMessages) => {
              let newAll = { ...prevAllMessages };
              newAll[commonId] = res.data.chats;
              return newAll;
            }
          );
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  const setDefault = () => {
    if (paramsValue.id && Object.keys(staffInfo).length > 0 && staffInfo.constructor === Object && allStudents.length > 0) {
      let student = allStudents[staffInfo.class].filter((student) => student._id == paramsValue.id)
      setPartner(`${student.firstName} ${student.lastName}`, paramsValue.id)
    }
  }
  return (
    <>
      <div className="StaffMessage flex w-screen flex-col md:flex-row bg-slate-300 relative ring-0">
        <DashboardNav className=' order-1' />
        {fetching && <Loader />}
        {fetching == false && <>
          <div className='grid grid-cols-1 gap-2 md:gap-0 md:flex w-full md:basis-11/12 flex-row h-screen border-2'>
            <MessageMainDiv messages={allMessages[partnerId]} sendMessage={sendMessage} partnerName={partnerName} partnerCommonId={partnerCommonId} />
            <MessageOtherDiv setPartner={setPartner} />
          </div>
        </>}
      </div>
    </>
  )
}

export default StaffMessage