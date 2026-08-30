import api from './api';
import type { Resume } from '../types/resume';

export const uploadResume = (file: File) => {
  const formData = new FormData();
  formData.append('resume', file);
  return api.post<Resume>('/resumes', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
