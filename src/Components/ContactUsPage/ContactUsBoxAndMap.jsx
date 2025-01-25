import React from 'react'
import ContactUsBox from './ContactUsBox'
import ContactUsMap from './ContactUsMap'

const ContactUsBoxAndMap = () => {
  return (
    <>
        <div className='ContactUsBoxAndMap w-full px-7'>
            <ContactUsMap/>
            <ContactUsBox/>
        </div>
    </>
  )
}

export default ContactUsBoxAndMap;