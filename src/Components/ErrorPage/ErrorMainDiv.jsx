import React from 'react';

const ErrorMainDiv = ({ title, body } = props) => {
  return (
    <div className="flex justify-center flex-col items-center h-screen">
      <h3 className="text-4xl font-bold text-red-500">404 - Error Page</h3>
      <div className='w-full md:w-3/6'>
        <img src="/404.gif" className='h-full w-full' alt="" />
      </div>
    </div>
  );
};

export default ErrorMainDiv;
