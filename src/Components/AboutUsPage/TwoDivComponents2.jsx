import React from 'react'
import ImageDiv from './ImageDiv'
import TextDiv from './TextDiv'



const TwoDivComponents2 = () => {
  return (
    <>
        <div className="TwoDIvComponents2">
            <TextDiv head='Our Vision' body='At HOPE Academy, we strive to enable every student to reach their potential. We seek to recognize the individual strengths and needs of each student in order to foster social, emotional and academic growth. We commit to partnering with families, school districts and local organizations to create a collaborative community geared towards the success of our students.'/>
            <ImageDiv imageUrl='url(teachers/caro3.jpg)' />
        </div>
    </>
  )
}

export default TwoDivComponents2