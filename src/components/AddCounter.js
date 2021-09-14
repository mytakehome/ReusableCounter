import React, { useState } from 'react';
import useCounterApi from '../hooks/useCounterApi';

const AddCounter = ({ counters, setCounters }) => {
  const [namespace, setNamespace] = useState('MyWebsite.com');
  const [key, setKey] = useState('visits');
  const [error, setError] = useState(null);
  const { isExistingCounter } = useCounterApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    isExistingCounter(namespace, key, setError)
      .then((res) => {
        setCounters([...counters, { namespace, key }]);
        setNamespace('');
        setKey('');
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <h5>Add a new counter:</h5>
      <form onSubmit={handleSubmit}>
        <label>
          Namespace:
          <input
            type="text"
            value={namespace}
            placeholder="MyWebsite.com"
            onChange={(e) => setNamespace(e.target.value)}
          />
        </label>
        <label>
          Key:
          <input
            type="text"
            placeholder="visits"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <div>{error ? `Error: ${error}` : ''}</div>
      <p>
        Note: Currently only supports counters that have been initialized on
        <a href="https://countapi.xyz"> CountAPI.xyz</a>
      </p>
    </>
  );
};

export default AddCounter;
