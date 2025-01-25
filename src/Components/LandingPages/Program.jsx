import React from 'react';
import { motion } from "framer-motion";

const Program = ({ title, body, img, itemsVariants }) => {
  return (
    <motion.div variants={itemsVariants} className='flex flex-col items-center px-5 mb-8'>
      <img src={img} className='rounded-full bg-light mb-4' style={{ width: '150px', height: '150px', objectFit: 'cover' }} alt='' />
      <h3 className='text-blue-500 text-2xl font-semibold mb-2'>{title}</h3>
      <p className='text-center mb-4'>{body}</p>
    </motion.div>
  );
};

export default Program;
