import api from './index';

export const candidatesApi = {
  uploadCV: (formData) => {
    return api.post('/candidates/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getAllCandidates: () => api.get('/candidates/'),
  
  getAdminCandidates: () => api.get('/candidates/all'),
  
  getCandidateById: (id) => api.get(`/candidates/${id}`),
  
  evaluateCandidate: (id) => api.post(`/candidates/${id}/evaluate`),
  
  updateCandidate: (id, data) => api.put(`/candidates/${id}`, data),
  
  deleteCandidate: (id) => api.delete(`/candidates/${id}`),
};