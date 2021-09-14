import React, { useEffect, useState } from 'react';
import './Counter.scss';
import useCounterApi from '../hooks/useCounterApi';

const Counter = ({ counter }) => {
  const [count, setCount] = useState(null);
  const { getCounterHits, incrementCounterHits, getCounterInfo, isLoading } =
    useCounterApi(counter.key, counter.namespace);

  useEffect(() => {
    getCounterHits(setCount);
  }, [getCounterHits]);

  return (
    <div className="counter">
      <div>Key: {counter.key}</div>
      <div>Namespace: {counter.namespace}</div>
      <div>{isLoading ? 'Loading...' : count}</div>
      <button
        onClick={() => {
          incrementCounterHits(setCount);
        }}
      >
        Increment Counter
      </button>
      <button
        onClick={() => {
          getCounterInfo();
        }}
      >
        Log Counter Info
      </button>
    </div>
  );
};

export default Counter;
