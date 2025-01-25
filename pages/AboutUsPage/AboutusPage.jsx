import React from 'react'
import HeroImage from '../../src/Components/AboutUsPage/HeroImage'
import OurMission from '../../src/Components/AboutUsPage/OurMission'
import TwoDIvComponents from '../../src/Components/AboutUsPage/TwoDivComponents'
import TwoDivComponents2 from '../../src/Components/AboutUsPage/TwoDivComponents2'
import LandingPageNav from '../../src/Components/LandingPageNav'
import LandingPageFooter from '../../src/Components/LandingPages/Footer'


const AboutUsPage = () => {
  document.querySelector('title').innerText = 'About Us | Hope Academy'; 

  return (
    <>
        <LandingPageNav/>
        <HeroImage/>
        <OurMission/>
        <TwoDIvComponents/>
        <TwoDivComponents2/>
        <LandingPageFooter/>
    </>
  )
}

export default AboutUsPage