import React from 'react';
import { Link } from 'react-router-dom';

const ContactUsMap = () => {
  return (
    <div className="ContactUsMap p-3">
      <h2 className="text-2xl font-semibold mb-2">HOPE Academy</h2>
      <small className="block mb-2 text-md">Ogbomoso</small>
      <small className="block mb-4 text-lg">Oyo State, Nigeria</small>
      <p className="mb-2">
        <span>Email:</span>
        <a className='inline text-blue-500' href="mailto:adegbitejoshua07@gmail.com"> adegbitejoshua07@gmail.com</a>
      </p>
      <p className="mb-2">
        <span>Facebook:</span>
        <a href="" className="text-blue-500 inline"> Adegbite Joshua</a>
      </p>
      <p className="mb-2">
        <span>Twitter:</span>
        <a href="" className="text-blue-500 inline"> Adegbite Joshua</a>
      </p>
      <p className="mb-2">
        <span>Telephone:</span>
        <a href="tel:+2347015886456" className="text-blue-500 inline"> +2347015886456</a>
      </p>
      <p className="mb-4">
        <span>WhatsApp:</span>
        <a href="https://wa.me/+2347015886456" className="text-blue-500 inline"> +2347015886456</a>
      </p>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          className="w-full h-full"
          title="Google Maps"
          src="https://www.google.com/maps/embed/v1/place?q=sqiogbomoso&key=AIzaSyBnnzmm550Bo1McFJZ_MCaQ5IKha6TH8G8&zoom=21&maptype=satellite"
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
};

export default ContactUsMap;
