import React, { useState, useEffect, useContext } from 'react';
import LandingPageNav from "../LandingPageNav";
import Question from './Question';
import Timer from './Timer';
import Calculator from './Calculator';
import axios from 'axios';
import DisplayToast from '../../CustomHooks/DisplayToast';
import ResultComponent from './ResultComponent';
import { backendurl } from '../../../constants/backendurl';



const Fireworks = () => {
  const [showFireworks, setShowFireworks] = useState(true);

  const fireworksAnimation = useSpring({
    opacity: showFireworks ? 1 : 0,
    from: { opacity: 0 },
    config: { duration: 1000 },
    onRest: () => setShowFireworks(false),
  });

  return (
    <animated.div style={fireworksAnimation}>
      <div className="fireworks"></div>
    </animated.div>
  );
};

const TestPage = () => {
  const [questions, setquestions] = useState([]);

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [remainingTime, setremainingTime] = useState({minutes:15, seconds: 0})
  // const [startTime, setstartTime] = useState()  // parseInt(localStorage.getItem('startingTime'))  
  let startTime;
  const [targetTime, setTargetTime] = useState(new Date()); // Set your target time here
  const [timeLeft, setTimeLeft] = useState(0);
  const [testScore, settestScore] = useState(20);
  const studentDetails = JSON.parse(sessionStorage.getItem('entrance_test_login'))

  const handleVisibilityChange = () => {
    if (document.hidden) {
      console.log(document.hidden);
    }
  };


  useEffect(() => {
    fetchQuestions()
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchQuestions =()=>{
    axios.post(`${backendurl}student/get_entrance_test_questions`, {email: studentDetails?.email})
    .then((res)=>{
      if (res.status==200) {
        setquestions(res.data.questions)
        startTime = res.data.startingTime
        startCountDown()
      }
    })
    .catch((error)=>{
      console.log(error);
    })
  }

  const startCountDown =()=>{
    const countDownInterval = setInterval(() => {
      const currentTime = Date.now();
      const timeElapsed = Math.floor((currentTime-startTime)/1000)
      const remainingTime = 900 - timeElapsed;
      if (remainingTime <= 0) {
        clearInterval(countDownInterval);
        submitTest()
      } else{
        const minutes = Math.floor(remainingTime/60)
        const seconds = remainingTime%60;
        setremainingTime({minutes, seconds})
        if (minutes== 2 && seconds==0) {
          DisplayToast('error', 'You Have 2 Minutes Left')
        }
      }
    }, 1000);
  }

  const nextQuestion = () => {
    setCurrentQuestion(prevQuestion => prevQuestion + 1);
  };

  const prevQuestion = () => {
    setCurrentQuestion(prevQuestion => prevQuestion - 1);
  };

  const navigateToQuestion = (questionNumber) => {
    setCurrentQuestion(questionNumber);
  };

  const handleOptionChange = (answerIndex) => { 
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestion] = {
      ...updatedQuestions[currentQuestion],
      selectedAnswer: answerIndex,
    };
    setquestions(updatedQuestions)
    let values = {
      currentQuestion,
      questionIndex: questions[currentQuestion].index,
      email: studentDetails.email,
      selectedAnswer: answerIndex
    }
    let endpoint = `${backendurl}student/select_answer`
      axios.post(endpoint, values)
      .then((res)=>{
        console.log(res);
      })
      .catch((error)=>{
        console.log(error);
      })
  };

  const [showDialog, setshowDialog] = useState(false);
  const setDialog =(value)=>{
    setshowDialog(value)
  }
  const [showCalculatorDialog, setshowCalculatorDialog] = useState(false);
  const setCalculatorDialog =(value)=>{
    setshowDialog(value)
  }

  const submitTest =()=>{
    axios.post(`${backendurl}student/submit_entrance_test`, {email:studentDetails.email})
    .then((res)=>{
      settestScore(res.data);
      setCalculatorDialog(true);
      setTimeout(() => navigate('/'), 10000);
    })
    .catch((error)=>{
      DisplayToast('error', 'An Error Occurred While Submitting Your Test. Please Try Resubmitting Your Test')
    })
  }

  return (
    <>  
        <LandingPageNav />
        <div className="w-full mx-auto p-6">
        <h2 className="text-2xl font-semibold mb-4 text-center">Test Page</h2>
        <div class="flex gap-3 justify-end">
          <i class='fa fa-calculator my-auto cursor-pointer' style={{fontSize: 30}} onClick={()=>setshowCalculatorDialog(true)}></i>
          <Timer remainingTime={remainingTime} />
        </div>
        

        {questions.length >= 1 && <Question navigateToQuestion={navigateToQuestion} currentQuestion={currentQuestion} questions={questions} data={questions[currentQuestion]} handleOptionChange={handleOptionChange}  />}

        <div className=" w-full sm:w-3/6 mx-auto flex flex-row justify-between mt-4">
            {currentQuestion > 0 && (
            <button className="px-4 py-2 text-base bg-blue-500 text-white rounded cursor-pointer transition duration-300 hover:bg-blue-600" onClick={prevQuestion}>Previous</button>
            )}
            {currentQuestion < questions.length - 1 && (
            <button className="px-4 py-2 text-base bg-blue-500 text-white rounded cursor-pointer transition duration-300 hover:bg-blue-600" onClick={nextQuestion}
            >
                Next
            </button>
            )}
        </div>
        <button onClick={submitTest} className="mt-4 px-6 py-3 text-base bg-green-500 text-white rounded cursor-pointer transition duration-300 hover:bg-green-600">Submit</button>
        </div>

        <Calculator setDialog={setshowCalculatorDialog} showDialog={showCalculatorDialog} />
        <ResultComponent showDialog={showDialog} setDialog={setDialog} score={testScore} />
    </>
  );
};

export default TestPage;
