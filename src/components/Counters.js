import React from 'react';
import Counter from './Counter';

const Counters = ({ counters }) => {
  return (
    <div>
      <h3>Counters</h3>
      {counters.map((counter, idx) => {
        return (
          <div key={idx}>
            <Counter counter={counter} />
          </div>
        );
      })}
    </div>
  );
};

export default Counters;
