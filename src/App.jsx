import React, { useEffect, useState, useRef } from 'react'
import './style.scss'
import './../node_modules/font-awesome/css/font-awesome.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import EntranceTest from './Components/EntranceTest/EntranceTest';
import TestPage from './Components/EntranceTest/TestPage';
import TestInstructions from './Components/EntranceTest/TestInstructions';
import StaffNotification from '../pages/StaffPages/StaffNotification';
import { useSelector, useDispatch } from 'react-redux';
import { updateStaffNotifications } from './redux/staffInformation';
import WebNotification from 'react-web-notifications';
import AdminSignUp from '../pages/AdminPages/AdminSignUp';
import AdminDashboard from '../pages/AdminPages/AdminDashboard';
import AdminSignIn from '../pages/AdminPages/AdminSignIn';
import NewCourse from '../pages/AdminPages/NewCourse';
import AdminEntranceTest from '../pages/AdminPages/EntranceTest';
import AllCourses from '../pages/AdminPages/AllCourses';
import AdminNoticesAndNews from '../pages/AdminPages/AdminNoticesAndNews';
import NewAccount from './Components/AdminComponents/Accounts/NewAccount';
import EditAccount from './Components/AdminComponents/Accounts/EditAccount';
import StaffAccount from './Components/AdminComponents/Accounts/StaffAccount';
import StudentAccount from './Components/AdminComponents/Accounts/StudentAccount';
import NewAcademicTerm from './Components/AdminComponents/NewAcademicTerm/NewAcademicTerm';
import SalaryPayment from './Components/AdminComponents/SalaryPayment/SalaryPayment';
import StudentDashboard from '../pages/StudentPages/StudentDashboard';
import SignInPage from '../pages/StudentPages/SignInPage';
import SignUpPage from '../pages/StudentPages/SignUpPage';
import InboxPage from '../pages/StudentPages/InboxPage';
import StaffDashboard from '../pages/StaffPages/StaffDashboard';
import StaffLogin from '../pages/StaffPages/StaffLogin';
import StaffSignUp from '../pages/StaffPages/StaffSignUp';
import StaffMessage from '../pages/StaffPages/StaffMessage';
import Student from '../pages/StaffPages/Student';
import StaffSubmit from '../pages/StaffPages/StaffSubmit';
import StaffFile from '../pages/StaffPages/StaffFile';
import StaffSetting from '../pages/StaffPages/StaffSetting';
import StudentClass from '../pages/StaffPages/StudentClass';
import StaffForgottenPassword from '../pages/StaffPages/StaffForgottenPassword';
import LandingPage from '../pages/LandingPage/LandingPage';
import ContactUsPage from '../pages/ContactUsPage/ContactUsPage';
import AboutusPage from '../pages/AboutUsPage/AboutusPage';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import ForgottenPasswordPage from '../pages/StudentPages/ForgottenPasswordPage';
import SchoolFeePayment from '../pages/StudentPages/SchoolFeePayment';
import StudentResultPage from '../pages/StudentPages/StudentResultPage';
import StudentProfile from '../pages/StudentPages/StudentProfile';
import StudentNotificationsPage from '../pages/StudentPages/StudentNotificationsPage';
import StudentErrorPage from '../pages/StudentPages/StudentErrorPage';
import StudentSubject from './Components/StudentComponents/Profile/StudentSubject';
import StudentOnlineClass from '../pages/StudentPages/StudentOnlineClass';
import StudentsSubject from '../pages/StudentPages/StudentsSubject';



function App() {
  const socket = useSelector((state) => state.socketIO.socket);
  const dispatch = useDispatch();
  const [latestNotification, setlatestNotification] = useState({});
  

  useEffect(()=>{
    if(socket){
      socket.on('connect', ()=>{
        socket.emit('joined', 'Hello')
      })
    }

    return ()=> {
      dispatch(closeIO())
    }
  }, [socket])

  useEffect(()=>{
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', ()=>{
        navigator.serviceWorker.register('sw.js')
        .then(registration => {
          console.log('SW registered: ', registration);
        })
        .catch(registrationError => {
          console.log('SW registration failed: ', registrationError)
        })
      })
    }

    const handleNotification = (notificationDetails) => {
      console.log(notificationDetails)
      dispatch(updateStaffNotifications(notificationDetails));
      setlatestNotification(notificationDetails);
      triggerNotification();
    };
    
    socket.on('getNotification', handleNotification);

    return () => {
      socket.off('getNotification');
    }; 
  }, [])

  const triggerNotification = () => {
    return (
      <WebNotification
          title= {latestNotification.type=='submit'?`You Have A New Submit From ${latestNotification.name}`: `You Have A New Message From ${latestNotification.name}`}
          icon="path/to/image.jpg"
          body={latestNotification.message}
          timeout={9000}
          onClick={() =>{
            const Tab = window.open('https://hopeacademy.vercel.app', '_blank');
            if (Tab) {
              Tab.focus();
            }
          }}
        />
    )
  };
  return (
    <>      
        <Routes>
          <Route path='/' element={<LandingPage/>}/>
          <Route path="/home" to="/"/>
          <Route path="/contact_us" element={<ContactUsPage/>}/>
          <Route path="/about_us" element={<AboutusPage/>}/>
          <Route path='/student/'>
            <Route path='dashboard' element={<StudentDashboard/>}/>
            <Route path='signin' element={<SignInPage/>}/>
            <Route path='signup' element={<SignUpPage/>}/>
            <Route path='inbox' element={<InboxPage/>}/>
            <Route path='class' element={<StudentOnlineClass/>}/>
            <Route path='results' element={<StudentResultPage/>}/>
            <Route path='subjects' element={<StudentsSubject/>}/>
            <Route path='profile' element={<StudentProfile/>}/>
            <Route path='feepayment' element={<SchoolFeePayment/>}/>
            <Route path='forgottenpassword' element={<ForgottenPasswordPage/>} />
            <Route path='forgottenpassword/:token' element={<ForgottenPasswordPage/>} />
            <Route path='notifications' element={<StudentNotificationsPage/>}/>
            <Route path='*' element={<StudentErrorPage/>}/>
          </Route>
          <Route path='/staff/'>
            <Route path='dashboard' element={<StaffDashboard/>}/>
            <Route path='signin' element={<StaffLogin/>}/>
            <Route path='signup' element={<StaffSignUp/>}/>
            <Route path='inbox' element={<StaffMessage/>}/>
            <Route path='inbox/:id' element={<StaffMessage/>}/>
            <Route path='student' element={<Student/>}/>
            <Route path='student/:email' element={<Student/>}/>
            <Route path='submit' element={<StaffSubmit/>}/>
            <Route path='uploadfile' element={<StaffFile/>}/>
            <Route path='notifications' element={<StaffNotification/>}/>
            <Route path='setting' element={<StaffSetting/>}/>
            <Route path='class' element={<StudentClass/>}/>
            <Route path='forgottenpassword' element={<StaffForgottenPassword/>} />
            <Route path='forgottenpassword/:token' element={<StaffForgottenPassword/>} />
          </Route>
          <Route path='/entrance_test/'>
            <Route path='instructions' element={<TestInstructions/>}/>
            <Route path='test' element={<TestPage/>}/>
            <Route path='' element={<EntranceTest/>}/>
          </Route>
          <Route path='/admin/'>
            <Route path='signin' element={<AdminSignIn/>} />
            <Route path='signup' element={<AdminSignUp/>} />
            <Route path='dashboard' element={<AdminDashboard/>} />
            <Route path='account/'>
              <Route path='' element={<NewAccount/>} />
              <Route path='new' element={<NewAccount/>} />
              <Route path='edit' element={<EditAccount/>} />
              <Route path='staff' element={<StaffAccount/>} />
              <Route path='student' element={<StudentAccount/>} />
            </Route>
            <Route path='course/'>
              <Route path='' element={<NewCourse/>} />
              <Route path='new' element={<NewCourse/>} />
              <Route path='all' element={<AllCourses/>} />
            </Route>
            <Route path='entrance_test' element={<AdminEntranceTest/>} />
            <Route path='new_term' element={<NewAcademicTerm/>} />
            <Route path='salary_payment' element={<SalaryPayment/>} />
            <Route path='news_and_notices' element={<AdminNoticesAndNews/>} />
          </Route>
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
        <ToastContainer style={{zIndex: 99999999999999999999}} /> 
    </>
  )
}

export default App
