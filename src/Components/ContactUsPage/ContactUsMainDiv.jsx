import React from 'react';

const ContactUsMainDiv = () => {
  return (
    <div className="ContactUsMainDiv relative h-screen">
      <img
        src="teachers/teacher19.jpg"
        className="w-full h-3/4 object-cover"
        alt="Contact us"
      />
      <div className="w-full h-1/4 bg-light flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-semibold mb-2">Contact</h1>
        <p>If you would like to know more about Hope Academy, please get in touch with us!</p>
      </div>
    </div>
  );
};

export default ContactUsMainDiv;
