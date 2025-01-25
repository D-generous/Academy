import React, { useState } from 'react';
import QuestionNav from './QuestionNav';


const Question = ({ data, questions, handleOptionChange, currentQuestion, navigateToQuestion}) => {
  const { question, options, correctAnswer } = data;

  return (
    <>
      <div className="mb-6 w-full grid grid-cols-1 md:grid-cols-2 justify-end">
        <div className="mt-2 ms-12">
          <div className="text-4xl font-semibold">Question {currentQuestion + 1}</div>
          <p className="text-lg font-semibold">{question}</p>
          {options.map((option, index) => (
            <div key={index} className="flex items-center mt-2">
              <input
                type="radio"
                id={`option${index}`}
                name="answer"
                value={index}
                checked={data.selectedAnswer != null && data.selectedAnswer == index ? true : false}
                onChange={() => handleOptionChange(index)}
                className="mr-2 accent-blue-500"
              />
              <label htmlFor={`option${index}`} className="cursor-pointer">
                {option}
              </label>
            </div>
          ))}
        </div>
        <QuestionNav questions={questions} questionCount={questions.length} currentQuestion={currentQuestion + 1}  navigateToQuestion={navigateToQuestion} />
      </div>

    </>
    
  );
};

export default Question;
