import * as React from 'react';
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useNavigate } from 'react-router-dom';
import axios from "axios";



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function ResultComponent({showDialog, score}) {
  console.log(score)
  const [percentScore, setPercentScore] = React.useState();
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(showDialog)
    setPercentScore((score/20)*100)
  }, [showDialog])


  const calculateGrade = (percentScore) => {
    if (percentScore >= 90) {
      return 'A';
    } else if (percentScore >= 80) {
      return 'B';
    } else if (percentScore >= 70) {
      return 'C';
    } else if (percentScore >= 60) {
      return 'D';
    } else {
      return 'F';
    }
  };

  const grade = calculateGrade(percentScore);

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>navigate('/student/dashboard')}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className='text-center underline underline-blue-500'>{"CBT Test Result"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <div class="result-details mb-4">
                <p class="text-gray-700"><strong>Score:</strong>{percentScore}%</p>
                <p class="text-gray-700"><strong>Grade:</strong>{grade}</p>
            </div>
            <p class="text-gray-700">To view more detailes, please navigate to your Student Dashboard.</p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>navigate('/student/dashboard')}>Dashboard</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}