import React from 'react';

const Scoreboard = ({ score }) => {
  return (
    <div className='scoreBoard'>
      <h2>Score: {score}</h2>
    </div>
  );
};

export default Scoreboard;
