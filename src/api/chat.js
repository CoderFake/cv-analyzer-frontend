import api from './index';

export const chatApi = {
  sendMessage: (data) => api.post('/chat/send', data),
  
  getChatList: () => api.get('/chat/list'),
  
  getChatById: (id) => api.get(`/chat/${id}`),
  
  deleteChat: (id) => api.delete(`/chat/${id}`),
};