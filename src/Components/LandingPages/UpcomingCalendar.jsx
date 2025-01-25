import React from 'react';
import holidays from '../../../constants/holidays';
import Calendar from './Calendar';
import { motion } from "framer-motion";

const UpcomingCalendar = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, 0.01, -0.35, 0.9],
      },
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  return (
    <div className='UpcomingCalenda md:relative w-full h-auto grid grid-cols-1 md:grid-cols-2 py-8'>
      <div className='h-72 md:sticky top-28' name='img' style={{ backgroundImage: "url('/teachers/bg-image-5.jpeg')", backgroundSize: '100% 100%', backgroundPosition: '100% 100%' }}>
      </div>
      <div className='w-full bg-light p-4 mb-8'>
        <h1 className='text-3xl text-center'>Year Calendar Dates</h1>
        <motion.ul initial="hidden" whileInView="visible" variants={containerVariants} className='w-full bg-light p-4'>
            {holidays.map((holiday)=>(
              <Calendar name={holiday.name} date={holiday.date} description={holiday.description} />
            ))}
        </motion.ul>
      </div>
    </div>
  );
};

export default UpcomingCalendar;
