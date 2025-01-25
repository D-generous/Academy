import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import DisplayToast from '../DisplayToast';

const checkStudentFeeStatus = () => {
  const [paymentDisplayOption, setpaymentDisplayOption] = useState('full');
  const [alreadyCheckedPayment, setAlreadyCheckedPayment] = useState(false);
  let paymentDisplayOptionVar = 'full';
  let studentInfo = useSelector((state) => state.studentInformation.studentInformation);
  let alreadyMadePartPayment = studentInfo?.currentSchoolFee;
  const navigate = useNavigate();


  useEffect(() => {
    if (Object.keys(studentInfo).length > 0 && studentInfo.constructor === Object && alreadyMadePartPayment?.fullPayment) {
      setpaymentDisplayOption('full');
      paymentDisplayOptionVar = 'full'
      sessionStorage.setItem('alreadyCheckedPayment', 'true')

    } else if (Object.keys(studentInfo).length > 0 && studentInfo.constructor === Object && alreadyMadePartPayment?.partPayment) {
      setpaymentDisplayOption('half');
      paymentDisplayOptionVar = 'half'
      sessionStorage.setItem('alreadyCheckedPayment', 'true')

    } else if (Object.keys(studentInfo).length > 0 && studentInfo.constructor === Object && (studentInfo == undefined || null || {})) {
      setpaymentDisplayOption('indebt');
      paymentDisplayOptionVar = 'indebt'
    }

    if (!sessionStorage.getItem('alreadyCheckedPayment')) {
      DisplayToast('success', 'School fees payment required');
      paymentDisplayOptionVar == 'indebt' ? navigate('/student/feepayment') : '';
    }

  }, [studentInfo])
  return [paymentDisplayOption];
}

export default checkStudentFeeStatus



// const checkStudentFeeStatus = () => {
//     const [paymentDisplayOption, setpaymentDisplayOption] = useState('');
//     let studentInfo = useSelector((state)=>state.studentInformation.studentInformation);
//     // studentInfo=={}:
//     let alreadyMadePartPayment = studentInfo?.currentSchoolFee;

//     useEffect(() => {
//         if(Object.keys(studentInfo).length > 0 && studentInfo.constructor === Object && alreadyMadePartPayment?.fullPayment){
//           setpaymentDisplayOption('full')
//         } else if (Object.keys(studentInfo).length > 0 && studentInfo.constructor === Object && alreadyMadePartPayment?.partPayment) {
//           setpaymentDisplayOption('half')
//         } else if (Object.keys(studentInfo).length > 0 && studentInfo.constructor === Object && (studentInfo==undefined||null||{})) {
//           setpaymentDisplayOption('indebt')
//         }
//       }, [studentInfo])
//   return [paymentDisplayOption]
// }

// export default checkStudentFeeStatus