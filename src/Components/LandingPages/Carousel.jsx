import React, { useEffect, useState } from 'react';

const images = [
  '/teachers/caro11.png',
  '/teachers/caro2.png',
  '/teachers/caro4.png',
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 2000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{height: '80vh'}} className="relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-full h-full ${
              index === currentIndex ? 'block' : 'hidden'
            } transition-opacity duration-500 ease-in-out`}
          >
            <img
              src={image}
              className="object-cover w-full h-full"
              alt={`Carousel Image ${index}`}
            />
          </div>
        ))}
      </div>
      <div className="carouselOverlay absolute top-0 left-0 w-full h-full flex justify-center items-center z-10">
        <div id='carouselCenter' className="text-center text-light">
          <h3 className="text-lg md:text-2xl text-white font-bold">
            Our mission is to educate the whole child. <br /> Because every child deserves a little HOPE...
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
