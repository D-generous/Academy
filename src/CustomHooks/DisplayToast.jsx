import { toast } from 'react-toastify';



const DisplayToast = (type, message) => {
  if (type == 'success') {
    toast.success(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: '#4caf50',
        color: '#ffffff',
        fontSize: '16px',
      },
    });
  } else {
    toast.error(message, {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      style: {
        background: '#ff5252',
        color: '#ffffff',
        fontSize: '16px',
      },
    });
  }
  return ['return']
}

export default DisplayToast