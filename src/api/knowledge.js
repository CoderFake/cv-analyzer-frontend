import api from './index';

export const knowledgeApi = {
  getAllKnowledge: (category) => {
    const url = category ? `/knowledge?category=${category}` : '/knowledge';
    return api.get(url);
  },
  
  searchKnowledge: (query) => api.get(`/knowledge/search?query=${query}`),
  
  getKnowledgeById: (id) => api.get(`/knowledge/${id}`),
  
  updateKnowledge: (id, data) => api.put(`/knowledge/${id}`, data),
  
  deleteKnowledge: (id) => api.delete(`/knowledge/${id}`),
  
  queryKnowledge: (question, category) => {
    const url = category 
      ? `/knowledge/query?category=${category}`
      : '/knowledge/query';
    return api.post(url, { question });
  },
  
  getKnowledgeSummary: (category) => {
    const url = category 
      ? `/knowledge/summary?category=${category}`
      : '/knowledge/summary';
    return api.get(url);
  },
};