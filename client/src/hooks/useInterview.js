import { useState } from 'react';

const useInterview = () => {
  const [session, setSession] = useState(null);
  return { session, setSession };
};

export default useInterview;
