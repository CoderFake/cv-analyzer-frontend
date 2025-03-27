import api from './index';

export const filesApi = {
  uploadFile: (formData) => {
    return api.post('/files/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  uploadKnowledgeFile: (formData) => {
    return api.post('/files/upload-knowledge', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getDownloadUrl: (candidateId) => api.get(`/files/download/${candidateId}`),
};