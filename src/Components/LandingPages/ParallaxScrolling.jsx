import React from 'react';

const ParallaxScrolling = () => {
  return (
    <div className="bg-fixed bg-cover bg-center h-96 relative flex flex-col items-center justify-center" style={{ backgroundImage: "url('/school_view.jpg')", backgroundSize: '100% 100%' }}>
      <img src="/school_logo.png" alt="School logo" className="h-24 w-36 shadow-2xl" style={{ filter: 'drop-shadow(10px 10px 20px white' }} />
      <h1 className="text-3xl text-white font-bold">HOPE Academy</h1>
    </div>
  );
};

export default ParallaxScrolling;
