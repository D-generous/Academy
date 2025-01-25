import React from 'react'
import Alert from './Alert'
import { motion } from 'framer-motion';


const LandingPageAlert = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeInOut',
      },
    },
  };
  
  return (
    <>
        <motion.div initial="hidden" animate="visible" variants={containerVariants} className='w-100 bg-light d-flex align-items-center p-5' style={{height: 'auto'}}>
            <Alert/>
        </motion.div>
    </>
  )
}

export default LandingPageAlert