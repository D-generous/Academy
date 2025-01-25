import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DisplayToast from '../../CustomHooks/DisplayToast';
import { backendurl } from '../../../constants/backendurl';



const TestWelcomeAndInput = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleStartTest = () => {
        if (email.trim() && password.trim()) {
          axios.post(`${backendurl}student/entrancetestsignin`, {email, password})
          .then((res)=>{
            if (res.status==200) {
                sessionStorage.setItem('entrance_test_login', JSON.stringify({email,password}))
                navigate('/entrance_test/instructions')
            }
          })
          .catch((error)=>{
            console.log(error)
            if(error?.response?.status==478){
                DisplayToast('error', 'Test Already Taken')
            } else {
                DisplayToast('error', 'Invalid Account Details')
            }
          })
        } else {
            DisplayToast('error', 'Please enter both email and password.');
        }
    };

  return (
    <>
          <div className="max-w-xl mx-auto p-6">
              <h1 className="text-3xl font-semibold mb-4 text-center">Welcome to Our School's Test!</h1>
              <p className="mb-4 text-center">
                  We are excited to have you take our school's test. This test is an important part of our admission process.
                  Please enter your email and password to begin the test.
              </p>
              <div className="mb-4">
                  <label htmlFor="email" className="block font-medium mb-2">
                      Email:
                  </label>
                  <input
                      type="email"
                      id="email"
                      className="w-full p-2 border rounded"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
              </div>
              <div className="mb-4">
                  <label htmlFor="password" className="block font-medium mb-2">
                      Password:
                  </label>
                  <input
                      type="password"
                      id="password"
                      className="w-full p-2 border rounded"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </div>
              <button
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
                  onClick={handleStartTest}
              >
                  Start Test
              </button>
              
          </div>
    </>
  )
}

export default TestWelcomeAndInput