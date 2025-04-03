import api from './index';

export const chatApi = {
  sendMessage: (data) => {
    const formData = new FormData();

    formData.append('message', data.message || '');
    
    if (data.chat_id) {
      formData.append('chat_id', data.chat_id);
    }
    
    if (data.candidate_id) {
      formData.append('candidate_id', data.candidate_id);
    }
    
    if (data.file) {
      formData.append('file', data.file);
    }
    
    return api.post('/chat/message', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  
  getChatList: () => api.get('/chat/list'),
  
  getChatById: (id) => api.get(`/chat/${id}`),
  
  deleteChat: (id) => api.delete(`/chat/${id}`),
};