import api from './api';

export const uploadResume = async (file, onUploadProgress) => {
  const formData = new FormData();
  formData.append('resume', file);

  const { data } = await api.post('/resumes/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress,
  });

  return data;
};

export const getResumeReports = async () => {
  const { data } = await api.get('/resumes/reports');
  return data;
};
