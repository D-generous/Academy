import React, { useEffect, useState } from 'react'
import ReceiverMessage from './ReceiverMessage'
import SenderMessage from './SenderMessage'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'



const InboxMainDiv = ({ toggleSideNav, partnerName, messages, partnerCommonId, sendMessage }) => {
    useEffect(() => {
        document.getElementById("messageContainer").scrollTop = document.getElementById("messageContainer").scrollHeight
    }, [messages])
    let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
    let allStaffs = useSelector((state) => state.studentInformation.allStaffs);
    let allStudents = useSelector((state) => state.studentInformation.allStudents);
    let fetching = useSelector((state) => state.studentInformation.staffFetchingState);
    const [messageInput, setmessageInput] = useState('')
    let chattingWithName = ''
    return (
        <>
            <div className='basis-full md:basis-8/12 h-full border-r-2 overflow-y-auto md:border-blue-500 p-5 relative topSpace'>
                <h3 className='sticky top-0 text-center'>
                    Adegbite Joshua
                    <span id='toggleIco' onClick={toggleSideNav} className=' md:hidden float-right border-2 p-2 rounded'>
                        <i className='fa fa-bars'></i>
                    </span>
                </h3>
                <div id='messageContainer' className='messageContaine h-5/6 overflow-y-auto'>
                    {messages?.length >= 1 ? messages.map((message, index) => (
                        message.senderId === studentInfo._id ?
                            <SenderMessage key={index} messageBody={message} message={message.message} time={`Date: ${message.messageDate} Time: ${message.messageTime}`} /> :
                            <ReceiverMessage key={index} messageBody={message} message={message.message} time={`Date: ${message.messageDate} Time: ${message.messageTime}`} />
                    )) : (
                        <div className='flex h-full w-full bg-light justify-center items-center'>
                            <p>You currently have no message with this user</p>
                        </div>
                    )}
                </div>
                <div id='sendContaine' className='h-1/6'>
                    <p className='text-center font-bold'>{partnerName ? partnerName : 'Select A Name'}</p>
                    <div className='flex flex-row'>
                        <input
                            type="text"
                            id='message'
                            onChange={(e) => setmessageInput(e.target.value)}
                            className='h-12 w-10/12 border-2 rounded-md my-2 p-2'
                        />
                        <div className='w-2/12 my-2 flex justify-center items-center'>
                            <button className='bg-slate-100 p-2 rounded-full' onClick={() => {
                                sendMessage(messageInput);
                                message.value = '';
                            }}>
                                <i className="fa fa-paper-plane text-2xl hover:text-2xl text-blue-500 duration-150"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}

export default InboxMainDiv