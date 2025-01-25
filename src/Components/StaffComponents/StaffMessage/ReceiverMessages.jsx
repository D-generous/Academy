import React from 'react';

const ReceiverMessages = ({ message, date, src }) => {
  return (
    <div className="relative w-64 md:w-96 h-auto bg-slate-300 m-1 rounded-lg rounded-tl-none p-2">
      <img
        src="/school_logo.png" 
        className="h-12 w-12 float-left"
        alt=""
      />
      <div className="message-content p-2">
        <p>{message}</p>
        <p className="text-right">
          <small>{date}</small>
        </p>
      </div>
      <div className="arrow-left"></div>
    </div>
  );
};

export default ReceiverMessages;
