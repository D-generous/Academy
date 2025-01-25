import React , {useEffect, useState} from 'react'
import axios from 'axios'
import LandingPageNav from "../LandingPageNav";
import InstructionContainer from "./InstructionContainer";



const TestInstructions = () => {
    
  return (
    <>
        <LandingPageNav/>
        <InstructionContainer/>
    </>
  )
}

export default TestInstructions