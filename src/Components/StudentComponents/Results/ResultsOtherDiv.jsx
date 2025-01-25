import React from 'react'
import { subjects } from '../../../../constants/subjects'
import { stringClass } from '../../../../constants/stringClass'

const ResultsOtherDiv = ({studentAcademicResults, setresultIndex}) => {
  return (
    <>
        <div className="otherDiv order-3 md:order-none basis-full md:basis-4/12 md:h-screen block bg-white overflow-y-auto mt-16 md:mt-0 p-5">
          <div className='w-full p-2 mt-2'>
              <p>Your Available Results</p>
              <select name="" id="" className='w-full h-12 p-2 rounded-md'>
                {studentAcademicResults?.length>0?studentAcademicResults.map((result, index)=>(
                  <option key={index} value={index}>{result.term} Term, {stringClass[result.class]}, Year {result.year}</option>
                )):null}
              </select>
          </div>
        </div>
    </>
  )
}

export default ResultsOtherDiv