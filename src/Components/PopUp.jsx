// Popup.js
import React from 'react';

const PopUp = ({ isOpen, onClose, children }) => {
  return isOpen ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-y-auto">
      <div className="bg-white p-8 rounded shadow-lg w-5/6 md:w-3/6 overflow-y-auto" style={{height: '90vh'}}>
        <button className="absolute top-2 right-2 bg-white p-2 rounded-lg text-gray-600 hover:text-gray-800" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  ) : null;
};

export default PopUp;
