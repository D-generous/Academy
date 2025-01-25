import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';
import Peer from 'peerjs';
import DisplayToast from '../../../CustomHooks/DisplayToast';
// import { Prompt } from 'react-router-dom';

// peerjs --port 9999 --key peerjs --path /peerjs


const ClassMainDiv = ({startClass, classId, setstartClass }) => {
    let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
    let allStaffs = useSelector((state) => state.studentInformation.allStaffs);
    let allStudents = useSelector((state) => state.studentInformation.allStudents);
    let fetching = useSelector((state) => state.studentInformation.staffFetchingState);
    const socket = useSelector((state) => state.socketIO.socket);
    const [joinedClass, setjoinedClass] = useState(false);
    const [joiningClass, setjoiningClass] = useState(false);
    const [classStarted, setclassStarted] = useState(false);
    const [requestMade, setrequestMade] = useState(false);
    const userVideo = useRef(null)
    const [joinedMembers, setjoinedMembers] = useState([]);

    const [myPeer, setMyPeer] = useState(null);

    useEffect(() => {
        if (startClass) {
            joinClass()
        }

        socket.on('userConnected', (details) => {
            newMemberConnect(details);
        })

        socket.on('sendJoinedMembers', (ids) => {
            joinedMembersId(ids);
        })

        socket.on('classNotStarted', (details) => {
            setjoiningClass(false);
            setclassStarted(false);
            setstartClass(false);
            DisplayToast('error', 'Class not started')
        })

        socket.on('memberDisconnected', (details)=>{
            memberDisconnected(details)
        })

        return () => {
            disconnectCall()
            if (myPeer) {
                myPeer.destroy();  
            }
            socket.off('userConnected');
            socket.off('classStarted');
            socket.off('sendJoinedMembers');
            socket.off('memberDisconnected');
        };

    }, [startClass, classId]);


    const joinedMembersId = (ids) =>{
        setjoinedMembers(prevIds => [...prevIds, ...ids])
    }

    const newMemberConnect =(id) =>{
        setjoinedMembers(prevIds => [...prevIds, id]);
    }

    const joinClass = () => {
        setjoiningClass(true);
        setrequestMade(true);
        const peer = new Peer();
        peer.on('open', (id) => {
            console.log('Student ID: ', id);
            socket.emit('userJoined', { userType: 'student', userId: id, roomId: `class_video${0}${classId}` })
        });
        peer.on('call', call => {
            setjoinedClass(true)
            call.answer(null)
            console.log('connected');
            call.on('stream', staffStream => {
                const videoElement = userVideo;
                console.log('video  ');
                if (videoElement.current) {
                    // console.log(staffStream);
                    videoElement.current.srcObject = staffStream;
                    console.log(videoElement.current.srcObject);
                    // videoElement.current.addEventListener('loadedmetadata', ()=>{
                        videoElement.current.play()
                        // .then(() => {
                        //     console.log('playing');
                        // })
                        // .catch((error) => {
                        //     console.log(error);
                        // })
                    // })            
                }
                setjoinedClass(true);
                setclassStarted(true)
                setjoiningClass(false);
            })
        })
        setMyPeer(peer);
    };

    const disconnectCall =()=>{
        if (!myPeer) {
            return;
        }
        socket.emit('disconnectCall', { userType: 'student', userId: myPeer?.id, roomId: `class_video${0}${classId}` })
    }

    const memberDisconnected =(details)=>{
        if (details.userType=='student') {
            setjoinedMembers((prevIds) => prevIds.filter((id)=>id!=details.userId))
            DisplayToast('success', 'A student Disconnected')
        }
    }
    return (
        <>
            <div className='InboxMainDiv relative h-full border-r-2 overflow-y-auto md:border-blue-500 p-5 relative topSpace'>
                <h3 className='sticky top-0 text-center'>
                    Online Class
                    <span id='toggleIco' onClick={() => console.log('func')} className=' md:hidden float-right border-2 p-2 rounded'>
                        <i className='fa fa-bars'></i>
                    </span>
                </h3>
                <div id='staffVideo' className={'h-96 bg-blue-500 flex justify-center items-center relative'}>
                    {joinedClass && <span className='absolute top-2 right-2 bg-white text-blue-500 p-2 rounded-md'>Joined members: {joinedMembers.length}</span>}
                    <video ref={userVideo} className='w-full h-full'></video>
                    {!joinedClass && !joiningClass && !requestMade && <div className='absolute top-0 left-0 right-0 bottom-0 z-40 h-96 bg-blue-300 flex justify-center items-center'>
                        <h2 className='text-3xl animate-bounce duration-500'>Select A Subject</h2>
                    </div>}
                    {!classStarted && requestMade && !joiningClass && <div className='absolute top-0 left-0 right-0 bottom-0 z-40 h-96 bg-blue-300 flex justify-center items-center'>
                        <h2 className='text-3xl underline underline-offset-4 animate-bounce duration-500'>No Ongoing Class For This Subject</h2>
                    </div>}
                    {joiningClass && !joinedClass && <div className='absolute top-0 left-0 right-0 bottom-0 z-40 h-96 bg-blue-300 flex justify-center items-center'>
                        <h2 className='text-3xl underline underline-offset-4 animate-bounce duration-500'>Joining Class</h2>
                    </div>}
                </div>
            </div>
            {/* <Prompt when={true} message='sure '/> */}
        </>

    )
}

export default ClassMainDiv