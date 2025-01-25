import React from 'react';

const Timer = ({ remainingTime }) => {
  let { minutes, seconds } = remainingTime;
  return (
    <div className="text-xl font-semibold align-right">
      Remaining Time: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;
