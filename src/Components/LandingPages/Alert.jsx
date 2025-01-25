import React from 'react';

const Alert = () => {
  const hideAlert = () => {
    document.getElementById('Alert').style.display = 'none';
  };

  return (
    <div
      id='Alert'
      className='alert alert-primary w-75 mx-auto p-4 position-fixed bottom-5 start-50 rounded shadow-lg bg-blue-300'
      role='alert'
    >
      <div className='flex justify-between'>
        <i className='fa fa-bell me-2'></i>
        <button
          type='button'
          className='btn-close btn-sm'
          aria-label='Close'
          onClick={hideAlert}
        ><i className='fa fa-close'></i></button>
      </div>
      <h3 className=' text-3xl text-center'>HOPE Academy is currently operating full-time, in-person learning.</h3>
    </div>
  );
};

export default Alert;
