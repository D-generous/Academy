import React, { useEffect, useState } from 'react'
// import { Calendar } from 'react-calendar';
// import 'react-calendar/dist/Calendar.css';

const StudentCalendar = () => {
    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    const [date, setdate] = useState(new Date())
    const [currentYear, setcurrentYear] = useState(date.getFullYear())
    const [currentMonth, setcurrentMonth] = useState(date.getMonth()) 
    // console.log(months);
    // console.log(date.getDate())
    // const renderCalendar =()=>{
    //     // const [daysNumber, setdaysNumber] = useState(new Date(currentYear, currentMonth+1, 0).getDate())
    //     let daysNumber = new Date(currentYear, currentMonth+1, 0).getDate();// last date of current month
    //     // let nextMonthDaysNumber = new Date(currentYear, currentMonth+1, 0).getDate();// 
    //     let firstDayofMonth = new Date(currentYear, currentMonth, 1).getDay();//first day of the month
    //     let lastDayofPrevMonth = new Date(currentYear, currentMonth, 0).getDate();// last date of previous of the month
    //     let lastDayofMonth = new Date(currentYear, currentMonth, daysNumber).getDay();
    //     // console.log(lastDayofMonth);
    //     // console.log(daysNumber);
    //     header.innerText = `${months[currentMonth]} ${currentYear}`
    //     document.getElementById('daysList').innerHTML = ''
    //     for (let i = firstDayofMonth; i > 0; i--) {
    //         document.getElementById('daysList').innerHTML += `<li className='inactive'>${lastDayofPrevMonth
    //             - i+1}</li>`
    //     }
    //     for (let i = 1; i <= daysNumber; i++) {
    //         let currentDay = i===date.getDate() && currentYear === date.getFullYear() && currentMonth===date.getMonth()?'active':''
    //         // console.log(currentDay);
    //         document.getElementById('daysList').innerHTML += `<li className='${currentDay}'>${i}</li>`
    //         // console.log(`<li className='${currentDay}'>${i}</li>`);
    //     }
    //     for (let i = lastDayofMonth; i < 6 ; i++) {
    //         document.getElementById('daysList').innerHTML += `<li className=''>${(i-lastDayofMonth+1)}</li>`
    //     }
    //     // console.log(currentMonth);
    //     // console.log(currentYear);
    // }
    
    // useEffect(() => {
    //     renderCalendar()
    // },[])
    
    // document.querySelectorAll('.icon').forEach(icon => {
    //     // console.log(icon);
    //     icon.addEventListener('click', ()=>{
    //         let newMonth = icon.id=='prev'?currentMonth-1:currentMonth+1;
    //         // console.log(newMonth);
    //         setcurrentMonth(newMonth)
    //         if (currentMonth < 0 || currentMonth > 11) {
    //             setdate(new Date(currentYear, currentMonth))
    //             setcurrentYear(date.getFullYear())
    //             setcurrentMonth(date.getMonth())
    //             renderCalendar()
    //             console.log(currentMonth);
    //         } else{
    //             renderCalendar()
    //             console.log(currentMonth);
    //         }
    //     })
    // });
    const showDay =(e)=>{
        console.log(e.getMonth());
        console.log(e.getDate());
    }
  return (
    <>
        <div className='w-100 d-flex justify-content-center'>
            {/* <Calendar onClickDay={(e)=>showDay(e)}/> */}
        </div>        
    </>
  )
}

export default StudentCalendar