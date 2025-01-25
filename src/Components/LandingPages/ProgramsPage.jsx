import React from 'react';
import Program from './Program';
import { motion } from "framer-motion";

const ProgramsPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 },
  };
  return (
      <motion.div initial="hidden" whileInView="visible" variants={containerVariants} className='container text-center grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mx-auto gap-3 px-3 items-center justify-center'>
        <Program itemVariants={itemVariants} img='hat.png' title='Academic Programming' body='Hope Academy offers a comprehensive curriculum aligned with Connecticut State Standards.' />
        <Program itemVariants={itemVariants} img='screen.png' title='Therapeutic Approach' body='Our Therapeutic Approach is what makes Hope Academy a truly unique school environment for our students.' />
        <Program itemVariants={itemVariants} img='apple.png' title='School Engagement Services' body='We recognize that school is not easy for many students. For some students, it is simply overwhelming.' />
        <Program itemVariants={itemVariants} img='world.png' title='Transition Services' body='In working with even our youngest students, we have their long-term future in mind.' />
      </motion.div>
  );
};

export default ProgramsPage;
