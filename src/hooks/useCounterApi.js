import { useState, useCallback } from 'react';

const useCounterApi = (key, namespace) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const counterIdentifierString = namespace ? `${namespace}/${key}` : `${key}`;

  const sendRequest = useCallback(
    async (requestConfig) => {
      const URL = `https://api.countapi.xyz/${requestConfig.endpoint}/${counterIdentifierString}`;
      setError(null);
      setIsLoading(true);
      try {
        const response = await fetch(URL);
        if (!response.ok) throw new Error('Request has failed');
        const data = await response.json();
        return data;
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    },
    [counterIdentifierString]
  );

  const getCounterHits = useCallback(
    (setCount) => {
      sendRequest({ endpoint: 'get' })
        .then((data) => {
          setCount(data.value);
        })
        .catch((err) => {
          console.error(err);
        });
    },
    [sendRequest]
  );

  const incrementCounterHits = (applyData) => {
    sendRequest({ endpoint: 'hit' })
      .then((data) => {
        applyData(data.value);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getCounterInfo = () => {
    sendRequest({ endpoint: 'info' })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // Sets error in AddCounter if key/namespace have not
  // been created on Count API
  const isExistingCounter = async (namespace, key, errorSetterFn) => {
    const counterIdentifierString = namespace
      ? `${namespace}/${key}`
      : `${key}`;
    const URL = `https://api.countapi.xyz/info/${counterIdentifierString}`;

    errorSetterFn(null);
    try {
      const response = await fetch(URL);
      if (!response.ok)
        throw new Error(
          `Request failed (Status: ${response.status}). The key/namespace provided has not been created on CounterAPI.`
        );
    } catch (err) {
      errorSetterFn(err.message);
      throw new Error(`my new error: ${err.message}`);
    }
  };

  return {
    sendRequest,
    getCounterHits,
    incrementCounterHits,
    getCounterInfo,
    isExistingCounter,
    error,
    isLoading,
  };
};

export default useCounterApi;
