import React from 'react'
import ErrorMainDiv from '../../src/Components/ErrorPage/ErrorMainDiv'
import LandingPageNav from '../../src/Components/LandingPageNav'


const ErrorPage = () => {
    document.querySelector("title").innerText = `404 - Error Page`
  return (
    <>
        <div>
          <LandingPageNav/>
          <ErrorMainDiv/>
        </div>
    </>
  )
}

export default ErrorPage