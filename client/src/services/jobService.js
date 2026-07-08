import api from './api';

export const analyzeJobMatch = async (payload) => {
  const { data } = await api.post('/jobs/match', payload);
  return data;
};
