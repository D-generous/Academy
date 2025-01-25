import React from 'react'
import ContactUsBoxAndMap from '../../src/Components/ContactUsPage/ContactUsBoxAndMap'
import ContactUsMainDiv from '../../src/Components/ContactUsPage/ContactUsMainDiv'
import LandingPageNav from '../../src/Components/LandingPageNav'
import LandingPageFooter from '../../src/Components/LandingPages/Footer'




const ContactUsPage = () => {
  document.querySelector('title').innerText = 'Contact Us | Hope Academy'; 
    
  return (
    <>
        <LandingPageNav/>
        <ContactUsMainDiv/>
        <ContactUsBoxAndMap/>
        <LandingPageFooter/>

    </>
  )
}

export default ContactUsPage