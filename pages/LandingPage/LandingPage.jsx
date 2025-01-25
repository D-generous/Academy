import React, { useState } from 'react'
import LandingPageNav from '../../src/Components/LandingPageNav'
import LandingPageAlert from '../../src/Components/LandingPages/AlertPage'
import Carousel from '../../src/Components/LandingPages/Carousel'
import LandingPageFooter from '../../src/Components/LandingPages/Footer'
import ParallaxScrolling from '../../src/Components/LandingPages/ParallaxScrolling'
import ProgramsPage from '../../src/Components/LandingPages/ProgramsPage'
import UpcomingCalendar from '../../src/Components/LandingPages/UpcomingCalendar'
import VideoDiv from '../../src/Components/LandingPages/VideoDiv'
import MessageSchool from '../../src/Components/MessageSchool'


const LandingPage = () => {
  document.querySelector('title').innerText = 'Hope Academy'; 

  return (
    <>
        <LandingPageNav/>
        <Carousel/>
        <LandingPageAlert/>
        <ProgramsPage/>
        <VideoDiv/>
        <ParallaxScrolling/>
        <UpcomingCalendar/>
        <LandingPageFooter/>
        <MessageSchool/>
    </>
  )
}

export default LandingPage