import React, { useState, useEffect } from 'react'
import ReceiverMessages from './ReceiverMessages'
import SenderMessages from './SenderMessages'
import { useSelector } from 'react-redux'

const MessageMainDiv = ({ partnerName, messages, partnerCommonId, sendMessage }) => {
  let staffInfo = useSelector((state) => state.staffInformation.staffInformation)
  let allStudents = useSelector((state) => state.staffInformation.allStudents)
  let allStaffs = useSelector((state) => state.staffInformation.allStaffs)
  let staffMessages = useSelector((state) => state.staffInformation.staffInformation)?.messages
  const [receiverName, setreceiverName] = useState('Select A Name')
  useEffect(() => {
    document.getElementById("messageContainer").scrollTop = document.getElementById("messageContainer").scrollHeight;
  }, [partnerCommonId, staffMessages])
  
  return (
    <>
      <div className='MessageMainDiv order-5 md:order-none md:mt-0 h-96 md:h-full md:basis-8/12 px-5 overflow-y-auto'>
        <div className='w-full h-full bg-white overflow-y-auto p-2'>
          <div id='messageContainer' className=' h-5/6 overflow-y-auto border border-3 border-blue-400'>
            {messages?.length >= 1 ? messages.map((message, index) => (
              message.senderId == staffInfo._id ? <SenderMessages messageBody={message} message={message.message} time={`Date: ${message.messageDate} Time: ${message.messageTime}`} /> : <ReceiverMessages messageBody={message} message={message.message} time={`Date: ${message.messageDate} Time: ${message.messageTime}`} />
            )) : <>
              <div className='flex h-full w-full justify-center items-center'>
                <p>You currently have no message with this user</p>
              </div>
            </>}
          </div>
          <div className=' h-1/6 w-full flex flex-col'>
            <h3 className=' text-center font-bold'>{partnerName}</h3>
            <d className="flex flex-row mt-auto">
              <input name="" id="message" className='h-12 w-10/12 border-2 rounded-md mt-auto my-2 p-2'></input>
              <div className='w-2/12 mt-auto my-2 flex justify-center items-center'>
                <button disabled={partnerCommonId == ''} className='bg-slate-100 p-2 cursor-pointer rounded-full' onClick={() => { 
                  sendMessage(message.value); 
                  message.value = '' }}
                >
                  <i className="fa fa-paper-plane text-2xl hover:text-2xl text-blue-500 duration-150"></i>
                </button>
              </div>
            </d>
          </div>
        </div>
      </div>
    </>
  )
}

export default MessageMainDiv