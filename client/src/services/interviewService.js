import api from './api';

export const startInterview = async (payload) => {
  const { data } = await api.post('/interviews/start', payload);
  return data;
};

export const submitInterviewAnswer = async (payload) => {
  const { data } = await api.post('/interviews/answer', payload);
  return data;
};
