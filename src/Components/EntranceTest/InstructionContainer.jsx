import React, {useState} from 'react';
import AlertDialogSlide from './ConfirmationComponent';


const Instructions = ({ startExam }) => {

  const [showDialog, setshowDialog] = useState(false);
  const setDialog =(value)=>{
    setshowDialog(value)
  }
  return (
    <div className="w-11/12 md:w-4/6 mx-auto mt-6 p-6 bg-gray-100 border rounded-md shadow-md">
      <h2 className="text-2xl font-semibold mb-3">CBT Exam Instructions</h2>
      <p className="text-base mb-4">Welcome to the Computer-Based Testing (CBT) Exam!</p>
      <p className="text-base mb-4">
        You are about to begin a timed exam with a total of 20 questions. You have 15 minutes to complete the entire exam. Make sure to carefully read and follow these instructions:
      </p>

      <ol className="text-base ml-6 list-decimal mb-4">
        <li>Click the "Start Exam" button below to begin the timer and access the questions.</li>
        <li>You must answer all 20 questions within the time limit.</li>
        <li>The timer at the top of the page will count down from 15 minutes. Keep an eye on the time!</li>
        <li>You can navigate between questions using the provided navigation buttons.</li>
        <li>You can change your answers at any time before submitting the exam.</li>
        <li>When you are ready to submit, ensure you have answered all questions and click the "Submit Exam" button.</li>
        <li>If you finish before the time limit, you can submit your exam early.</li>
        <li>If the timer reaches 0, the exam will automatically be submitted.</li>
      </ol>

      <p className="text-base">Remember, stay focused, manage your time wisely, and do your best!</p>

      <button
        className="px-4 py-2 text-base bg-blue-500 text-white rounded cursor-pointer transition duration-300 hover:bg-blue-600"
        onClick={()=>setDialog(true)}
      >
        Start Exam
      </button>
      <AlertDialogSlide showDialog={showDialog} setDialog={setDialog} text={<>
                <p className="mb-2">You are about to start a test with 20 questions to be completed in 15 minutes.</p>
                <p className="mb-4">Are you ready to begin?</p>
          </>} />
    </div>
  );
};

export default Instructions;
