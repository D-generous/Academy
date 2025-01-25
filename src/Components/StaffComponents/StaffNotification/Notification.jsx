import React, { useRef } from 'react';

const Notification = ({ name, message, type, id}) => {
  const messageStudent =()=>{
      if(Object.keys(studentSubmit).length >=1  && studentSubmit.constructor === Object){
          navigate(type=='submit'?'':`/inbox/${id}`)
      }
  }
  return (
    <div className="new-assignment-submission">
      <strong>{name}</strong> {type=='submit'?'submitted a new assignment':'sent you a message'}
      <p>{message}</p>
    </div>
  );
};

export default Notification;
