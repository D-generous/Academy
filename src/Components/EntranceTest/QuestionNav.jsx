import React from 'react';

const QuestionNav = ({ questionCount, currentQuestion, navigateToQuestion, questions }) => {

  return (
    <div className="max-w-sm ms-auto me-10 grid grid-cols-5 gap-1 justify-center mt-4">
      {questions.map((question, number) => (
          <div clas="flex flex-row gap-0 justify-center h-16 relative border-2 border-red-500">
              <button
                key={number}
                className={`mx-1 w-full h-4/6 p-2 rounded ${question.selectedAnswer!=null?'selected_option':''} ${
                  currentQuestion-1 === number ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
                onClick={() => navigateToQuestion(number)}
              >
                {number+1}
              </button>
          </div>
      ))}
    </div>
  );
};

export default QuestionNav;
