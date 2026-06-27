import { useState } from 'react';

const useResume = () => {
  const [activeResume, setActiveResume] = useState(null);
  return { activeResume, setActiveResume };
};

export default useResume;
