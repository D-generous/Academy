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
import { backendurl } from '../../../constants/backendurl';




const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export default function AlertDialogSlide({showDialog, setDialog, text}) {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const startTest =()=>{
    let studentDetails = JSON.parse(sessionStorage.getItem('entrance_test_login'));
    let studentEntranceDetails = {
        startingTime: Date.now(),
        email: studentDetails.email
    }
    axios.post(`${backendurl}student/start_entrance_test`, studentEntranceDetails)
    .then((res)=>{
        if (res.status==200) {
          localStorage.setItem('startingTime', JSON.stringify(Date.now()))
          navigate('/entrance_test/test')
        } else{
            console.log(res);
        }
    })
    .catch((error)=>{
        console.log(error);
    })
    // console.log(studentEntranceDetails);
  }
  useEffect(() => {
    setOpen(showDialog)
  }, [showDialog])


  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Slide in alert dialog
      </Button> */}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=> setDialog(false)}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Confirmation Request"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            {(<>{text}</>)}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setDialog(false)}>No</Button>
          <Button onClick={startTest}>Start Test</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}