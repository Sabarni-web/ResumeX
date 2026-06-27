import { useCallback, useState } from 'react';

const useApi = (requestFn) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(async (...args) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await requestFn(...args);
      setData(result);
      return result;
    } catch (err) {
      setError(err.message || 'Request failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [requestFn]);

  return { data, error, isLoading, execute };
};

export default useApi;
